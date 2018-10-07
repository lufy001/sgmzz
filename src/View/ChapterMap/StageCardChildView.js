var StageCardChildView = (function() {
  function StageCardChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    _this.init();
  }
  StageCardChildView.prototype.init = function() {
    var _this = this;
    var cardView = new CardView(_this.model);
    //cardView.scaleX = cardView.scaleY = 0.5;
    cardView.name = 'cardView';
    cardView.addEventListener(LEvent.COMPLETE, _this._loadComplete, _this);
    _this.addChild(cardView);
  };
  StageCardChildView.prototype.updateView = function(bitmap, rectangle, point) {
    var _this = this;
    if (_this.numChildren === 0) {
      _this.ll_baseBitmap = bitmap;
      _this.ll_baseRectangle = rectangle;
      _this.ll_basePoint = point;
      _this.init();
    } else {
      _this.callParent('updateView', arguments);
    }
  };
  StageCardChildView.prototype._loadComplete = function(event) {
    var _this = this;
    _this.cacheAsBitmap(false);
    _this.updateView();
  };
  return StageCardChildView;
})();