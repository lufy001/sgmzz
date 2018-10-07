var BoxIconView = (function() {
  function BoxIconView(model) {
    var _this = this;
    var properties = {
      bitmap: {
        type: 'LBitmap',
        data: null
      },
      labelLevel: {
        type: 'Label',
        properties: {
          x: 50,
          y: 80,
          text: '',
          size: 20,
          textAlign: 'center'
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.boxModel = model;
    _this.load();
  }
  BoxIconView.prototype.load = function() {
    var _this = this;
    if (!_this.boxModel) {
      return;
    }
    dataList.box = dataList.box || {};
    if (dataList.box[_this.boxModel.img()]) {
      _this.init(dataList.box[_this.boxModel.img()]);
      return;
    }
    var imgs = [
      { name: '1-0', path: 'resources/images/boxs/' + _this.boxModel.img() + '/1-0.png' },
      { name: '1-1', path: 'resources/images/boxs/' + _this.boxModel.img() + '/1-1.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.box[_this.boxModel.img()] = data;
      _this.init(data);
    });
  };
  BoxIconView.prototype.init = function(data) {
    var _this = this;
    _this._showIcon(data);
  };
  BoxIconView.prototype.updateView = function(model) {
    var _this = this;
    _this.boxModel = model;
    _this.load();
  };
  BoxIconView.prototype.open = function() {
    var _this = this;
    _this.bitmap.bitmapData = new LBitmapData(_this.data['1-1']);
  };
  BoxIconView.prototype._showIcon = function(data) {
    var _this = this;
    _this.data = data;
    _this.labelLevel.text = 'lv.' + _this.boxModel.level();
    var bitmapData = new LBitmapData(data['1-0']);
    _this.bitmap.bitmapData = bitmapData;
    _this.bitmap.scaleX = _this.bitmap.scaleY = 100 / bitmapData.getWidth();
    _this.dispatchEvent(LEvent.COMPLETE);
  };
  return BoxIconView;
})();