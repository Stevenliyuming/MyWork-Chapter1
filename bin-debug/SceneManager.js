//场景管理类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    // private _finishScene:FinishScene;
    // private _rankScene:RankScene;
    function SceneManager() {
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new SceneManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "MainLayer", {
        // public get PlayScene():PlayScene
        // {
        // 	return this._playScene;
        // }
        set: function (_ml) {
            this._mainLayer = _ml;
        },
        enumerable: true,
        configurable: true
    });
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
    SceneManager.prototype.gotoPlayScene = function () {
        // if(this._startScene)
        // {
        // 	this._mainLayer.removeChild(this._startScene);
        // 	this._startScene.clearListener();
        // 	this._startScene = null;
        // }
        if (this._playScene == null) {
            this._playScene = new MainScene();
            this._mainLayer.addChild(this._playScene);
        }
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map