class MainScene extends eui.Component implements  eui.UIComponent {
	
	private bg:eui.Image;
	private title_group:eui.Group;
	private foot_group:eui.Group;
	private hxm_group:eui.Group;
	private xy_group:eui.Group;
	private timerImage:eui.Image;

	private left_foot_btn:eui.Button;
	private right_foot_btn:eui.Button;
	private left_foot_runCounter:number = 0;
	private right_foot_runCounter:number = 0;

	private timerImageNames:string[] = [ "mainRes_json.倒数GO", "mainRes_json.倒数1", "mainRes_json.倒数2", "mainRes_json.倒数3" ];
	private timerIndex:number = 3;
	private timer:egret.Timer;

	private smile_left:eui.Image;
	private tired_right:eui.Image;

	private _hxm:egret.MovieClip;
	private _xy:egret.MovieClip;

	private _frameRate:number;

	private kb:KeyBoard;

	private _bg:egret.Bitmap;
	private finishedLine:egret.Bitmap;
	private upperBg:egret.Bitmap;
	
	private moveSpeed:number = 0.2;
	private initMoveSpeed:number = 0.2;
	private _hxmSpeed:number = 0.05;
	private _xySpeed:number = 0.05;
	private _xyStopTime:number = 0;
	//上一帧时间
	private lastTime:number = 0;

	private _isGameStart:boolean = false;

	private _isXYBehineHXM = false;

