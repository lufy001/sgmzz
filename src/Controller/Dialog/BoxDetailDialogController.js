var BoxDetailDialogController = (function() {
  function BoxDetailDialogController(request) {
    var _this = this;
    var coin = request.model.coin();
    var properties = {
      boxView: {
        type: 'BoxIconView',
        parent: 'layer',
        params: request.model,
        properties: {
          x: 130,
          y: -50
        }
      },
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: request.width * 0.5,
          y: 50,
          text: request.model.name(),
          size: 30,
          textAlign: 'center'
        }
      },
      coinBackground: {
        type: 'LPanel',
        parent: 'layer',
        data: 'frame04',
        width: request.width - 20,
        height: 60,
        properties: {
          x: 10,
          y: 100
        }
      },
      coinIcon: {
        type: 'LBitmap',
        parent: 'layer',
        data: 'icon_coin',
        properties: {
          x: 20,
          y: 105
        }
      },
      coinLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 80,
          y: 115,
          text: coin[0] + '~' + coin[1],
          size: 24
        }
      },
      cardLayer: {
        type: 'LSprite',
        parent: 'layer',
        properties: {
          x: 20,
          y: 180
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  BoxDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.model = request.model;
    _this._addCards(request);
    _this._addTime(request);
    _this._addButton(request);
  };
  BoxDetailDialogController.prototype._addButton = function(request) {
    var _this = this, button;
    if (request.toUnlock && _this.model.status() === 'lock') {
      button = Common.getButton('unlock', { img: 'btn03', offsetY: -2 });
      button.x = request.width * 0.5 + (request.width * 0.5 - button.getWidth()) * 0.5;
    } else if (_this.model.time() === 0 && _this.model.status() === 'unlock') {
      button = Common.getButton('open', { img: 'btn03', offsetY: -2 });
      button.x = (request.width - button.getWidth()) * 0.5;
    } else {
      var coin = 200;
      button = Common.getButton(coin, { img: 'btn03', icon: 'icon_gold', offsetY: -2 });
      button.x = request.width * 0.5 + (request.width * 0.5 - button.getWidth()) * 0.5;
    }
    button.y = 230;
    _this.layer.addChild(button);
    button.addEventListener(LMouseEvent.MOUSE_UP, _this._openClick, _this);
  };
  BoxDetailDialogController.prototype._open = function() {
    var _this = this;
    UserService.instance().openBox(_this.model.id())
      .then(function(response) {
        var event = new LEvent(CommonEvent.OPEN_BOX);
        event.model = _this.model;
        event.contents = response;
        CommonEvent.dispatchEvent(event);
        _this.remove();
      });
  };
  BoxDetailDialogController.prototype._openClick = function(event) {
    var _this = this;
    if (_this.model.time() === 0 && _this.model.status() === 'unlock') {
      _this._open();
      return;
    }
    var params = { width: 360, height: 300, gold: 200 };
    params.okEvent = function() {
      _this._open();
    };
    params.message = 'open this box?';
      
    var dialog = new ConfirmGoldDialogController(params);
    dialogLayer.addChild(dialog);
  };
  BoxDetailDialogController.prototype._addTime = function(request) {
    var _this = this;
    if (_this.model.time() === 0 && _this.model.status() === 'unlock') {
      return;
    }
    var label;
    if (_this.model.status() === 'unlock') {
      label = new TimeCountDownView(_this.model.time(), true);
      _this.countDown = label;
    } else {
      var time = Common.getFormatTime(_this.model.time() || _this.model.allTime());
      label = Common.getStrokeLabel({ text: time });
      label.textAlign = 'center';
    }
    label.x = 100;
    label.y = 250;
    _this.layer.addChild(label);
  };
  BoxDetailDialogController.prototype._addCards = function(request) {
    var _this = this;
    var cards = _this.model.cards();
    cards.forEach(function(child) {
      _this._addCard(child);
    });
  };
  BoxDetailDialogController.prototype._addCard = function(child) {
    var _this = this;
    var background = new CardBackgroundView();
    background.updateView(child.rarity, false);
    background.scaleX = background.scaleY = 30 / background.getWidth();
    background.x = 80 * (_this.cardLayer.numChildren / 2);
    _this.cardLayer.addChild(background);
    var amountLabel = Common.getStrokeLabel({ text: child.amount });
    amountLabel.x = background.x + 35;
    _this.cardLayer.addChild(amountLabel);
  };
  return BoxDetailDialogController;
})();