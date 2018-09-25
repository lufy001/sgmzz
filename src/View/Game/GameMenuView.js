var GameMenuView = (function() {
  function GameMenuView() {
    var _this = this;
    var properties = {
      btnLeft: {
        type: 'CommonButton',
        label: 'x',
        onClick: '_onClose',
        properties: {
          x: 0,
          y: 860
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
  }
  GameMenuView.prototype.init = function() {
    var _this = this;
  };
  GameMenuView.prototype._onClose = function(event) {
    var _this = this;
    var request = { message: 'quit game?', width: 300, height: 200 };
    request.okEvent = function() {
      _this.visible = false;
      Common.changeScene('HomeController');
    };
    request.cancelEvent = function() {
      _this.visible = false;
    };
    var dialog = new ConfirmDialogController(request);
    dialogLayer.addChild(dialog);
  };
    
  return GameMenuView;
})();