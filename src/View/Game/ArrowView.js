var Direction = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
  ALL: 'question'
};
var ArrowView = (function() {
  function ArrowView() {
    var _this = this;
    var properties = {
      sprite: {
        type: 'LBitmap',
        data: null
      }
    };
    LExtends(_this, BaseView, [properties]);
  }
  ArrowView.prototype.isAll = function() {
    return this.direction === Direction.ALL;
  };
  ArrowView.prototype.init = function() {
    var _this = this;
    _this.setState(_this.direction, false);
  };
  ArrowView.prototype.setState = function(value, isDark) {
    var _this = this;
    _this.isDark = isDark;
    _this.currentDirection = value;
    _this.sprite.bitmapData = GameManager.getArrowData(value, isDark);
  };
  ArrowView.prototype.setDirection = function(value) {
    var _this = this;
    _this.direction = value;
    _this.init();
  };
  return ArrowView;
})();