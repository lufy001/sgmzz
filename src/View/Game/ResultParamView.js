var ResultParamView = (function() {
  function ResultParamView(params) {
    var _this = this;
    var properties = {
      icon: {
        type: 'LBitmap',
        data: params.icon,
        properties: {
          x: -dataList[params.icon].width * 0.5 - 30
        }
      },
      label: {
        type: 'Label',
        properties: {
          text: 10,
          size: 35,
          x: 10,
          y: 10
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
  }
  ResultParamView.prototype.updateView = function(value) {
    var _this = this;
    _this.label.text = 0;
    var obj = { value: 0 };
    LTweenLite.to(obj, 0.5, { value: value, onUpdate: function(event) {
      _this.label.text = event.target.value >> 0;
    }, onComplete: function(event) {
      _this.label.text = event.target.value >> 0;
    } });
    var y = _this.y;
    _this.y = y - 10;
    _this.scaleX = _this.scaleY = 0.01; 
    LTweenLite.to(_this, 0.5, { y: y, scaleX: 1, scaleY: 1, ease: LEasing.Bounce.easeOut });
  };
    
  return ResultParamView;
})();