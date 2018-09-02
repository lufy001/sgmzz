var IconStatusView = (function() {
  function IconStatusView(params) {
    var _this = this;
    var properties = {
      background: {
        type: 'LBitmap',
        data: params.background,
        properties: {
        }
      },
      icon: {
        type: 'LBitmap',
        data: params.icon,
        properties: {
          x: dataList[params.background].width,
          y: (dataList[params.background].height - (params.iconSize ? params.iconSize : dataList[params.icon].height)) * 0.5,
          scaleX: params.iconSize ? params.iconSize / dataList[params.icon].width : 1,
          scaleY: params.iconSize ? params.iconSize / dataList[params.icon].height : 1
        }
      },
      label: {
        type: 'Label',
        properties: {
          text: '',
          size: 16,
          textAlign: 'right'
        }
      },
      plusButton: {
        type: 'CommonButton',
        label: '+',
        onClick: '_plusClick',
        params: { img: 'btn06' },
        properties: {
          x: 0,
          y: (dataList[params.background].height - dataList['btn06'].height) * 0.5
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  IconStatusView.prototype.init = function() {
    var _this = this;
    _this.label.x = _this.icon.x - 5;
    _this.label.y = (_this.background.getHeight() - _this.label.getHeight()) * 0.5;
  };
  IconStatusView.prototype.updateView = function(value) {
    var _this = this;
    _this.label.text = value;
  };
  IconStatusView.prototype._plusClick = function(value) {
    var _this = this;
    Common.changeScene('ShopController');
  };
  return IconStatusView;
})();