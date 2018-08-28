var GameEvent = {
  ROOM_IN: 'photon:roomIn', //进入战斗房间
  GAME_INIT: 'photon:gameInit', //双方准备OK
  JOINED_LOBBY: 'photon:joinedLobby', //回合胜利
  ATTACK: 'photon:attack', //攻击
};
var ClientEvent = {
  READY: 1, //单方战斗画面准备OK
  ATTACK: 2, //攻击
  GAME_OVER: 3, //游戏结束
  SEND_ICON: 4, //发送表情
};
var MasterClient = (function() {
  function MasterClient() {
    var _this = this;
    LExtends(_this, LEventDispatcher, []);
  }
  MasterClient.prototype.gameStart = function(id) {
    var event = new LEvent(GameEvent.ROOM_IN);
    event.enemyPlayer = this.enemy();
    this.dispatchEvent(event);
  };
  MasterClient.prototype.onEvent = function(code, content, actorNr) {
    var event;
    switch (code) {
      case ClientEvent.READY:
        if (this.client.myActor().getId() !== content.id) {
          this.client.myActor().setCustomProperty('ready', true);
        }
        if (this.player.getCustomProperty('ready') && this.enemy.getCustomProperty('ready')) {
          this.dispatchEvent(GameEvent.GAME_INIT);
        }
        break;
      case ClientEvent.ATTACK:
        if (this.client.myActor().getId() !== content.id) {
          break;
        }
        this._onAttack(content.params);
        break;
    }
  };
  MasterClient.prototype._onAttack = function(params) {
    var e = new LEvent(CommonEvent.ARROW_ATTACK);
    params.belong = CharacterBelong.OPPONENT;
    e.params = params;
    CommonEvent.dispatchEvent(e);
  };
  MasterClient.prototype.createRoom = function(roomName) {
    return this.client.createPhotonClientRoom(roomName);
  };
  MasterClient.prototype.joinRoom = function(roomName) {
    return this.client.joinRoom(roomName);
  };
  MasterClient.prototype.isLeader = function() {
    return this.client.myActor().isLeader();
  };
  MasterClient.prototype.enemy = function() {
    //TODO:local
    /*if (window.setting.isLocal) {
      return {
        getCustomProperty: function() {
          var team = UserService.instance().playerModel.team();
          var res = [];
          team.forEach(function(model) {
            res.push({ id: model.id(), level: model.level() });
          });
          return res;
        }
      };
    }*/
    return this.client.myRoomActorsArray()[1];
  };
  MasterClient.prototype.player = function() {
    return this.client.myRoomActorsArray()[0];
  };
  MasterClient.prototype.enemyId = function() {
    return this.enemy().getId();
  };
  MasterClient.prototype.playerId = function() {
    return this.player().getId();
  };
  MasterClient.prototype.leaveRoom = function() {
    this.client.leaveRoom();
  };
  MasterClient.prototype.onJoinedLobby = function() {
    this.dispatchEvent(GameEvent.JOINED_LOBBY);
  };
  MasterClient.prototype.sendMessage = function(eventCode, data, options) {
    this.client.raiseEventAll(eventCode, data, options);
  };
  MasterClient.prototype.isConnected = function() {
    return this.client.isConnectedToMaster() || this.client.isConnectedToGame();
  };
  MasterClient.prototype.start = function(id, data) {
    this.client.start(id, data);
  };
  MasterClient.prototype.matching = function() {
    this.client.createPhotonClientRoom();
  };
  MasterClient.prototype.attack = function(event) {
    this.sendMessage(ClientEvent.ATTACK, { 'id': this.client.myActor().getId(), params: event.params });
  };
  var masterClient = new MasterClient();
  var client = new window.PhotonClient(masterClient);
  masterClient.client = client;
  return masterClient;
})();