var LoginBonusDialogController = (function() {
  function LoginBonusDialogController(request) {
    var _this = this;
    var properties = {
      titleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: 'Login Bonus',
          size: 26,
          textAlign: 'center',
          x: request.width * 0.5,
          y: 10
        }
      },
      itemLayer: {
        type: 'LSprite',
        parent: 'layer',
        properties: {
          x: 10,
          y: 80
        }
      },
      getButton: {
        type: 'CommonButton',
        params: { img: 'btn03' },
        label: 'GET',
        parent: 'layer',
        onClick: '_getBonus',
        properties: {
          x: 140,
          y: 410
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  LoginBonusDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this._itemInit();
    _this.getChildByName('maskBackground').removeEventListener(LMouseEvent.MOUSE_UP, _this._onClose, _this);
  };
  LoginBonusDialogController.prototype._getBonus = function() {
    var _this = this;
    _this.remove();
  };
  LoginBonusDialogController.prototype._itemInit = function() {
    var _this = this;
    var masters = MasterService.instance().masters;
    var loginbonus = masters.masterLoginbonus();
    for (var i = 0; i < loginbonus.length; i++) {
      var child = new LoginBonusItemView(loginbonus[i]);
      var rowIndex = i / 4 >> 0;
      var colIndex = i % 4;
      var startX = rowIndex === 0 ? 0 : 55;
      var startY = rowIndex === 0 ? 0 : 165;
      child.x = startX + colIndex * 105;
      child.y = startY;
      _this.itemLayer.addChild(child);
    }
  };
  return LoginBonusDialogController;
})();