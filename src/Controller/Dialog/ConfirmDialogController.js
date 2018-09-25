var ConfirmDialogController = (function() {
  function ConfirmDialogController(request) {
    var _this = this;
    request.hideClose = true;
    var properties = {
      message: {
        type: 'Label',
        parent: 'layer',
        properties: {
          y: 60,
          text: request.message
        }
      },
      buttonYes: {
        type: 'CommonButton',
        parent: 'layer',
        onClick: '_yesClick',
        label: 'yes',
        properties: {
          x: request.width * 0.5 - 110,
          y: request.height - 60
        }
      },
      buttonNo: {
        type: 'CommonButton',
        parent: 'layer',
        onClick: '_noClick',
        label: 'no',
        properties: {
          x: request.width * 0.5 + 10,
          y: request.height - 60
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
    _this._okEvent = request.okEvent;
    _this._cancelEvent = request.cancelEvent;
  }
  ConfirmDialogController.prototype.onLoad = function(request) {
    var _this = this;
    if (_this.message.getWidth() > request.width - 40) {
      _this.message.x = 20;
      _this.message.setWordWrap(true, 30);
    } else {
      _this.message.x = (request.width - _this.message.getWidth()) * 0.5;
    }
  };
  ConfirmDialogController.prototype._yesClick = function(event) {
    var _this = this;
    var callback = _this._okEvent;
    _this.remove();
    if (callback) {
      callback();
    }
  };
  ConfirmDialogController.prototype._noClick = function(event) {
    var _this = this;
    var callback = _this._cancelEvent;
    _this.remove();
    if (callback) {
      callback();
    }
  };
  return ConfirmDialogController;
})();