var HomeBoxsDialogController = (function(){
    function HomeBoxsDialogController(request){
        var _this = this;
		LExtends (_this, DialogController, [request]);
    }
    HomeBoxsDialogController.prototype.onLoad = function(request){
        var _this = this;
        _this._boxLayer = new LSprite();
        _this._boxLayer.x = 10;
        _this._boxLayer.y = 30;
        _this.layer.addChild(_this._boxLayer);
        _this.updateView();
        CommonEvent.addEventListener(CommonEvent.OPEN_BOX, _this.updateView, _this);
    };
    HomeBoxsDialogController.prototype.updateView = function(){
        var _this = this;
        _this._boxLayer.removeAllChild();
        UserService.instance().playerModel.boxs().forEach(function(box){
            _this._addBox(box);
        });
    };
    HomeBoxsDialogController.prototype._addEmpty = function(){
        var _this = this;
        var bitmap = new LBitmap(new LBitmapData(dataList["icon_coin"]));
        bitmap.x = _this._boxLayer.numChildren * 115;
        _this._boxLayer.addChild(bitmap);
    };
    HomeBoxsDialogController.prototype._addBox = function(box){
        var _this = this;
        if(!box){
        	_this._addEmpty();
        	return,
        }
        var boxView = new HomeBoxView(box);
        boxView.x = _this._boxLayer.numChildren * 115;
        _this._boxLayer.addChild(boxView);
        boxView.addEventListener(LMouseEvent.MOUSE_UP, _this._onClickBox, _this);
    };
    HomeBoxsDialogController.prototype._onClickBox = function(event){
        var _this = this;
        var unlocking = UserService.instance().playerModel.boxs().find(function(box){
            return box.status() === "unlock" && box.time() > 0;
        });
        var boxView = event.currentTarget;
        var params = {width:360,height:300,model:boxView.boxModel,hideClose:true,toUnlock:!unlocking};
        var dialog = new BoxDetailDialogController(params);
        dialogLayer.addChild(dialog);
    };
    return HomeBoxsDialogController;
})();