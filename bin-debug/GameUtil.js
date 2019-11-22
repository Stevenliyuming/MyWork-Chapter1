//游戏工具类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//游戏状态枚举类型
var GameState;
(function (GameState) {
    GameState[GameState["Start"] = 0] = "Start";
    GameState[GameState["Playing"] = 1] = "Playing";
    GameState[GameState["Pause"] = 2] = "Pause";
    GameState[GameState["Ready"] = 3] = "Ready";
    GameState[GameState["Finished"] = 4] = "Finished";
})(GameState || (GameState = {}));
;
var GameUtil = (function () {
    //public userInfoButtonData = { left:0, top:0, width:30, height:20, stageW:400, stageH:640 };
    function GameUtil() {
        this.remoteResUrl = "http://106.52.184.124/TabAndFly_wxgame_remote";
        this._GameState = GameState.Ready;
        this.musicVolume = 1;
        this.effectVolume = 1;
        this.gameLevel = 0;
    }
    Object.defineProperty(GameUtil, "Instance", {
        get: function () {
            if (GameUtil._instance == null) {
                GameUtil._instance = new GameUtil();
            }
            return GameUtil._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameUtil.prototype.Init = function (main) {
        GameUtil.Instance.stageW = main.stage.stageWidth;
        GameUtil.Instance.stageH = main.stage.stageHeight;
        GameUtil.Instance.stageCenterW = main.stage.stageWidth * 0.5;
        GameUtil.Instance.stageCenterH = main.stage.stageHeight * 0.5;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    GameUtil.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    GameUtil.prototype.createFrameAnimation = function (_mcData, _mcTexture, _mcName) {
        var mcDataFactory = new egret.MovieClipDataFactory(_mcData, _mcTexture);
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData(_mcName));
        return role;
    };
    /**范围内获取整数随机数*/
    GameUtil.prototype.getRandomNumber = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    GameUtil.prototype.initData = function (stage) {
    };
    GameUtil.prototype.setScreenAuto = function (_target) {
        _target.left = 0;
        _target.right = 0;
        _target.top = 0;
        _target.bottom = 0;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map