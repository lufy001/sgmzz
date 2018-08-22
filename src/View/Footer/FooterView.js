var FooterView = (function(){
    function FooterView(){
        var _this = this;
        LExtends (_this, LSprite, []);
        _this.init();
    }
    FooterView.prototype.init = function(data){
        var _this = this;
        Common.FooterList.forEach(function(word){
        	var button = new FooterButtonView(word);
        	_this.addChild(button);
        });
        _this.y = LGlobal.height - _this.getHeight();
        _this.getChildByName("Home").on(true);
        CommonEvent.addEventListener(CommonEvent.SCENE_CHANGE, _this._sceneChange, _this);
		_this._update();
    };
    FooterView.prototype._update = function(){
        var _this = this;
        var w = 0;
        for(var i = 0;i < _this.numChildren;i++){
        	var button = _this.childList[i];
        	button.x = w;
        	w += button.getWidth();
        }
        _this.x = (LGlobal.width - w)*0.5;
    };
    FooterView.prototype._sceneChange = function(event){
        var _this = this;
        var name = event.name;
        for(var i = 0;i < _this.numChildren;i++){
            var button = _this.childList[i];
        	button.on(name === button.name);
        }
        _this._update();
    };
    return FooterView;
})();