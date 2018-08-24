var DialogController = (function() {
  function DialogController(request, properties) {
    var _this = this;
    LExtends(_this, AutoDisplayObject, []);
    _this.__init(request);

    _this._properties = properties;
    _this._initProperties();

    _this.onLoad(request);
  }
  DialogController.prototype.__init = function(request) {
    var _this = this;
    var maskBackground = Common.getTranslucentMask();
    _this.addChild(maskBackground);
    _this.layer = new LSprite();
    var bitmapData = new LBitmapData(dataList['frame01']);
    var background = new LPanel(bitmapData, request.width, request.height);
    _this.layer.addChild(background);
    _this.layer.x = (LGlobal.width - request.width) * 0.5;
    _this.layer.y = (LGlobal.height - request.height) * 0.5;
    _this.addChild(_this.layer);
    if (request.hideClose) {
      background.addEventListener(LMouseEvent.MOUSE_UP, function() {}, _this);
      maskBackground.addEventListener(LMouseEvent.MOUSE_UP, _this._onClose, _this);
      return;
    }
    var closeBtn = Common.getButton('✖︎', { img: 'btn06', size: 26, offsetY: 0 });
    closeBtn.x = _this.layer.x + request.width - closeBtn.getWidth() - 5;
    closeBtn.y = _this.layer.y + 5;
    _this.addChild(closeBtn);
    closeBtn.addEventListener(LMouseEvent.MOUSE_UP, _this._onClose, _this);
  };
  DialogController.prototype._onClose = function(event) {
    this.remove();
  };
  DialogController.prototype.onLoad = function(request) {
  };
  return DialogController;
})();