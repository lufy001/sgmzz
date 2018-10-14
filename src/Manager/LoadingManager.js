var LoadingManager = (function() {
  function LoadingManager() {
    var _this = this;
    _this._loadCounter = 0;
  }
  LoadingManager.prototype.show = function() {
    var _this = this;
    loadingLayer.visible = true;
    _this._loadCounter++;
    _this.init();
  };
  LoadingManager.prototype.hide = function() {
    var _this = this;
    _this._loadCounter--;
    if (_this._loadCounter > 0) {
      return;
    }
    loadingLayer.visible = false;
  };
  LoadingManager.prototype.init = function() {
    var _this = this;
    if (_this._initComplete) {
      return;
    }
    _this._initComplete = true;
    loadingLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function() {});
    loadingLayer.addEventListener(LMouseEvent.MOUSE_UP, function() {});
    loadingLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function() {});
    loadingLayer.addEventListener(LMouseEvent.MOUSE_OVER, function() {});
    loadingLayer.addEventListener(LMouseEvent.MOUSE_OUT, function() {});
  };
    
  return new LoadingManager();
})();