var MatchDialogController = (function() {
  function MatchDialogController(request) {
    var _this = this;
    var properties = {
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 200,
          y: 10,
          text: 'Matchmaking',
          size: 30,
          textAlign: 'center'
        }
      },
      icon: {
        type: 'LBitmap',
        data: 'icon_search',
        parent: 'layer',
        properties: {
          x: 150,
          y: 50
        }
      },
      cancelButton: {
        type: 'CommonButton',
        label: 'Cancel',
        parent: 'layer',
        onClick: '_onCancel',
        properties: {
          x: 150,
          y: 150
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  MatchDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this._tween = LTweenLite.to(_this.icon, 2, { loop: true, 
      coordinate: [ { x: 180, y: 50 }, { x: 180, y: 70 }, { x: 150, y: 70 }, { x: 150, y: 50 }] });
  };
  DialogController.prototype.onClose = function() {
    LTweenLite.remove(this._tween);
  };
  DialogController.prototype._onCancel = function() {
    var _this = this;
    //cancel code
    _this._onClose();
  };
    
  return MatchDialogController;
})();