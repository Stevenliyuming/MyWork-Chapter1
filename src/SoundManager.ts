class SoundManager {
	
	private static _instance:SoundManager;
	
	public _isSoundResLoaded:boolean = false;

	private _soundRootUrl:string = GameUtil.Instance.remoteResUrl + "/resource/assets/Sound/";

	private _bgMusicChannel:egret.SoundChannel;

	private _isPlayingBGMusic:boolean = false;
	private _pauseTime:number = 0;
	
	private bgMusic:egret.Sound[] = [];
	private bgMusicNames:string[] = ["bg_0_mp3", "bg_1_mp3", "bg_2_mp3"];

	private effect:egret.Sound[] = [];
	private effectChannel:egret.SoundChannel[] = [];
	private effectNames:string[] = ["Button_mp3", "Fall_mp3", "Flap_mp3", "Hit_mp3", "Score_mp3"];

	private _loadedMusicNum = 0;
	private _loadEffectNum = 0;

	private _isMusicLoadFinished = false;
	private _isEffectLoadFinished = false;

	private _musicVolume:number = 1;

	public constructor() {

		//this.LoadSoundRes();
	}

	public static get Instance():SoundManager
	{
		if(!SoundManager._instance)
		{
			SoundManager._instance = new SoundManager();
		}

		return SoundManager._instance;
	}

	public async LoadSoundRes():Promise<any>
	{
		// //加载背景音乐
		// this._loadedMusicNum = 0;
		// this._isMusicLoadFinished = false;
		// for(let i=0; i<this.bgMusicNames.length; ++i)
		// {
		// 	// this.bgMusic[i] = new egret.Sound();
		// 	// this.bgMusic[i].type = egret.Sound.MUSIC;
		// 	// this.bgMusic[i].load(this._soundRootUrl + this.bgMusicNames[i]);
		// 	// //sound 加载完成监听
		// 	// this.bgMusic[i].addEventListener(egret.Event.COMPLETE, (e: egret.Event)=> {
		// 	// 	console.log("music loaded");
		// 	// 	this._loadedMusicNum += 1;
		// 	// 	if(this._loadedMusicNum >= this.bgMusicNames.length)
		// 	// 	{
		// 	// 		this._isMusicLoadFinished = true;

		// 	// 		//this.PlayBGMusic(0);
		// 	// 	}
		// 	// }, this);
			
		// 	this.bgMusic[i] = RES.getRes(this.bgMusicNames[i]);//load(this.bgMusicNames[i]);
		// }
		// this._isMusicLoadFinished = true;

		//加载音效
		for(let i=0; i<this.effectNames.length; ++i)
		{
			// this.effect[i] = new egret.Sound();
			// this.effect[i].type = egret.Sound.EFFECT;
			// this.effect[i].load(this._soundRootUrl + this.effectNames[i]);
			// //sound 加载完成监听
			// this.effect[i].addEventListener(egret.Event.COMPLETE, (e: egret.Event)=> {
			// 	console.log("effect loaded");
			// 	this._loadEffectNum += 1;
			// 	if(this._loadEffectNum >= this.effectNames.length)
			// 	{
			// 		this._isEffectLoadFinished = true;
			// 	}
			// }, this);

			this.effect[i] = await RES.getRes(this.effectNames[i]);
			//this.effect.push(sound);
		}
		this._isEffectLoadFinished = true;

		return new Promise((resolve, reject)=>{
			if(this._isEffectLoadFinished)
			{
				resolve();
			}
			else
			{
				reject();
			}
		});
		// return new Promise((resolve, reject)=>{

		// //加载音效
		// for(let i=0; i<this.effectNames.length; ++i)
		// {
		// 	// this.effect[i] = new egret.Sound();
		// 	// this.effect[i].type = egret.Sound.EFFECT;
		// 	// this.effect[i].load(this._soundRootUrl + this.effectNames[i]);
		// 	// //sound 加载完成监听
		// 	// this.effect[i].addEventListener(egret.Event.COMPLETE, (e: egret.Event)=> {
		// 	// 	console.log("effect loaded");
		// 	// 	this._loadEffectNum += 1;
		// 	// 	if(this._loadEffectNum >= this.effectNames.length)
		// 	// 	{
		// 	// 		this._isEffectLoadFinished = true;
		// 	// 	}
		// 	// }, this);

		// 	this.effect[i] = RES.getRes(this.effectNames[i]);
		// 	//this.effect.push(sound);
		// }
		// this._isEffectLoadFinished = true;

		// resolve();

		// });
	}

	public PlayBGMusic(index:number)
	{
		if(this._isPlayingBGMusic == false && this._isMusicLoadFinished)
		{
			this._isPlayingBGMusic = true;

			this._bgMusicChannel = this.bgMusic[index].play(this._pauseTime, 0);
			
			this.setBgMusicVolume()

			//this._bgMusicChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.musicComplete, this);
		}
	}

	public setBgMusicVolume()
	{
		if(this._musicVolume != GameUtil.Instance.musicVolume)
		{
			this._musicVolume = GameUtil.Instance.musicVolume;
			this._bgMusicChannel.volume = GameUtil.Instance.musicVolume;
		}
	}

	private musicComplete()
	{
		this._isPlayingBGMusic = false;

		this._bgMusicChannel.stop();
		this._bgMusicChannel = null;
	}

	public StopBGMusic()
	{
		if(this._isPlayingBGMusic)
		{
			this._isPlayingBGMusic = false;

			this._pauseTime = 0;

			this._bgMusicChannel.stop();
			//this._bgMusicChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.musicComplete, this);
			this._bgMusicChannel = null;
		}
	}

	public PauseBGMusic()
	{
		if(this._isPlayingBGMusic)
		{
			this._isPlayingBGMusic = false;

			this._pauseTime = this._bgMusicChannel.position;
			this._bgMusicChannel.stop();
			this._bgMusicChannel = null;
		}
	}

	public PlayEffect(index:number)
	{
		if(this._isEffectLoadFinished == false || index >= this.effect.length)
		{
			return;
		}

		if(this.effectChannel[index])
		{
			this.effectChannel[index].stop();
			this.effectChannel[index] = null;
		}

		this.effectChannel[index] = this.effect[index].play(0, 1);
		this.effectChannel[index].volume = GameUtil.Instance.effectVolume;

	}

	public SoundLoadedFinished():boolean {
		if(this._isMusicLoadFinished && this._isEffectLoadFinished)
		{
			return true;
		}
		return false;
	}
}