	private hxmAnimationType:number = 0;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void {
		super.childrenCreated();

		//初始化
		this.Init();

		//背景
		this._bg = GameUtil.Instance.createBitmapByName("背景长_jpg");
		this._bg.anchorOffsetX = this._bg.width / 2;
		this._bg.anchorOffsetY = this._bg.height;
		this._bg.x = GameUtil.Instance.stageCenterW;
		this._bg.y = GameUtil.Instance.stageH;
		this.addChildAt(this._bg, 0);

		//背景短
		// this.upperBg = GameUtil.Instance.createBitmapByName("背景_jpg");
		// this.upperBg.anchorOffsetX = this.upperBg.width / 2;
		// this.upperBg.anchorOffsetY = this.upperBg.height;
		// this.upperBg.x = GameUtil.Instance.stageCenterW;
		// this.upperBg.y = 0 - this._bg.height - GameUtil.Instance.stageH;
		// this.addChildAt(this.upperBg, 0);

		//终点线
		this.finishedLine = GameUtil.Instance.createBitmapByName("mainRes_json.终点");
		this.finishedLine.anchorOffsetX = this.finishedLine.width / 2;
		this.finishedLine.anchorOffsetY = this.finishedLine.height / 2;
		this.addChildAt(this.finishedLine, 1);
		this.finishedLine.x = GameUtil.Instance.stageCenterW;
		this.finishedLine.y = -(this._bg.height - GameUtil.Instance.stageH - this.hxm_group.y);//this._bg.y - this._bg.height + GameUtil.Instance.stageH + 200;
		// console.log(this._bg.y);
		// console.log(this._bg.height);
		// console.log(this.finishedLine.y);

		let playSound = this.title_group.getChildAt(1);	
		//设置鼠标手型
        mouse.setButtonMode(playSound, true);
		playSound.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			//播放声音
			console.log("play sound");
		}, this);

		//隐藏交互部分UI
		this.foot_group.alpha = 0;
		this.left_foot_btn.alpha = 0;
		this.right_foot_btn.alpha = 0;

		//倒计时计时器
		this.timer = new egret.Timer(1000, 4);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.changeTimerImage, this);
		this.timer.start();

		//河小马
		this._hxm = GameUtil.Instance.createFrameAnimation(RES.getRes("hxm_animation_json"), RES.getRes("hxm_animation_png"), "hxm_run");
		this._hxm.width = 200;
		this._hxm.height = 200;
		//this._hxm.gotoAndPlay("run", -1);
		this.hxm_group.addChild(this._hxm);
		let hxm = this.hxm_group.getChildAt(1);
		hxm.visible = false;
		this._hxm.x = hxm.x;
		this._hxm.y = hxm.y;
		this._frameRate = this._hxm.frameRate; 

		//小优
		this._xy = GameUtil.Instance.createFrameAnimation(RES.getRes("xy_animation_json"), RES.getRes("xy_animation_png"), "xy_run");
		this._xy.width = 200;
		this._xy.height = 200;
		//this._xy.gotoAndPlay("run", -1);
		this.xy_group.addChild(this._xy);
		let xy = this.xy_group.getChildAt(1);
		xy.visible = false;
		this._xy.x = xy.x;
		this._xy.y = xy.y;


		//键盘监听
		// this.kb = new KeyBoard();
        // //添加监听事件
        // this.kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
		//this.kb.addEventListener(KeyBoard.onkeyup,this.onkeyup,this);

		// this.touchEnabled = true;
        // this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        // this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        // this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        // this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);

		// document.addEventListener("keydown", this.onkeydown.bind(this))
		// document.addEventListener("keyup", this.onkeyup.bind(this))
	}

	private Init() {
		this.initMoveSpeed = this.moveSpeed;
	}

	private changeTimerImage() {
		this.timerIndex -= 1;
		if(this.timerIndex < 0) {
			//this.timerImage.visible = false;
			egret.Tween.get(this.timerImage)
			.to( {scaleX:0,scaleY:0}, 300, egret.Ease.sineIn );

			//显示脚印底部框
			egret.Tween.get(this.foot_group)
			.to( { alpha:1 }, 200, egret.Ease.sineIn );

			//显示左脚脚印
			egret.Tween.get(this.left_foot_btn)
			.wait(100)
			.to( { alpha:1 }, 200, egret.Ease.sineIn );

			//显示右脚脚印
			egret.Tween.get(this.right_foot_btn)
			.wait(300)
			.to( { alpha:1 }, 200, egret.Ease.sineIn ).call(()=>{

				//左右脚增加点击监听
				//设置鼠标手型
				mouse.setButtonMode(this.left_foot_btn, true);
				this.left_foot_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
					this.left_foot_btn.currentState = "down";
					this.pressLeftFoot();
				}, this);
				this.left_foot_btn.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
					this.left_foot_btn.currentState = "up";
					//console.log("left up");
				}, this);

				//设置鼠标手型
				mouse.setButtonMode(this.right_foot_btn, true);
				this.right_foot_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
					this.right_foot_btn.currentState = "down";
					this.pressRightFoot();
				}, this);
				this.right_foot_btn.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
					this.right_foot_btn.currentState = "up";
					//console.log("right up");
				}, this);
			}, this);

			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.changeTimerImage, this);

			//添加帧事件监听
			this.addEventListener(egret.Event.ENTER_FRAME, this.frameUpdate, this);
			this.lastTime = egret.getTimer();

			//键盘事件监听
			this.onkeydown = this.onkeydown.bind(this);
			this.onkeyup = this.onkeyup.bind(this);
			document.addEventListener("keydown", this.onkeydown)
			document.addEventListener("keyup", this.onkeyup)

			this._hxm.gotoAndPlay("run", 1);
			this._xy.gotoAndPlay("run", -1);

			this._hxm.addEventListener(egret.Event.LOOP_COMPLETE, function (e: egret.Event): void {
				if(!this._isGameStart) {
					this._hxm.stop();
				}
				// else {
				// 	if(this.hxmAnimationType == 0) {
				// 		this._hxm.gotoAndPlay("run", 1);
				// 	}
				// 	else if(this.hxmAnimationType == 1) {
				// 		this._hxm.gotoAndPlay("left_run", 1);
				// 	}
				// 	else if(this.hxmAnimationType == 2) {
				// 		this._hxm.gotoAndPlay("right_run", 1);
				// 	}
				// 	console.log("loop complete");
				// }
				//console.log("loop complete");
			}, this);

			this._hxm.addEventListener(egret.Event.COMPLETE, function (e: egret.Event): void {
				if(!this._isGameStart) {
					this._hxm.stop();
				}
				else {
					if(this.left_foot_runCounter <= 0 && this.right_foot_runCounter <= 0) {
						this._hxm.gotoAndPlay("run", 1);
					}
				}
				this._hxm.frameRate = this._frameRate;
				//console.log("complete");
			}, this);

			//开始游戏
			this._isGameStart = true;
		}
		else {
			this.timerImage.source = this.timerImageNames[this.timerIndex];

			egret.Tween.get(this.timerImage)
			.to( {scaleX:1.2,scaleY:1.2}, 250, egret.Ease.sineIn )
			.to( {scaleX:1.0,scaleY:1.0}, 250, egret.Ease.sineIn );
		}
	}

	private frameUpdate() {

		if(!this._isGameStart) {
			return;
		}

		var currentTime: number = egret.getTimer();
		var gapTime: number = currentTime - this.lastTime;
		this.lastTime = currentTime;

		//背景图移动逻辑
		// if(this._bg.y < (this._bg.height - GameUtil.Instance.stageH)) {
		// 	this._bg.y += this.moveSpeed * gapTime;
		// 	if(this._bg.y >= (this._bg.height - GameUtil.Instance.stageH)) {

		// 		this._bg.y = this._bg.height - GameUtil.Instance.stageH;

		// 		this._xySpeed += this.moveSpeed;
		// 		this._hxmSpeed += this.moveSpeed;
		// 	}

		// 	this.finishedLine.y += this.moveSpeed * gapTime;

		// 	this.upperBg.y += this.moveSpeed * gapTime;
		// }

		if (this.hxm_group.y > this.finishedLine.y) {

			var moveDelta = this.moveSpeed * gapTime;

			this._bg.y += moveDelta;
			this.finishedLine.y += moveDelta;
			//this.upperBg.y += moveDelta;

			if (this.hxm_group.y <= this.finishedLine.y) {

				this.gameFinished();
			}
		}

		//播放河小马动画
		if(this.left_foot_runCounter > 0) {

			if(!this._hxm.isPlaying) {
				if(this.left_foot_runCounter > 1) {
					this.showEmoji(0);
				}
				this._hxm.gotoAndPlay("left_run", this.left_foot_runCounter);
				this.left_foot_runCounter = 0;
				//this.hxmAnimationType = 1;
				this._hxm.frameRate = this._frameRate * 2;
			}
		}

		if(this.right_foot_runCounter > 0) {

			if(!this._hxm.isPlaying) {
				if(this.right_foot_runCounter > 1) {
					this.showEmoji(0);
				}
				this._hxm.gotoAndPlay("right_run", this.right_foot_runCounter);
				this.right_foot_runCounter = 0;
				//this.hxmAnimationType = 2;
				this._hxm.frameRate = this._frameRate * 2;
			}
		}

		//小优移动
		if(this._xyStopTime == 0) {
			this.xy_group.y -= this._xySpeed * gapTime;//小优前进
			if(this.xy_group.y <= this.finishedLine.y) {
				this.xy_group.y = this.finishedLine.y;

				this.gameFinished();

				if(this.xy_group.y < 200) {
					egret.Tween.get(this.xy_group).to({ y:this.xy_group.y + (this.hxm_group.y - 200) }, 1000, egret.Ease.sineIn)
					egret.Tween.get(this._bg).to({ y:this._bg.y + (this.hxm_group.y - 200) }, 1000, egret.Ease.sineIn)
					egret.Tween.get(this.finishedLine).to({ y:this.finishedLine.y + (this.hxm_group.y - 200) }, 1000, egret.Ease.sineIn)
				}
			}

			//小优从落后到追上河小马 显示得意表情
			if(this.xy_group.y < this.hxm_group.y && this._isXYBehineHXM) {
				this._isXYBehineHXM = false;
				this.showEmoji(1);
			}
		}
		else {
			this._xyStopTime -= gapTime / 1000;
			if(this._xyStopTime <= 0) {
				this._xyStopTime = 0;
				this.moveSpeed = this.initMoveSpeed;//恢复场景物体移动速度
			}
			this.xy_group.y += this.moveSpeed * gapTime;//小优跟随场景背景后退移动，达到被河小马追赶落后的效果
			//console.log(this._xyStopTime);
		}

		//判断小优落后河小马
		if(this.xy_group.y > this.hxm_group.y) {
			this._isXYBehineHXM = true;
		}
	}

	private gameFinished() {
		//游戏结束
		this._isGameStart = false;

		document.removeEventListener("keydown", this.onkeydown);
		document.removeEventListener("keyup", this.onkeyup);

		this.left_foot_btn.currentState = "up";
		this.right_foot_btn.currentState = "up";

		this.left_foot_btn.touchEnabled = false;
		this.right_foot_btn.touchEnabled = false;

		//播放声音按钮
		this.title_group.getChildAt(1).touchEnabled = false;

		this._xy.stop();
		this._hxm.stop();

		//移除帧监听
		this.removeEventListener(egret.Event.ENTER_FRAME, this.frameUpdate, this);

		console.log("finished");
	}

	private showEmoji(type) {
		if(type == 0) {
			egret.Tween.removeTweens(this.tired_right);
			egret.Tween.get(this.tired_right)
			.to({ alpha: 1 }, 200, egret.Ease.sineIn)
			.to({ scaleX: 1.2, scaleY: 1.2, }, 200)
			.to({ scaleX: 1.0, scaleY: 1.0, }, 200)
			.wait(200)
			.to({ alpha: 0 }, 100)
		}
		else if(type == 1) {
			egret.Tween.removeTweens(this.smile_left);
			egret.Tween.get(this.smile_left)
			.to({ alpha: 1 }, 200, egret.Ease.sineIn)
			.to({ scaleX: 1.2, scaleY: 1.2, }, 200)
			.to({ scaleX: 1.0, scaleY: 1.0, }, 200)
			.wait(200)
			.to({ alpha: 0 }, 100)
		}
	}

	private onkeydown(event) {

		//console.log(event.keyCode);
		if (event.keyCode == 37) {
			//left Arrow
			this.footKeyBoard('left', 'down');
		}

		if (event.keyCode == 39) {
			//right Arrow
			this.footKeyBoard('right', 'down');
		}
    }

	private onkeyup(event) {

		//console.log(event.keyCode);
		if (event.keyCode == 37) {
			//left Arrow
			this.footKeyBoard('left', 'up');
		}

		if (event.keyCode == 39) {
			//right Arrow
			this.footKeyBoard('right', 'up');
		}
    }

	private footKeyBoard(foot:string, keystatus:string) {
		if(foot === "left") {
			if(keystatus === "down" && this.left_foot_btn.currentState !== "down") {
				this.left_foot_btn.currentState = "down";

				this.pressLeftFoot();
			}
			else if(keystatus === "up") {
				this.left_foot_btn.currentState = "up";
			}
		}
		else if(foot === "right") {
			if(keystatus === "down" && this.right_foot_btn.currentState !== "down") {
				this.right_foot_btn.currentState = "down";

				this.pressRightFoot();
			}
			else if(keystatus === "up") {
				this.right_foot_btn.currentState = "up";
			}
		}
	}

	private pressLeftFoot() {
		//console.log("left down");
		if(!this._hxm.isPlaying) {
			this._hxm.stop();
			this._hxm.gotoAndPlay("left_run", this.left_foot_runCounter);
			this._hxm.frameRate = this._frameRate;
			this.left_foot_runCounter = 0;
		}
		else {
			this.left_foot_runCounter += 1;
		}
		this.calculateChaseTime();
	}

	private pressRightFoot() {
		//console.log("right down");
		if(!this._hxm.isPlaying) {
			this._hxm.gotoAndPlay("right_run", this.right_foot_runCounter);
			this._hxm.frameRate = this._frameRate;
			this.right_foot_runCounter = 0;
		}
		else {
			this.right_foot_runCounter += 1;
		}
		this.calculateChaseTime();
	}

	private calculateChaseTime() {

		//this.lastTime = egret.getTimer();

		this.moveSpeed = 0.3;
		if(this.xy_group.y < this.hxm_group.y) {
			this._xyStopTime = Math.abs(this.xy_group.y - this.hxm_group.y) / this.moveSpeed / 1000;
			this._xyStopTime += 0.1;
		}
		else {
			if(this._xyStopTime < 0.1) {
				this._xyStopTime += (Math.random() * 0.1) + 0.1;//Math.abs(this.xy_group.y - this.hxm_group.y) / this.moveSpeed / 1000;
			}
			//console.log(this._xyStopTime);
		}
	}

	private onRollOver(e: egret.TouchEvent): void {
        console.log("roll over " + e.target.name + "  " + e.bubbles);
    }

    private onRollOut(e: egret.TouchEvent): void {
        console.log("roll out " + e.target.name + "  " + e.bubbles);
    }

    private onMouseOver(e: egret.TouchEvent): void {
        console.log("mouse over " + e.target.name + "  " + e.bubbles);
    }

    private onMouseOut(e: egret.TouchEvent): void {
        console.log("mouse out " + e.target.name + "  " + e.bubbles);
    }
}