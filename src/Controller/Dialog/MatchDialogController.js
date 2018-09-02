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
    _this.init();
  }
  MatchDialogController.prototype.init = function() {
    var _this = this;
    var maskBackground = _this.getChildByName('maskBackground');
    maskBackground.removeEventListener(LMouseEvent.MOUSE_UP, _this._onClose, _this);
  };
  MatchDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this._tween = LTweenLite.to(_this.icon, 2, { loop: true, 
      coordinate: [ { x: 180, y: 50 }, { x: 180, y: 70 }, { x: 150, y: 70 }, { x: 150, y: 50 }] });
    _this._canceled = false;
    _this._toCancel = false;
    
    GameService.instance().matchStart()
      .then(function() {
        return _this._getTarget();
      });
  };
  MatchDialogController.prototype._getTarget = function() {
    var _this = this;
    return Common.delay(2000)
      .then(function() {
        return GameService.instance().getMatchTarget();
      })
      .then(function(response) {
        if (response.targetId) {
          _this._connectRoom(response.targetId);
        } else if (!_this._canceled) {
          return _this._getTarget();
        } else {
          _this._onClose();
        }
      });
  };
  MatchDialogController.prototype._connectRoom = function(targetId) {
    var _this = this;
    _this.title.text = 'Connecting room';
    MasterClient.addEventListener(GameEvent.ROOM_IN, function() {
      var event = new LEvent('close');
      event.success = true;
      _this.dispatchEvent(event);
      _this._onClose();
    });
    var playerId = LPlatform.player().getID();
    var teamJson = PlayerManager.playerModel.teamToJson();
    var player = MasterClient.player();
    player.setCustomProperty('team', teamJson);
    player.setCustomProperty('level', PlayerManager.playerModel.level());
    if (playerId > targetId) {
      Common.delay(1000).then(function() {
        player.setCustomProperty('battleRoom', targetId + '_' + playerId);
        player.setCustomProperty('isLeader', 0);
        MasterClient.joinRoom(targetId + '_' + playerId);
      });
    } else {
      player.setCustomProperty('battleRoom', playerId + '_' + targetId);
      player.setCustomProperty('isLeader', 1);
      MasterClient.createRoom(playerId + '_' + targetId);
    }
  };
  MatchDialogController.prototype.onClose = function() {
    LTweenLite.remove(this._tween);
  };
  MatchDialogController.prototype._onCancel = function() {
    var _this = this;
    if (_this._toCancel) {
      return;
    }
    _this._toCancel = true;
    GameService.instance().matchCancel()
      .then(function() {
        _this._canceled = true;
        var player = MasterClient.player();
        player.setCustomProperty('team', null);
        player.setCustomProperty('battleRoom', null);
      });
  };
    
  return MatchDialogController;
})();