var CardChildView = (function() {
  function CardChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    _this.init();
  }
  CardChildView.prototype.init = function() {
    var _this = this;
    var cardView = new CardView(_this.model);
    cardView.addEventListener(LEvent.COMPLETE, _this._loadComplete, _this);
    _this.addChild(cardView);
  };
  CardChildView.prototype._loadComplete = function(event) {
    var _this = this;
    _this.cacheAsBitmap(false);
    _this.updateView();
  };
  CardChildView.prototype.onClick = function(event) {
    var _this = this;
    if (!_this.model.id) {
      return;
    }
    var listView = event.currentTarget;
    var e = new LEvent(CommonEvent.CARD_CLICK);
    e.model = _this.model;
    e.x = event.offsetX;
    e.y = event.offsetY;
    e.x = listView.x + _this.ll_basePoint.x;
    e.y = listView.y + _this.ll_basePoint.y + 120;
    CommonEvent.dispatchEvent(e);
  };
  return CardChildView;
})();