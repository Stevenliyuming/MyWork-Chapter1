//游戏工具类

//游戏状态枚举类型
enum GameState { Start, Playing, Pause, Ready, Finished };

class GameUtil {

	private static _instance:GameUtil

	public stageW:number;
	public stageH:number;
	public stageCenterW:number;
	public stageCenterH:number;
	public windowW:number;
	public windowH:number;

	public remoteResUrl:string = "http://106.52.184.124/TabAndFly_wxgame_remote";

	public _GameState:GameState = GameState.Ready;

	public musicVolume:number = 1;
	public effectVolume:number = 1;

	public gameLevel:number = 0;

	//public userInfoButtonData = { left:0, top:0, width:30, height:20, stageW:400, stageH:640 };

	private constructor() {
	}

	public static get Instance():GameUtil
	{
		if(GameUtil._instance == null)
		{
			GameUtil._instance = new GameUtil();
		}

		return GameUtil._instance;
	}

	public Init(main:Main):void
	{
        GameUtil.Instance.stageW = main.stage.stageWidth;
        GameUtil.Instance.stageH = main.stage.stageHeight;

        GameUtil.Instance.stageCenterW = main.stage.stageWidth * 0.5;
        GameUtil.Instance.stageCenterH = main.stage.stageHeight * 0.5;
	}

	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
	public createBitmapByName(name: string): egret.Bitmap 
	{
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

	public createFrameAnimation(_mcData, _mcTexture, _mcName):egret.MovieClip
	{
		var mcDataFactory = new egret.MovieClipDataFactory(_mcData, _mcTexture);
        var role:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(_mcName));
		return role;
	}


	/**范围内获取整数随机数*/ 
    public getRandomNumber(min: number, max: number): number 
	{  
		var Range = max - min;  
		var Rand = Math.random();
		return(min + Math.round(Rand * Range));
	}

	public initData(stage:egret.Stage):void
	{
	}

	public setScreenAuto(_target):void {
		_target.left = 0;
		_target.right = 0;
		_target.top = 0;
		_target.bottom = 0;
 	}
 
}