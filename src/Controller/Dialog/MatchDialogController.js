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
    var playerId = LPlatform.player().getID();
    console.error('MasterClient.isConnected()', MasterClient.isConnected());
    if (!MasterClient.isConnected()) {
      _this._isInLobby = false;
      MasterClient.addEventListener(GameEvent.JOINED_LOBBY, _this._onJoinedLobby, _this);
      MasterClient.start(playerId, {});
    } else {
      _this._isInLobby = true;
    }

    GameService.instance().matchStart()
      .then(function() {
        return _this._getTarget();
      });
  };
  MatchDialogController.prototype._onJoinedLobby = function() {
    var _this = this;
    console.error('_onJoinedLobby');
    MasterClient.removeEventListener(GameEvent.JOINED_LOBBY, _this._onJoinedLobby, _this);
    _this._isInLobby = true;
    _this._getTarget();
  };
  MatchDialogController.prototype._getTarget = function() {
    var _this = this;
    console.error('_getTarget');
    if (!_this._isInLobby) {
      return Promise.resolve();
    }
    return Common.delay(2000)
      .then(function() {
        return GameService.instance().getMatchTarget();
      })
      .then(function(response) {
        if (response.matchId) {
          _this._connectRoom(response);
        } else if (!_this._canceled) {
          return _this._getTarget();
        } else {
          _this._onClose();
        }
      });
  };
  MatchDialogController.prototype._joinRoom = function(e) {
    var _this = this;
    MasterClient.removeEventListener(GameEvent.ROOM_IN, _this._joinRoom, _this);
    var event = new LEvent('close');
    event.success = true;
    event.matchId = _this._matchId;
    _this.dispatchEvent(event);
    _this._onClose();
  };
  MatchDialogController.prototype._connectRoom = function(response) {
    var _this = this;
    var player = MasterClient.player();
    var data = {};
    _this.title.text = 'Connecting room';
    _this._matchId = response.matchId;
    MasterClient.addEventListener(GameEvent.ROOM_IN, _this._joinRoom, _this);
    var roomName = 'BattleRoom_' + response.matchId;
    var teamJson = PlayerManager.playerModel.teamToJson();
    console.error('response.startTime ', response.startTime);
    data.startTime = response.startTime || 0;
    data.team = teamJson;
    data.level = PlayerManager.playerModel.level();
    data.isLeader = response.isLeader;
    data.battleRoom = roomName;
    player.setData(data);
    if (response.isLeader) {
      MasterClient.createRoom(roomName);
    } else {
      Common.delay(1000).then(function() {
        MasterClient.joinRoom(roomName);
      });
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
        player.setData(null);
        MasterClient.disconnect();
        var event = new LEvent('close');
        event.success = false;
        _this.dispatchEvent(event);
        _this._onClose();
      });
  };
    
  return MatchDialogController;
})();