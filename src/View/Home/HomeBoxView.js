var HomeBoxView = (function(){
    function HomeBoxView(model){
        var _this = this;
        LExtends (_this, BoxIconView, [model]);
    }
    HomeBoxView.prototype.init = function(data){
        var _this = this;
        _this._showIcon(data);
        _this._addLockIcon();
        _this._showUnlockTime();
    };
    HomeBoxView.prototype._addLockIcon = function(){
        var _this = this;
        if(_this.boxModel.status() !== "lock"){
            return;
        }
        var icon = new LBitmap(new LBitmapData(dataList["icon_lock"]));
        icon.x = 20;
        icon.y = 25;
        _this.addChild(icon);
    };
    HomeBoxView.prototype._showUnlockTime = function(){
        var _this = this;
        if(_this.boxModel.time() === 0){
            return;
        }
        _this.countDown = new TimeCountDownView(_this.boxModel.time());
        _this.countDown.x = 50;
        _this.countDown.y = 100;
        _this.addChild(_this.countDown);
    };
    return HomeBoxView;
})();