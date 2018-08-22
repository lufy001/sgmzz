var ShopController = (function(){
    function ShopController(){
        var _this = this;
		LExtends (_this, BaseController, []);
        _this.init();
    }
    ShopController.prototype.init = function(){
        var _this = this;
        
        
    };
    ShopController.prototype._gotoGame = function(event){
        var _this = this;
        console.log(_this);
        var gameController = new GameController();
        rootLayer.addChild(gameController);
        _this.remove();
    };
    return ShopController;
})();