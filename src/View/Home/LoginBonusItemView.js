var LoginBonusItemView = (function() {
  function LoginBonusItemView(model) {
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
      icon: {
        type: 'LBitmap',
        data: 'translucent',
        properties: {
          x: 5,
          y: 10
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
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  LoginBonusItemView.prototype.init = function() {
    var _this = this;
    switch (_this.model.type) {
      case 'coin':
        _this.load('shop_coin', 'icons/shop_coin');
        break;
      case 'card':
        //_this.load('icon_card', 'icons/icon_card');
        break;
      case 'gem':
        _this.load('icon_gem', 'icons/icon_gem');
        break;
      case 'box':
        var boxModel = BoxManager.getMasterModel(_this.model.val);
        _this.load('shop_box_' + _this.model.id, 'boxs/' + boxModel.img() + '/1-0');
        break;
    }
  };
  LoginBonusItemView.prototype._initIcon = function(data) {
    this.icon.bitmapData = new LBitmapData(data['icon']);
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