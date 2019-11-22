//场景管理类

class SceneManager {

	private static _instance:SceneManager;

	private _mainLayer:Main;

	// private _startScene:StartScene;

	private _playScene:MainScene;

	// private _finishScene:FinishScene;

	// private _rankScene:RankScene;

	private constructor() {
	}

	public static get Instance():SceneManager
	{
		if(!this._instance)
		{
			this._instance = new SceneManager();
		}

		return this._instance;
	}

	// public get PlayScene():PlayScene
	// {
	// 	return this._playScene;
	// }


	public set MainLayer(_ml:Main)
	{
		this._mainLayer = _ml;
	}

	// public gotoStartScene():void
	// {
	// 	if(this._finishScene != null)
	// 	{
	// 		this._mainLayer.removeChild(this._finishScene);
	// 		this._finishScene.clearListener();
	// 		this._finishScene = null;
	// 	}

	// 	if(this._playScene != null)
	// 	{
	// 		this._mainLayer.removeChild(this._playScene);
	// 		this._playScene.clearScene();
	// 		this._playScene = null;
	// 	}

	// 	if(this._startScene == null)
	// 	{
	// 		this._startScene = new StartScene();
	// 		this._mainLayer.addChild(this._startScene);
	// 	}
	// }

	// public gotoRankScene():void
	// {
	// 	if(!this._rankScene)
	// 	{
	// 		this._rankScene = new RankScene();
	// 		this._mainLayer.addChild(this._rankScene);
	// 	}

	// 	if(this._startScene)
	// 	{
	// 		this._startScene.touchEnabled = false;
	// 		this._startScene.clearListener();
	// 	}

	// 	if(this._finishScene)
	// 	{
	// 		this._finishScene.touchEnabled = false;
	// 		this._finishScene.clearListener();
	// 	}
	// }

	// public removeRankScene()
	// {
	// 	if(this._rankScene)
	// 	{
	// 		this._rankScene.clearRankPanel();

	// 		this._mainLayer.removeChild(this._rankScene);
	// 		this._rankScene = null;
	// 	}

	// 	if(this._startScene)
	// 	{
	// 		this._startScene.touchEnabled = true;
	// 		this._startScene.addListener();

	// 	}

	// 	if(this._finishScene)
	// 	{
	// 		this._finishScene.touchEnabled = true;
	// 		this._finishScene.addListener();
	// 	}
	// }

	public gotoPlayScene():void
	{
		// if(this._startScene)
		// {
		// 	this._mainLayer.removeChild(this._startScene);
		// 	this._startScene.clearListener();
		// 	this._startScene = null;
		// }

		if(this._playScene == null)
		{
			this._playScene = new MainScene();
			this._mainLayer.addChild(this._playScene);
		}
	}

	// public gotoFinishedScene():void
	// {
	// 	if(!this._finishScene)
	// 	{
	// 		this._finishScene = new FinishScene();
	// 		this._mainLayer.addChild(this._finishScene);

	// 		this._finishScene.showScore(this._playScene.PlayScore, this._playScene.BestScore);
	// 	}
	// }

	// public restartGame():void
	// {
	// 	if(this._playScene)
	// 	{
	// 		this._playScene.restartGame();
	// 	}

	// 	if(this._finishScene)
	// 	{
	// 		this._mainLayer.removeChild(this._finishScene);
	// 		this._finishScene.clearListener();
	// 		this._finishScene = null;
	// 	}
	// }

}