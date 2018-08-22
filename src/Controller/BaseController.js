var BaseController = (function(){
    function BaseController(request, properties){
        var _this = this;
		LExtends (_this, AutoDisplayObject, []);
        _this.name = _this.constructor.name;
        if(!Common.currentController){
            Common.currentController = _this;
        }

        _this._properties = properties;
        _this._initProperties();

        //_this.onLoad(request);
    }
    BaseController.prototype.onLoad = function(request){
    };
    BaseController.prototype.changeScene = function(request){
        var _this = this;
		Common.oldController = Common.currentController;
        Common.currentController = _this;

        var oldWord = Common.oldController.name.replace("Controller", "");
        var oldIndex = Common.FooterList.indexOf(oldWord);
        var currentWord = Common.currentController.name.replace("Controller", "");
        var currentIndex = Common.FooterList.indexOf(currentWord);
        if(currentIndex >= 0){
            let event = new LEvent(CommonEvent.SCENE_CHANGE);
            event.name = currentWord;
            CommonEvent.dispatchEvent(event);
        }
        _this.visible = true;
        if(oldIndex >= 0 && currentIndex >= 0){
            _this._moveChangeRun(oldIndex, currentIndex);
        }else{
            _this._fadeChangeRun(currentIndex >= 0);
        }
        _this.onLoad(request);
    };
    BaseController.prototype._moveChangeRun = function(oldIndex, currentIndex){
        var _this = this;
        _this.x = oldIndex > currentIndex ? -LGlobal.width : LGlobal.width;
        LTweenLite.to(_this, 0.3, {x:0});
        LTweenLite.to(Common.oldController, 0.3, {x:-_this.x, onComplete:function(event){
            event.target.visible = false;
        }});
    };
    BaseController.prototype._fadeChangeRun = function(isHome){
        var _this = this;
        _this.x = 0;
        _this.alpha = 0;
        LTweenLite.to(_this, 0.3, {alpha:1});
        LTweenLite.to(Common.oldController, 0.3, {alpha:0, onComplete:function(event){
            event.target.alpha = 1;
            event.target.visible = false;
            footerView.visible = isHome;
            headerView.visible = isHome;
        }});
    };
    return BaseController;
})();