var GroupController = (function(){
    function GroupController(){
        var _this = this;
		LExtends (_this, BaseController, []);
        _this.init();
    }
    GroupController.prototype.init = function(){
        var _this = this;
        
        
        
    };
    GroupController.prototype._gotoGame = function(event){
        var _this = this;
        console.log(_this);
        var gameController = new GameController();
        rootLayer.addChild(gameController);
        _this.remove();
    };
    return GroupController;
})();