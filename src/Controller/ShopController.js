var ShopController = (function() {
  function ShopController(request) {
    var _this = this;
    var properties = {
      layer: {
        type: 'LSprite'
      },
      boxLayer: {
        parent: 'layer',
        type: 'LSprite'
      },
      boxShopTitle: {
        parent: 'boxLayer',
        type: 'ShopTitleView',
        params: 'Chests'
      },
      coinLayer: {
        parent: 'layer',
        type: 'LSprite'
      },
      coinShopTitle: {
        parent: 'coinLayer',
        type: 'ShopTitleView',
        params: 'Coins'
      },
      gemLayer: {
        parent: 'layer',
        type: 'LSprite'
      },
      gemShopTitle: {
        parent: 'gemLayer',
        type: 'ShopTitleView',
        params: 'Gems'
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    _this.init();
  }
  ShopController.prototype.init = function() {
    var _this = this;
    _this._addContents();
    var y = 50;
    _this.boxLayer.y = 50;
    y += _this.boxLayer.getHeight() + 20;
    _this.coinLayer.y = y;
    y += _this.coinLayer.getHeight() + 20;
    _this.gemLayer.y = y;
    y += _this.gemLayer.getHeight() - LGlobal.height + 130;
    _this.layer.graphics.drawRect(0, '#000000', [0, 0, LGlobal.width, y + LGlobal.height]);
    _this.layer.addEventListener(LMouseEvent.MOUSE_DOWN, _this._onDown, _this);
    _this.layer.addEventListener(LMouseEvent.MOUSE_UP, _this._onUp, _this);
    _this.layer.dragRange = new LRectangle(0, -y, 0, y);
    if (window.setting.platform === 'fb') {
      _this.gemLayer.visible = false;
    }
  };
  ShopController.prototype._onDown = function(event) {
    event.clickTarget.startDrag(event.touchPointID);
  };
  ShopController.prototype._onUp = function(event) {
    event.clickTarget.stopDrag();
  };
  ShopController.prototype._addContents = function() {
    var _this = this;
    var masters = MasterService.instance().masters;
    var shopMasters = masters.masterShop();
    var purchaseMasters = masters.masterPurchase();
    shopMasters.forEach(function(model) {
      if (model.box_id > 0) {
        _this._addContent(_this.boxLayer, model);
      } else if (model.coin > 0) {
        _this._addContent(_this.coinLayer, model);
      }
    });
    if (window.setting.platform === 'fb') {
      return;
    }
    purchaseMasters.forEach(function(model) {
      _this._addContent(_this.gemLayer, model);
    });
  };
  ShopController.prototype._addContent = function(contentLayer, model) {
    var _this = this;
    var num = contentLayer.numChildren - 1;
    var shopItem = new ShopItemView(model);
    shopItem.x = num % 3 * 150 + 20;
    shopItem.y = (num / 3 >> 0) * 200 + 60;
    contentLayer.addChild(shopItem);
  };
  return ShopController;
})();