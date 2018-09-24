var CardChildView = (function() {
  function CardChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    _this.init();
  }
  CardChildView.prototype.init = function() {
    var _this = this;
    var model;
    if (_this.model.id) {
      model = PlayerManager.playerModel.getCharacter(_this.model.id());
    }
    var cardView = new CardView(model ? model : _this.model);
    cardView.name = 'cardView';
    cardView.addEventListener(LEvent.COMPLETE, _this._loadComplete, _this);
    _this.addChild(cardView);
    var disableMask = Common.getTranslucentBitmap(100, 118);
    disableMask.name = 'mask';
    disableMask.visible = !model;
    _this.addChild(disableMask);
  };
  CardChildView.prototype.updateModel = function() {
    var _this = this;
    if (!_this.model.id) {
      return;
    }
    var model;
    if (_this.model.id) {
      model = PlayerManager.playerModel.getCharacter(_this.model.id());
    }
    _this.getChildByName('cardView').updateView(model ? model : _this.model);
    _this.getChildByName('mask').visible = !model;
  };
  CardChildView.prototype._loadComplete = function(event) {
    var _this = this;
    _this.cacheAsBitmap(false);
    _this.updateView();
  };
  CardChildView.prototype.onClick = function(event) {
    var _this = this;
    if (!_this.model.id || !PlayerManager.playerModel.getCharacter(_this.model.id())) {
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