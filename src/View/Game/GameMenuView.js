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
    Common.changeScene('HomeController');
  };
    
  return GameMenuView;
})();