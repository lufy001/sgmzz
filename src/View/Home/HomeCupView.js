var HomeCupView = (function() {
  function HomeCupView() {
    var _this = this;
    var properties = {
      cupGreyLayer: {
        type: 'LPanel',
        data: 'btn_gray_64',
        width: 260,
        height: 64
      },
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
        params: { progress: 0, sum: WIN_TIMES_MULTI_MAX, background: 'amount_bg', foreground: 'amount_front' },
        properties: {
          x: 80,
          y: 20
        }
      },
      boxIcon: {
        type: 'BoxIconView',
        params: new BoxModel({ boxId: MULTI_BOX_ID, lv: PlayerManager.playerModel.level() }),
        properties: {
          scaleX: 0.6,
          scaleY: 0.6,
          x: 180,
          y: 0,
          visible: !PlayerManager.playerModel.winBoxOver()
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this._init();
    _this.boxIcon.labelLevel.visible = false;
  }
  HomeCupView.prototype._init = function() {
    var _this = this;
    _this.boxIcon.addEventListener(LMouseEvent.MOUSE_UP, _this._iconClick, _this);
  };
  HomeCupView.prototype.updateView = function() {
    var _this = this;
    var value = PlayerManager.playerModel.winTimesMulti();
    value = value > WIN_TIMES_MULTI_MAX ? WIN_TIMES_MULTI_MAX : value;
    var params = { progress: value, sum: WIN_TIMES_MULTI_MAX };
    _this.cupGreyLayer.visible = value < WIN_TIMES_MULTI_MAX || PlayerManager.playerModel.winBoxOver();
    _this.cupLayer.visible = !_this.cupGreyLayer.visible;
    _this.amountProgress.updateView(params);
  };
  HomeCupView.prototype._iconClick = function(event) {
    var _this = this;
    if (PlayerManager.playerModel.winTimesMulti() < WIN_TIMES_MULTI_MAX 
    && !PlayerManager.playerModel.winBoxOver()) {
      return;
    }
    UserService.instance().openMultiBox()
      .then(function(response) {
        _this.cupGreyLayer.visible = true;
        _this.cupLayer.visible = false;
        _this.boxIcon.visible = false;
        PlayerManager.playerModel = response.playerModel();
        var event = new LEvent(CommonEvent.OPEN_BOX);
        event.model = _this.model;
        event.contents = response.contents();
        CommonEvent.dispatchEvent(event);
      });
  };
  return HomeCupView;
})();