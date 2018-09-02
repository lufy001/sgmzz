var ShopItemDetailDialogController = (function() {
  function ShopItemDetailDialogController(request) {
    var _this = this;
    _this.model = request.model;
    var properties = {
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: request.width * 0.5,
          y: 30,
          text: 'Get ' + request.model.name,
          size: 30,
          textAlign: 'center'
        }
      },
      iconLayer: {
        type: 'LSprite',
        parent: 'layer',
        properties: {
          x: 110,
          y: 50
        }
      },
      icon: {
        type: 'LBitmap',
        parent: 'iconLayer',
        data: 'translucent',
        properties: {
          x: 20,
          y: 50
        }
      },
      nameLabel: {
        type: 'Label',
        parent: 'iconLayer',
        properties: {
          text: '',
          textAlign: 'center',
          size: 24,
          x: 70,
          y: 10
        }
      },
      amountLabel: {
        type: 'Label',
        parent: 'iconLayer',
        properties: {
          text: request.model.coin || request.model.gem || '',
          textAlign: 'center',
          size: 28,
          x: 70,
          y: 40
        }
      },
      button: {
        type: 'CommonButton',
        onClick: '_onClick',
        label: _this.model.price_gem || _this.model.price_coin,
        params: { img: 'btn03', icon: _this.model.price_gem ? 'icon_gem' : 'icon_coin', iconWidth: 34, iconHeight: 34, offsetY: -2 },
        parent: 'iconLayer',
        properties: {
          text: '',
          size: 28,
          x: -10,
          y: 152
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  ShopItemDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.model = request.model;
    _this.icon.bitmapData = new LBitmapData(dataList.shopIcon[_this.model.icon].icon);
  };
  ShopItemDetailDialogController.prototype._onClick = function() {
    var _this = this;
    ShopService.instance().buy(_this.model.id)
      .then(function(response) {
        _this.remove();
      });
  };
  return ShopItemDetailDialogController;
})();