var FooterButtonView = (function() {
  function FooterButtonView(name) {
    FooterButtonView.offData = FooterButtonView.offData || new LBitmapData(dataList['btn_gray']);
    FooterButtonView.onData = FooterButtonView.onData || new LBitmapData(dataList['btn_gree']);
    var _this = this;
    _this.layer = new LSprite();
    LExtends(_this, AutoDisplayObject, []);
    LExtends(_this, LButton, [_this.layer]);
    _this.name = name;
    var iconKey = 'icon_' + name.toLowerCase();
    iconKey = dataList[iconKey] ? iconKey : 'icon_shop';
    var iconImg = dataList[iconKey];
    _this._properties = {
      buttonLayer: {
        type: 'LSprite',
        parent: 'layer'
      },
      bitmap: {
        type: 'LBitmap',
        data: 'btn_gray',
        parent: 'buttonLayer'
      },
      icon: {
        type: 'LBitmap',
        data: iconKey,
        parent: 'buttonLayer',
        properties: {
          x: (dataList['btn_gray'].width - iconImg.width) * 0.5,
          y: dataList['btn_gray'].height - iconImg.height - 30
        }
      },
      label: {
        type: 'Label',
        parent: 'buttonLayer',
        properties: {
          text: name,
          textAlign: 'center',
          size: 24,
          x: 50,
          y: 60
        }
      }
    };
    _this._initProperties();
    _this.init();
  }
  FooterButtonView.prototype.init = function(data) {
    var _this = this;
    _this._onScale = 1;
    _this._offScale = 70 / FooterButtonView.onData.getHeight();
    _this.on(false);
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
  };
  FooterButtonView.prototype._onClick = function(event) {
    var _this = this;
    Common.changeScene(_this.name + 'Controller');
  };
  FooterButtonView.prototype.on = function(value) {
    var _this = this;
    _this.buttonLayer.scaleX = _this.buttonLayer.scaleY = value ? _this._onScale : _this._offScale;
    _this.bitmap.bitmapData = value ? FooterButtonView.onData : FooterButtonView.offData;
    _this.y = value ? -26 : 0;
       
    //_this.label.y = 80 - _this.label.getHeight();
  };
  FooterButtonView.prototype.getWidth = function(event) {
    return this.buttonLayer.scaleX < 1 ? 70 : 96;
  };
  return FooterButtonView;
})();