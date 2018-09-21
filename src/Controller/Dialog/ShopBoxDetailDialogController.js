var ShopBoxDetailDialogController = (function() {
  function ShopBoxDetailDialogController(request) {
    var _this = this;
    var coin = request.boxModel.coin();
    var gem = request.boxModel.gem();
    var properties = {
      boxView: {
        type: 'BoxIconView',
        parent: 'layer',
        params: request.boxModel,
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
          text: request.boxModel.name(),
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
      gemIcon: {
        type: 'LBitmap',
        parent: 'layer',
        data: 'icon_gem',
        properties: {
          x: 210,
          y: 105
        }
      },
      gemLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 270,
          y: 115,
          text: gem[0] + '~' + gem[1],
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
  ShopBoxDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.shopModel = request.shopModel;
    _this.boxModel = request.boxModel;
    _this._addCards(request);
    _this._addButton(request);
  };
  ShopBoxDetailDialogController.prototype._addButton = function(request) {
    var _this = this, button;
    button = Common.getButton(_this.shopModel.price_gem, 
      { img: 'btn03', icon: 'icon_gem', iconWidth: 34, iconHeight: 34, offsetY: -2 });
    button.x = (request.width - button.getWidth()) * 0.5;
    button.y = 230;
    _this.layer.addChild(button);
    button.addEventListener(LMouseEvent.MOUSE_UP, _this._openClick, _this);
  };
  ShopBoxDetailDialogController.prototype._open = function() {
    var _this = this;
    ShopService.instance().buy(_this.shopModel.id)
      .then(function(response) {
        _this._showContents(response);
        _this.remove();
      });
  };
  ShopBoxDetailDialogController.prototype._showContents = function(response) {
    var _this = this;
    PlayerManager.playerModel = response.playerModel();
    var params = { width: LGlobal.width, height: LGlobal.height, 
      model: _this.boxModel, hideClose: true, contents: response.contents() };
    var dialog = new ContentsGetDialogController(params);
    dialogLayer.addChild(dialog);
  };
  ShopBoxDetailDialogController.prototype._openClick = function(event) {
    var _this = this;
    if (_this.shopModel.price_gem <= PlayerManager.playerModel.gem()) {
      _this._open();
      return;
    }
    var params = { width: 360, height: 200, hideClose: true };
    params.message = 'no gem.';
    var dialog = new AlertDialogController(params);
    dialogLayer.addChild(dialog);
    _this.remove();
  };
  ShopBoxDetailDialogController.prototype._addCards = function(request) {
    var _this = this;
    var cards = _this.boxModel.cards();
    cards.forEach(function(child) {
      _this._addCard(child);
    });
  };
  ShopBoxDetailDialogController.prototype._addCard = function(child) {
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
  return ShopBoxDetailDialogController;
})();