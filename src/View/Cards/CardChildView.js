var CardChildView = (function() {
  function CardChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    //_this.init();
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
    if (!_this.model.id) {
      return;
    }
    var disableMask = Common.getTranslucentBitmap(100, 118);
    disableMask.name = 'mask';
    disableMask.visible = !model;
    _this.addChild(disableMask);
  };
  CardChildView.prototype.updateView = function(bitmap, rectangle, point) {
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
  CardChildView.prototype.updateModel = function() {
    var _this = this;
    if (!_this.model.id || _this.numChildren === 0) {
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
    if (!_this.model.id) {
      return;
    }/* else if (!PlayerManager.playerModel.getCharacter(_this.model.id())) {
    	CommonEvent.dispatchEvent(CommonEvent.CARD_DETAIL_CLICK);
      return;
    }*/
    var noCard = !PlayerManager.playerModel.getCharacter(_this.model.id());
    var listView = event.currentTarget;
    var e = new LEvent(noCard ? CommonEvent.CARD_DETAIL_CLICK : CommonEvent.CARD_CLICK);
    e.model = _this.model;
    e.x = event.offsetX;
    e.y = event.offsetY;
    e.x = listView.x + _this.ll_basePoint.x;
    e.y = listView.y + _this.ll_basePoint.y + 120;
    CommonEvent.dispatchEvent(e);
  };
  return CardChildView;
})();