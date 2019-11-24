class FrameData {

		public framekey:string = "";
		public frameNames:string[] = [];

		public constructor(key:string, spriteNames:string[]) {
			this.framekey = key;
			this.frameNames = [...spriteNames];
		}

		private setFrameData(key:string, spriteNames:string[]) {
			this.framekey = key;
			this.frameNames = [...spriteNames];
		}
	}

class EgretAnimation extends egret.Sprite {


    private ImageSource:eui.Image;
    private mCurFrame:number = 0;
    private mDelta:number = 0;
	private mFrameDelta:number = 0;

    public FPS:number = 5;
	public SpriteFrames: Array<FrameData> = new Array<FrameData>();
    public IsPlaying:boolean = false;
    public Foward:boolean = true;
    public AutoPlay:boolean = false;
    public Loop:boolean = false;

	private mLastTime:number = 0;
	private mCurrentTime:number = 0;
	private mGapTime:number = 0;

	//当前动画数据
	private currentAnimationData:FrameData = null;
	private FrameCount:number = 0;
	private defaultAnimationKey:string = "";

	public constructor(animationKey:string, frameNames:string[]) {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);

		//添加默认动画数据
		this.AddAnimation(animationKey, frameNames);

		//默认帧动画key
		this.defaultAnimationKey = animationKey;
	}

	private AddToStage(e) {

		//每帧动画的时间间隔
		this.mFrameDelta = 1 / this.FPS;

		this.mLastTime = egret.getTimer();
		this.addEventListener(egret.Event.ENTER_FRAME, this.frameUpdate, this);
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);

		this.ImageSource = new eui.Image();
		this.addChild(this.ImageSource);

		this.play(this.defaultAnimationKey, true);
	}

	private Init() {
		this.mDelta = 0;
		this.mCurFrame = 0;
		this.IsPlaying = true;

		this.ImageSource.source = this.currentAnimationData.frameNames[this.mCurFrame];
		this.ImageSource.anchorOffsetX = this.ImageSource.width / 2;
		this.ImageSource.anchorOffsetY = this.ImageSource.height / 2;
	}

	private frameUpdate() {
		this.mCurrentTime = egret.getTimer();
		this.mGapTime = (this.mCurrentTime - this.mLastTime) / 1000;//转换成秒
		this.mLastTime = this.mCurrentTime;

		if (!this.IsPlaying || !this.currentAnimationData || 0 == this.FrameCount) {
			return;
		}

		this.mDelta += this.mGapTime;
		if (this.mDelta > this.mFrameDelta) {
			this.mDelta -= this.mFrameDelta;
			if (this.Foward) {
				this.mCurFrame++;
			}
			else {
				this.mCurFrame--;
			}

			if (this.mCurFrame >= this.FrameCount) {
				if (this.Loop) {
					this.mCurFrame = 0;
				}
				else {
					this.IsPlaying = false;
					return;
				}
			}
			else if (this.mCurFrame < 0) {
				if (this.Loop) {
					this.mCurFrame = this.FrameCount - 1;
				}
				else {
					this.IsPlaying = false;
					return;
				}
			}

			this.setSprite(this.mCurFrame);
		}

	}

	//添加动画数据接口
	public AddAnimation(animationKey:string, frameNames:string[]) {

		if(frameNames.length === 0) {
			alert("动画帧数据为空");
		}

		if(animationKey === "") {
			alert("动画键值为空");
		}

		
		let isHaveKey = false;
		for (let i = 0; i < this.SpriteFrames.length; ++i) {
			if (this.SpriteFrames[i].framekey === animationKey) {
				isHaveKey = true;
				break;
			}
		}

		//避免有相同key的动画
		if(!isHaveKey) {
			let frameData = new FrameData(animationKey, frameNames);
			this.SpriteFrames.push(frameData);
		}
	}

	//播放指定key对应的动画
	public play(key:string, loop=false) {
		this.currentAnimationData = null;
		this.FrameCount = 0;
		for(let i=0; i<this.SpriteFrames.length; ++i) {
			if(this.SpriteFrames[i].framekey === key) {
				this.currentAnimationData = this.SpriteFrames[i];
				this.FrameCount = this.currentAnimationData.frameNames.length;
				break;
			}
		}

		if(this.FrameCount === 0) {
			alert("不存在key对应的帧动画");
		}
		else {
			this.Loop = loop;
			this.Init();
		}
	}

	public stop() {
		if(!this.currentAnimationData) {
			this.IsPlaying = false;
			this.setSprite(0);
		}
	}

	//设置动画帧率
	public setFPS(fps:number) {
		this.FPS = fps;

		//每帧动画的时间间隔
		this.mFrameDelta = 1 / this.FPS;
	}
	
	private setSprite(spriteIndex:number) {
		this.ImageSource.source = this.currentAnimationData.frameNames[spriteIndex];
	}
}