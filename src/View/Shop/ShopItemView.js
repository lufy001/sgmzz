var ShopItemView = (function() {
  function ShopItemView(model) {
    var _this = this;
    _this.model = model;
    var properties = {
      background: {
        type: 'LPanel',
        data: 'frame07',
        width: 140,
        height: 200,
        properties: {
        }
      },
      icon: {
        type: 'LBitmap',
        data: 'translucent',
        properties: {
          x: 20,
          y: 50
        }
      },
      nameLabel: {
        type: 'Label',
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
        properties: {
          text: _this.model.coin || _this.model.gem || '',
          textAlign: 'center',
          size: 28,
          x: 70,
          y: 40
        }
      },
      priceIcon: {
        type: 'LBitmap',
        data: 'translucent',
        properties: {
          x: 10,
          y: 150,
          scaleX: 0.6,
          scaleY: 0.6
        }
      },
      priceLabel: {
        type: 'Label',
        properties: {
          text: '',
          size: 28,
          x: 45,
          y: 152
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  ShopItemView.prototype.init = function() {
    var _this = this;
    _this.addEventListener(LMouseEvent.MOUSE_DOWN, _this._onDown, _this);
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onUp, _this);
    if (_this.model.icon) {
      _this.load(_this.model.icon, 'icons/' + _this.model.icon);
    } else if (_this.model.box_id > 0) {
      var boxModel = BoxManager.getMasterModel(_this.model.box_id);
      _this.load('shop_box_' + _this.model.box_id, 'boxs/' + boxModel.img() + '/1-0');
    }
    _this._initPrice();
    _this._initName();
  };
  ShopItemView.prototype._initName = function() {
    var _this = this;
    if (_this.model.box_id > 0) {
      var boxModel = BoxManager.getMasterModel(_this.model.box_id);
      _this.nameLabel.text = boxModel.name();
    } else {
      _this.nameLabel.text = _this.model.name || '';
    }
  };
  ShopItemView.prototype._initPrice = function() {
    var _this = this;
    var data = '';
    if (_this.model.price) {
      data = 'icon_dollar';
      _this.priceLabel.text = _this.model.price;
    } else if (_this.model.price_gem) {
      data = 'icon_gem';
      _this.priceLabel.text = _this.model.price_gem;
    } else if (_this.model.price_coin) {
      data = 'icon_coin';
      _this.priceLabel.text = _this.model.price_coin;
    }
    _this.priceIcon.bitmapData = new LBitmapData(dataList[data]);
  };
  ShopItemView.prototype._initIcon = function(data) {
    this.icon.bitmapData = new LBitmapData(data['icon']);
  };
  ShopItemView.prototype.load = function(icon, path) {
    var _this = this;
    dataList.shopIcon = dataList.shopIcon || {};
    if (dataList.shopIcon[icon]) {
      _this._initIcon(dataList.shopIcon[icon]);
      return;
    }
    var imgs = [
      { name: 'icon', path: 'resources/images/' + path + '.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.shopIcon[icon] = data;
      _this._initIcon(data);
    });
  };
  ShopItemView.prototype._onDown = function(event) {
    this._x = event.offsetX;
    this._y = event.offsetY;
  };
  ShopItemView.prototype._onUp = function(event) {
    var _this = this;
    if (Math.abs(_this._x - event.offsetX) > 5 || Math.abs(_this._y - event.offsetY) > 5) {
      return;
    }
    if (_this.model.price > 0) {
      _this._purchaseAsync();
    } else if (_this.model.box_id > 0) {
      _this._confirmBox();
    } else {
      _this._confirmItem();
    }
  };
  ShopItemView.prototype._confirmBox = function() {
    var _this = this;
    var boxModel = BoxManager.getMasterModel(_this.model.box_id);
    var params = { width: 360, height: 300, shopModel: _this.model, boxModel: boxModel, hideClose: true };
    var dialog = new ShopBoxDetailDialogController(params);
    dialogLayer.addChild(dialog);
  };
  ShopItemView.prototype._confirmItem = function() {
    var _this = this;
    var params = { width: 360, height: 300, model: _this.model, hideClose: true };
    var dialog = new ShopItemDetailDialogController(params);
    dialogLayer.addChild(dialog);
  };
  ShopItemView.prototype._purchaseAsync = function() {
    var _this = this;
    //TODO:
    console.log('');
  };
  return ShopItemView;
})();