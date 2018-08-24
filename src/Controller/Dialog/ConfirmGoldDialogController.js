var ConfirmGoldDialogController = (function() {
  function ConfirmGoldDialogController(request) {
    var _this = this;
        
    var properties = {
      message: {
        type: 'Label',
        parent: 'layer',
        properties: {
          y: 60,
          text: request.message
        }
      },
      goldLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: request.width * 0.5,
          y: request.height - 100,
          text: request.gold,
          textAlign: 'right'
        }
      },
      icon: {
        type: 'LBitmap',
        parent: 'layer',
        data: 'icon_gold',
        properties: {
          x: request.width * 0.5 + 10,
          y: request.height - 100
        }
      },
      buttonOk: {
        type: 'CommonButton',
        parent: 'layer',
        label: 'ok',
        properties: {
          x: request.width * 0.5 - 50,
          y: request.height - 60
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
    _this._okEvent = request.okEvent;
  }
  ConfirmGoldDialogController.prototype.onLoad = function(request) {
    var _this = this;
    if (_this.message.getWidth() > request.width - 40) {
      _this.message.x = 20;
      _this.message.setWordWrap(true, 30);
    } else {
      _this.message.x = (request.width - _this.message.getWidth()) * 0.5;
    }
    _this.buttonOk.addEventListener(LMouseEvent.MOUSE_UP, _this._okClick, _this);
  };
  ConfirmGoldDialogController.prototype._okClick = function(event) {
    var _this = this;
    var callback = _this._okEvent;
    _this.remove();
    callback();
  };
  return ConfirmGoldDialogController;
})();