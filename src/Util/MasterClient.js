var GameEvent = {
  ROOM_IN: 'roomIn', //进入战斗房间
  GAME_INIT: 'gameInit', //双方准备OK
  BOUT_WIN: 'boutWin', //回合胜利
  BOUT_FAIL: 'boutFail', //回合失败
  SEND_ICON: 'sendIcon', //发送表情
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
    event.enemyPlayer = this.enemy;
    this.dispatchEvent(event);
  };
  MasterClient.prototype.onEvent = function(code, content, actorNr) {
    if (this.client.myActor().getId() !== content.id) {
      this.synchronisedTime(content.now);
    }
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
    }
  };
  MasterClient.prototype.isLeader = function() {
    return this.client.myActor().isLeader();
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
  MasterClient.prototype.sendMessage = function(eventCode, data, options) {
    this.client.raiseEventAll(eventCode, data, options);
  };
  MasterClient.prototype.start = function(id, name, data) {
    this.client.start(id, name, data);
  };
  MasterClient.prototype.attack = function(event) {
    this.sendMessage(ClientEvent.ATTACK, { 'id': this.client.myActor().getId(), params: event.params });
  };
  
  var masterClient = new MasterClient();
  var client = new window.PhotonClient(masterClient);
  masterClient.client = client;
  return masterClient;
})();