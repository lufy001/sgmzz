var LoginBonusItemView = (function() {
  function LoginBonusItemView(model, isGet) {
    var _this = this;
    _this.model = model;
    var properties = {
      background: {
        type: 'LPanel',
        data: 'frame07',
        width: 100,
        height: 150,
        properties: {
        }
      },
      card:{
        type: 'CardBackgroundView',
        properties: {
          x: 15,
          y: 20,
          scaleX: 0.7,
          scaleY: 0.7,
          visible: false
        }
      },
      icon: {
        type: 'LBitmap',
        data: 'translucent',
        properties: {
          x: 5,
          y: 10,
          visible: false
        }
      },
      label: {
        type: 'Label',
        properties: {
          text: '',
          textAlign: 'center',
          size: 16,
          x: 50,
          y: 110
        }
      },
      getIcon: {
        type: 'LBitmap',
        data: 'icon_ok',
        properties: {
          x: 18,
          y: 40,
          scaleX: 2,
          scaleY: 2,
          visible: isGet
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  LoginBonusItemView.prototype.init = function() {
    var _this = this;
    _this.label.text = 'x' + _this.model.val;
    switch (_this.model.type) {
      case 'coin':
        _this.load('shop_coin', 'icons/shop_coin');
        break;
      case 'card':
        _this.card.updateView(_this.model.rarity);
        _this.card.visible = true;
        break;
      case 'gem':
        _this.load('icon_gem', 'icons/icon_gem');
        break;
      case 'box':
        var boxModel = BoxManager.getMasterModel(_this.model.val);
        _this.label.text = boxModel.name();
        _this.load('shop_box_' + _this.model.id, 'boxs/' + boxModel.img() + '/1-0');
        break;
    }
  };
  LoginBonusItemView.prototype._initIcon = function(data) {
    var _this = this;
    _this.icon.visible = true;
    _this.icon.bitmapData = new LBitmapData(data['icon']);
  };
  LoginBonusItemView.prototype.load = function(icon, path) {
    var _this = this;
    dataList.loginbonusIcon = dataList.loginbonusIcon || {};
    if (dataList.loginbonusIcon[icon]) {
      _this._initIcon(dataList.loginbonusIcon[icon]);
      return;
    }
    var imgs = [
      { name: 'icon', path: 'resources/images/' + path + '.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.loginbonusIcon[icon] = data;
      _this._initIcon(data);
    });
  };
  return LoginBonusItemView;
})();
