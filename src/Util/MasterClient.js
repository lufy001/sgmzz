var GameEvent = {
  ROOM_IN: 'photon:roomIn', //进入战斗房间
  GAME_INIT: 'photon:gameInit', //双方准备OK
  JOINED_LOBBY: 'photon:joinedLobby', //
  PLAYER_LEAVE: 'photon:playerLeave'//玩家掉线或退出
};
var ClientEvent = {
  READY: 1, //战斗准备OK
  ATTACK: 2, //攻击
  GAME_OVER: 3, //游戏结束
  SKILL_START: 4, //技能发动

  GAME_START: 101, //
};
var MasterClient = (function() {
  function MasterClient() {
    var _this = this;
    LExtends(_this, LEventDispatcher, []);
  }
  MasterClient.prototype.onEvent = function(code, content, actorNr) {
    console.log('MasterClient :: onEvent', code, content);
    switch (code) {
      case ClientEvent.ATTACK:
        if (this.client.myActor().getId() === content.id) {
          break;
        }
        this._onAttack(content.params);
        break;
      case ClientEvent.SKILL_START:
        if (this.client.myActor().getId() === content.id) {
          break;
        }
        this._onSkillStart(content.params);
        break;
      case ClientEvent.GAME_OVER:
        if (this.client.myActor().getId() === content.id) {
          CommonEvent.dispatchEvent(CommonEvent.RESULT_WIN);
        } else {
          CommonEvent.dispatchEvent(CommonEvent.RESULT_FAIL);
        }
        break;
      case ClientEvent.GAME_START:
        this._gameStart();
        break;
    }
  };
  MasterClient.prototype._gameStart = function(id) {
    var event = new LEvent(GameEvent.ROOM_IN);
    event.enemyPlayer = this.enemy();
    this.dispatchEvent(event);
  };
  MasterClient.prototype._onSkillStart = function(params) {
    var e = new LEvent(CommonEvent.SKILL_START);
    params.belong = CharacterBelong.OPPONENT;
    e.params = params;
    CommonEvent.dispatchEvent(e);
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
  MasterClient.prototype.myRoomActorCount = function() {
    return this.client.myRoomActorCount();
  };
  MasterClient.prototype.enemy = function() {
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
  MasterClient.prototype.disconnect = function() {
    this.client.disconnect();
  };
  MasterClient.prototype.leaveRoom = function() {
    this.client.leaveRoom();
  };
  MasterClient.prototype.onJoinedLobby = function() {
    console.warn('MasterClient.prototype.onJoinedLobby', this._eventList);
    this.dispatchEvent(GameEvent.JOINED_LOBBY);
  };
  MasterClient.prototype.onJoinRoom = function(createdByMe) {
    if (!createdByMe) {
      this.sendMessage(ClientEvent.GAME_START, { });
    }
  };
  MasterClient.prototype.onActorLeave = function(actor) {
    if (actor.getId() === this.playerId()) {
      return;
    }
    this.dispatchEvent(GameEvent.PLAYER_LEAVE);
  };
  MasterClient.prototype.sendMessage = function(eventCode, data, options) {
    data.id = this.client.myActor().getId();
    this.client.raiseEventAll(eventCode, data, options);
  };
  MasterClient.prototype.isConnected = function() {
    return this.client.isConnectedToMaster() || this.client.isConnectedToGame();
  };
  MasterClient.prototype.startTime = function() {
    var _this = this;
    var playerData = _this.player().getData();
    var time = playerData.startTime;
    if (time) {
      return time;
    }
    var enemyData = _this.enemy().getData();
    time = enemyData.startTime;
    if (time) {
      playerData.startTime = time;
      _this.player().setData(playerData);
      return time;
    }
    return 0;
  };
  MasterClient.prototype.start = function(id, data) {
    this.client.start(id, data);
  };
  MasterClient.prototype.matching = function() {
    this.client.createPhotonClientRoom();
  };
  MasterClient.prototype.skillStart = function(event) {
    this.sendMessage(ClientEvent.SKILL_START, { params: event.params });
  };
  MasterClient.prototype.attack = function(event) {
    this.sendMessage(ClientEvent.ATTACK, { params: event.params });
  };
  MasterClient.prototype.gameOver = function() {
    this.sendMessage(ClientEvent.GAME_OVER, { });
  };
  var masterClient = new MasterClient();
  var client = new window.PhotonClient(masterClient);
  masterClient.client = client;
  return masterClient;
})();