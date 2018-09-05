var EventsController = (function() {
  function EventsController() {
    var _this = this;
    LExtends(_this, BaseController, []);
    _this.init();
  }
  EventsController.prototype.init = function() {
    var _this = this;
        
  };
  EventsController.prototype._gotoGame = function(event) {
    var _this = this;
    var gameController = new GameController();
    rootLayer.addChild(gameController);
    _this.remove();
  };
  return EventsController;
})();