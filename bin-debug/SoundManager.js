var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SoundManager = (function () {
    function SoundManager() {
        this._isSoundResLoaded = false;
        this._soundRootUrl = GameUtil.Instance.remoteResUrl + "/resource/assets/Sound/";
        this._isPlayingBGMusic = false;
        this._pauseTime = 0;
        this.bgMusic = [];
        this.bgMusicNames = ["bg_0_mp3", "bg_1_mp3", "bg_2_mp3"];
        this.effect = [];
        this.effectChannel = [];
        this.effectNames = ["Button_mp3", "Fall_mp3", "Flap_mp3", "Hit_mp3", "Score_mp3"];
        this._loadedMusicNum = 0;
        this._loadEffectNum = 0;
        this._isMusicLoadFinished = false;
        this._isEffectLoadFinished = false;
        this._musicVolume = 1;
        //this.LoadSoundRes();
    }
    Object.defineProperty(SoundManager, "Instance", {
        get: function () {
            if (!SoundManager._instance) {
                SoundManager._instance = new SoundManager();
            }
            return SoundManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.LoadSoundRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.effectNames.length)) return [3 /*break*/, 4];
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
                        _a = this.effect;
                        _b = i;
                        return [4 /*yield*/, RES.getRes(this.effectNames[i])];
                    case 2:
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
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        this._isEffectLoadFinished = true;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (_this._isEffectLoadFinished) {
                                    resolve();
                                }
                                else {
                                    reject();
                                }
                            })];
                }
            });
        });
    };
    SoundManager.prototype.PlayBGMusic = function (index) {
        if (this._isPlayingBGMusic == false && this._isMusicLoadFinished) {
            this._isPlayingBGMusic = true;
            this._bgMusicChannel = this.bgMusic[index].play(this._pauseTime, 0);
            this.setBgMusicVolume();
            //this._bgMusicChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.musicComplete, this);
        }
    };
    SoundManager.prototype.setBgMusicVolume = function () {
        if (this._musicVolume != GameUtil.Instance.musicVolume) {
            this._musicVolume = GameUtil.Instance.musicVolume;
            this._bgMusicChannel.volume = GameUtil.Instance.musicVolume;
        }
    };
    SoundManager.prototype.musicComplete = function () {
        this._isPlayingBGMusic = false;
        this._bgMusicChannel.stop();
        this._bgMusicChannel = null;
    };
    SoundManager.prototype.StopBGMusic = function () {
        if (this._isPlayingBGMusic) {
            this._isPlayingBGMusic = false;
            this._pauseTime = 0;
            this._bgMusicChannel.stop();
            //this._bgMusicChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.musicComplete, this);
            this._bgMusicChannel = null;
        }
    };
    SoundManager.prototype.PauseBGMusic = function () {
        if (this._isPlayingBGMusic) {
            this._isPlayingBGMusic = false;
            this._pauseTime = this._bgMusicChannel.position;
            this._bgMusicChannel.stop();
            this._bgMusicChannel = null;
        }
    };
    SoundManager.prototype.PlayEffect = function (index) {
        if (this._isEffectLoadFinished == false || index >= this.effect.length) {
            return;
        }
        if (this.effectChannel[index]) {
            this.effectChannel[index].stop();
            this.effectChannel[index] = null;
        }
        this.effectChannel[index] = this.effect[index].play(0, 1);
        this.effectChannel[index].volume = GameUtil.Instance.effectVolume;
    };
    SoundManager.prototype.SoundLoadedFinished = function () {
        if (this._isMusicLoadFinished && this._isEffectLoadFinished) {
            return true;
        }
        return false;
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map