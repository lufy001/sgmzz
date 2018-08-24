var HomeCupView = (function() {
  function HomeCupView() {
    var _this = this;
    var properties = {
      cupLayer: {
        type: 'LPanel',
        data: 'btn_gree_64',
        width: 260,
        height: 64
      },
      bitmapCup: {
        type: 'LBitmap',
        data: 'icon_cup',
        properties: {
          x: 20,
          y: 0
        }
      },
      amountProgress: {
        type: 'ProgressView',
        params: { progress: 0, sum: 5, background: 'amount_bg', foreground: 'amount_front' },
        properties: {
          x: 80,
          y: 20
        }
      },
      boxIcon: {
        type: 'BoxIconView',
        params: BoxManager.getMasterModel(4),
        properties: {
          scaleX: 0.6,
          scaleY: 0.6,
          x: 180,
          y: 0
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
  }
  HomeCupView.prototype.updateView = function(value) {
    var _this = this;
    var params = { progress: value, sum: 5 };
    _this.amountProgress.updateView(params);
        
    _this.boxIcon.addEventListener(LMouseEvent.MOUSE_UP, _this._iconClick, _this);
  };
  HomeCupView.prototype._iconClick = function(event) {
    var _this = this;
    trace('iconClick');
  };
  return HomeCupView;
})();