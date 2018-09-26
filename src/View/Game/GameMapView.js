var GameMapView = (function() {
  function GameMapView(params) {
    var _this = this;
    LExtends(_this, LSprite, []);
    if (params) {
      _this.updateView(params.id);
    }
  }
  GameMapView.prototype.updateView = function(id) {
    var _this = this;
    _this.id = id;
    _this.load();
  };
  GameMapView.prototype.init = function(data) {
    var _this = this;
    var bitmapData = new LBitmapData(data['map']);
    var bitmap = new LBitmap(bitmapData);
    bitmap.scaleX = bitmap.scaleY = 2;
    _this.addChild(bitmap);
  };
  GameMapView.prototype.load = function() {
    var _this = this;
    dataList.maps = dataList.maps || {};
    if (dataList.maps[_this.id]) {
      _this.init(dataList.maps[_this.id]);
      return;
    }
    var imgs = [
      { name: 'map', path: 'resources/images/game/map/' + _this.id + '.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.maps[_this.id] = data;
      _this.init(data);
    });
  };
  return GameMapView;
})();