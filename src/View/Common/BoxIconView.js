var BoxIconView = (function() {
  function BoxIconView(model) {
    var _this = this;
    LExtends(_this, LSprite, []);
    _this.boxModel = model;
    _this.load();
  }
  BoxIconView.prototype.load = function() {
    var _this = this;
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
  BoxIconView.prototype.open = function() {
    var _this = this;
    _this.bitmap.bitmapData = new LBitmapData(_this.data['1-1']);
  };
  BoxIconView.prototype._showIcon = function(data) {
    var _this = this;
    _this.data = data;
    var bitmapData = new LBitmapData(data['1-0']);
    var bitmap = new LBitmap(bitmapData);
    bitmap.scaleX = bitmap.scaleY = 100 / bitmap.getWidth();
    _this.bitmap = bitmap;
    _this.addChild(new LButton(bitmap));
  };
  return BoxIconView;
})();