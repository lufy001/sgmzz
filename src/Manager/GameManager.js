var GameManager = (function() {
  function GameManager() {
    var _this = this;
    _this._arrowPool = [];
    _this._arrowDataPool = {};
    _this.stepIndex = 1;
    _this.stepSum = 1;
  }
  GameManager.prototype.getArrowData = function(direction, isDark) {
    var _this = this;
    var key = (isDark ? 'dark-' : '') + 'arrow-' + direction;
    if (!_this._arrowDataPool[key]) {
      _this._arrowDataPool[key] = new LBitmapData(dataList[key]);
    }
    return _this._arrowDataPool[key];
  };
  GameManager.prototype.getArrow = function() {
    var arrow;
    if (this._arrowPool.length > 0) {
      arrow = this._arrowPool.shift();
    } else {
      arrow = new ArrowView();
    }
    return arrow;
  };
  GameManager.prototype.pushArrow = function(arrow) {
    LGlobal.destroy = false;
    arrow.remove();
    this._arrowPool.push(arrow);
    LGlobal.destroy = true;
  };
  GameManager.prototype.isMulti = function(value) {
    if (typeof value === UNDEFINED) {
      return this._multi;
    }
    this._multi = value;
  };
  return new GameManager();
})();