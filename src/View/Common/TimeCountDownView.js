var TimeCountDownView = (function() {
  function TimeCountDownView(time, iconEnable) {
    var _this = this;
    var properties = {
      icon: {
        type: 'LBitmap',
        data: 'icon_time',
        properties: {
          x: -80,
          y: -10
        }
      },
      label: {
        type: 'Label',
        properties: {
          text: '00:00:00',
          textAlign: 'center'
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.updateView(time, iconEnable);
  }
  TimeCountDownView.prototype.updateView = function(time, iconEnable) {
    var _this = this;
    _this._time = time;
    _this.icon.visible = !!iconEnable;
    _this._startTime = Date.now();
    _this.removeEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
    _this.addEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
  };
  TimeCountDownView.prototype._onframe = function(event) {
    var _this = this;
    var now = Date.now();
    var time = _this._time - (now - _this._startTime);
    if (time <= 0) {
      _this.removeEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
      _this.dispatchEvent(LEvent.COMPLETE);
      return;
    }
    _this.label.text = Common.getFormatTime(time * 0.001 >>> 0);
  };
  return TimeCountDownView;
})();