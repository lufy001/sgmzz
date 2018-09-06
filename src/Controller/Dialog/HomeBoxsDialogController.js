var HomeBoxsDialogController = (function() {
  function HomeBoxsDialogController(request) {
    var _this = this;
    LExtends(_this, DialogController, [request]);
  }
  HomeBoxsDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this._boxLayer = new LSprite();
    _this._boxLayer.x = 10;
    _this._boxLayer.y = 30;
    _this.layer.addChild(_this._boxLayer);
    _this.updateView();
    CommonEvent.addEventListener(CommonEvent.OPEN_BOX, _this._boxOpened, _this);
    CommonEvent.addEventListener(CommonEvent.BOXS_UPDATE, _this.updateView, _this);
  };
  HomeBoxsDialogController.prototype._boxOpened = function(event) {
    var _this = this;
    _this.updateView();
    var params = { width: LGlobal.width, height: LGlobal.height, model: event.model, hideClose: true, contents: event.contents };
    var dialog = new ContentsGetDialogController(params);
    dialogLayer.addChild(dialog);
  };
  HomeBoxsDialogController.prototype.updateView = function(event) {
    var _this = this;
    _this._boxLayer.removeAllChild();
    PlayerManager.playerModel.boxs().forEach(function(box) {
      _this._addBox(box);
    });
  };
  HomeBoxsDialogController.prototype._addEmpty = function() {
    var _this = this;
    var enemyLayer = new LPanel(new LBitmapData(dataList['frame05']), 100, 100);
    enemyLayer.x = _this._boxLayer.numChildren * 115;
    var label = Common.getStrokeLabel({ text: 'Chest Slot', size: 16 });
    label.x = (100 - label.getWidth()) * 0.5;
    label.y = 20;
    enemyLayer.addChild(label);
    _this._boxLayer.addChild(enemyLayer);
  };
  HomeBoxsDialogController.prototype._addBox = function(box) {
    var _this = this;
    if (!box || box.boxId() === 0) {
      _this._addEmpty();
      return;
    }
    var boxView = new HomeBoxView(box);
    boxView.x = _this._boxLayer.numChildren * 115;
    _this._boxLayer.addChild(boxView);
    boxView.addEventListener(LMouseEvent.MOUSE_UP, _this._onClickBox, _this);
  };
  HomeBoxsDialogController.prototype._onClickBox = function(event) {
    var _this = this;
    var unlocking = PlayerManager.playerModel.boxs().find(function(box) {
      return box.status() === 'unlock' && box.time() > 0;
    });
    var boxView = event.currentTarget;
    var params = { width: 360, height: 300, model: boxView.boxModel, hideClose: true, toUnlock: !unlocking };
    var dialog = new BoxDetailDialogController(params);
    dialogLayer.addChild(dialog);
  };
  return HomeBoxsDialogController;
})();