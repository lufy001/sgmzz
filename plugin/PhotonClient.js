var GLOBAL_ROOM_NAME = 'GlobalRoom (SGMZZ Game)';
var AppInfo = {
  //	Wss: true,
  AppId: '6915e697-bc86-4518-9e90-ac2b5ad7800c',
  AppVersion: '1.0',
  //    FbAppId: "you fb app id", 
};
var __photon_extends = this && this.__extends || (function() {
  var extendStatics = Object.setPrototypeOf ||
        { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var PhotonEvent = {
  BUILD: 101,
  GAME_START: 102
};
var PhotonClient = (function(_super) {
  __photon_extends(PhotonClient, _super);
  function PhotonClient(masterClient) {
    var _this = _super.call(this, window.Photon.ConnectionProtocol.Ws, AppInfo.AppId, AppInfo.AppVersion) || this;
    _this.logger = new window.Exitgames.Common.Logger('PhotonClient:', window.Exitgames.Common.Logger.Level.DEBUG);
    console.warn('Init', AppInfo.AppId, AppInfo.AppVersion);
    _this.masterClient = masterClient;
    _this.logger.info('Init', AppInfo.AppId, AppInfo.AppVersion);
    _this.setLogLevel(window.Exitgames.Common.Logger.Level.DEBUG);
    return _this;
  }
  PhotonClient.prototype.raiseEventAll = function(eventCode, data, options) {
    options = options || {};
    //console.error('raiseEventAll', eventCode, data, options);
    options.receivers = window.Photon.LoadBalancing.Constants.ReceiverGroup.All;
    this.raiseEvent(eventCode, data, options);
  };
  PhotonClient.prototype.roomFactory = function(name) {
    return new PhotonRoom(this, name);
  };
  PhotonClient.prototype.actorFactory = function(name, actorNr, isLocal) {
    return new PhotonPlayer(this, name, actorNr, isLocal);
  };
  PhotonClient.prototype.myRoom = function() {
    return _super.prototype.myRoom.call(this);
  };
  PhotonClient.prototype.myActor = function() {
    return _super.prototype.myActor.call(this);
  };
  PhotonClient.prototype.myRoomActors = function() {
    return _super.prototype.myRoomActors.call(this);
  };
  PhotonClient.prototype.createPhotonClientRoom = function(name) {
    console.error('createPhotonClientRoom New Game');
    this.myRoom().setEmptyRoomLiveTime(10000);
    this.createRoomFromMy(name || GLOBAL_ROOM_NAME);
  };
  PhotonClient.prototype.start = function(id, name, data) {
    var self = this;
    self.myActor().setInfo(id, name, data);
    //self.myActor().setCustomProperty('auth', { enemys: enemys });
    self.connectToRegionMaster('EU');
  };
  PhotonClient.prototype.onError = function(errorCode, errorMsg) {
    console.warn('onError', errorCode, errorMsg);
    // optional super call
    _super.prototype.onError.call(this, errorCode, errorMsg);
  };
  PhotonClient.prototype.onOperationResponse = function(errorCode, errorMsg, code, content) {
    console.warn('onOperationResponse', errorCode, errorMsg, code, content);
    if (errorCode) {
      switch (code) {
        case window.Photon.LoadBalancing.Constants.OperationCode.JoinRandomGame:
          switch (errorCode) {
            case window.Photon.LoadBalancing.Constants.ErrorCode.NoRandomMatchFound:
              console.warn('Join Random:', errorMsg);
              this.createPhotonClientRoom();
              break;
            default:
              console.warn('Join Random:', errorMsg);
              break;
          }
          break;
        case window.Photon.LoadBalancing.Constants.OperationCode.CreateGame:
          if (errorCode !== 0) {
            if (this.myActor().getBattleRoom()) {
              this.joinRoom(this.myActor().getBattleRoom());
            } else {
              this.joinRoom(GLOBAL_ROOM_NAME);
              //return;
            }
            //this.disconnect();
          }
          break;
        case window.Photon.LoadBalancing.Constants.OperationCode.JoinGame:
          if (errorCode !== 0) {
            console.warn('JoinGame:', errorMsg);
            var self = this;
            if (this.myActor().getBattleRoom()) {
              setTimeout(function() {
                self.joinRoom(self.myActor().getBattleRoom());
              }, 200);
            } else {
              this.joinRoom(GLOBAL_ROOM_NAME);
              //return;
            }
            //this.disconnect();
          }
          break;
        default:
          console.warn('Operation Response error:', errorCode, errorMsg, code, content);
          break;
      }
    }

  };
  PhotonClient.prototype.onEvent = function(code, content, actorNr) {
    //console.warn('----------onEvent', code, content, actorNr);
    switch (code) {
      case PhotonEvent.BUILD:
        if (this.myActor().getId() === content.id) {
          this.myActor().setCustomProperty('target', content.target);
          this.myActor().setCustomProperty('battleRoom', content.battleRoom);
          this.leaveRoom();
        }
        break;
      case PhotonEvent.GAME_START:
        if (this.timeFlag) {
          clearTimeout(this.timeFlag);
          this.timeFlag = null;
        }
        console.error('------------battle start----------');
        if (this.masterClient && this.masterClient.gameStart) {
          this.masterClient.gameStart();
        }
        break;
      default:
        break;
    }
    if (this.masterClient && this.masterClient.onEvent) {
      this.masterClient.onEvent(code, content, actorNr);
    }
  };
  PhotonClient.prototype.onStateChange = function(state) {
    //this.masterClient.onStateChange(state);
    // "namespace" import for static members shorter acceess
    var LBC = window.Photon.LoadBalancing.LoadBalancingClient;
    console.warn('onStateChange', state, LBC.State.JoinedLobby);
    switch (state) {
      case LBC.State.JoinedLobby:
        this.onJoinedLobby();
        /*
        if (this.myActor().getTarget()) {
          if (this.myActor().isLeader()) {
            this.joinRoom(this.myActor().getBattleRoom());
          } else {
            this.createPhotonClientRoom(this.myActor().getBattleRoom());
          }
        } else {
          //console.warn(`this.joinRoom(${GLOBAL_ROOM_NAME});`);
          //this.joinRandomRoom();
          this.joinRoom(GLOBAL_ROOM_NAME);
        }*/
        break;
      default:
        break;
    }
  };
  PhotonClient.prototype.onJoinedLobby = function() {
    if (this.masterClient && this.masterClient.onJoinedLobby) {
      this.masterClient.onJoinedLobby();
    }
  };
  PhotonClient.prototype._findMinNrActor = function() {
    var actorsArray = this.myRoomActorsArray();
    var acotr = actorsArray[0];
    for (var i = 1; i < actorsArray.length; i++) {
      var currentActor = actorsArray[i];
      if (acotr.getId() > currentActor.getId()) {
        acotr = currentActor;
      }
    }
    return acotr;
  };
  PhotonClient.prototype._findEnemyActors = function() {
    var actorsArray = this.myRoomActorsArray();
    var arr = [];
    for (var i = 0; i < actorsArray.length; i++) {
      var currentActor = actorsArray[i];
      if (currentActor.getTarget() > 0) {
        continue;
      }
      arr.push(currentActor);
    }
    arr = arr.sort(function(a, b) {
      return b.getCup() - a.getCup();
    });
    return arr;
  };
  PhotonClient.prototype.searchBattleTarget = function() {
    if (this.myRoomActorCount() < 2) {
      return;
    }
    /*var minActor = this._findMinNrActor();
    if (this.myActor().getId() !== minActor.getId() || this.myActor().isLeader()) {
      return;
    }*/
    var actors = this._findEnemyActors();
    if (this.myActor().getId() !== actors[0].getId() || this.myActor().isLeader()) {
      return;
    }
    var length = actors.length;
    var findTarget = false;
    for (var i = 0; i < length - 1; i++) {
      var child1 = actors[i];
      var child2 = actors[i + 1];
      if (child1.getCup() - child2.getCup() < 200) {
        child1.setCustomProperty('target', child2.getId());
        child2.setCustomProperty('target', child1.getId());
        i++;
        findTarget = true;
      }
    }
    if (findTarget) {
      this.raiseEventAll(PhotonEvent.BUILD, {});
    }
    /*
    this.myActor().setCustomProperty('leader', true);
    this.myActor().setCustomProperty('target', actorsArray[1].getId());
    var battleRoom = this.myActor().getId() + '_' + actorsArray[0].getId();
    this.myActor().setCustomProperty('battleRoom', battleRoom);
    this.raiseEventAll(PhotonEvent.BUILD, { 'target': actorsArray[0].getId(), 'id': actorsArray[1].getId(), 'battleRoom': battleRoom });
    */
  };
  PhotonClient.prototype.onJoinRoom = function() {
    //console.error('onJoinRoom myRoom', this.myRoom().name, this.myRoomActorsArray());
    if (this.myRoom().name !== GLOBAL_ROOM_NAME) {
      if (this.myRoomActorsArray().length === 2) {
        this.raiseEventAll(PhotonEvent.GAME_START, { });
      } else {
        var self = this;
        this.timeFlag = setTimeout(function() {
          self.leaveRoom();
        }, 10000);
      }
    }
    /*
        console.warn('onJoinRoom myActor', this.myActor());
        console.warn('onJoinRoom myRoomActors', this.myRoomActors());
        this.logger.info('onJoinRoom myRoom', this.myRoom());
        this.logger.info('onJoinRoom myActor', this.myActor());
        this.logger.info('onJoinRoom myRoomActors', this.myRoomActors());
        this.raiseEventAll(111, { 'name': this.myActor().getName() });*/
  };
  PhotonClient.prototype.onActorJoin = function(actor) {
    console.warn('onActorJoin', actor, this.myRoom().name, this.myRoomActorsArray().length);
    if (this.myRoom().name === GLOBAL_ROOM_NAME) {
      this.searchBattleTarget();
    }
  };
  PhotonClient.prototype.onActorLeave = function(actor) {
    console.warn('onActorLeave', actor);
    if (actor.isLeader()) {
      this.searchBattleTarget();
    } else if (actor.getId() === this.myActor().getTarget() && this.myActor().isLeader()) {
      this.leaveRoom();
    }
  };
  PhotonClient.prototype.updatePlayerOnlineList = function() {
    console.warn('PhotonClient.prototype.updatePlayerOnlineList');
    /*for (var i in this.myRoomActors()) {
            var a = this.myRoomActors()[i];
            console.warn('actor(' + i + '):', a);
            this.logger.info('actor:', a.getName(), a.getTime());
        }*/
  };
  return PhotonClient;
})(window.Photon.LoadBalancing.LoadBalancingClient);

var PhotonRoom = (function(_super) {
  __photon_extends(PhotonRoom, _super);
  function PhotonRoom(client, name) {
    var _this = _super.call(this, name) || this;
    _this.client = client;
        
    return _this;
  }
  PhotonRoom.prototype.onPropertiesChange = function(changedCustomProps, byClient) {
    console.warn('PhotonRoom.prototype.onPropertiesChange', changedCustomProps, byClient);
  };
  return PhotonRoom;
}(window.Photon.LoadBalancing.Room));

var PhotonPlayer = (function(_super) {
  __photon_extends(PhotonPlayer, _super);
  function PhotonPlayer(client, name, actorNr, isLocal) {
    var _this = _super.call(this, name, actorNr, isLocal) || this;
    _this.client = client;
    return _this;
  }
  PhotonPlayer.prototype.isLeader = function() {
    return this.getCustomProperty('leader');
  };
  PhotonPlayer.prototype.getId = function() {
    return this.getCustomProperty('id');
  };
  PhotonPlayer.prototype.getName = function() {
    return this.getCustomProperty('name');
  };
  PhotonPlayer.prototype.getCup = function() {
    return this.getCustomProperty('cup');
  };
  PhotonPlayer.prototype.getTarget = function() {
    return this.getCustomProperty('target');
  };
  PhotonPlayer.prototype.getBattleRoom = function() {
    return this.getCustomProperty('battleRoom');
  };
  PhotonPlayer.prototype.getTime = function() {
    return this.getCustomProperty('time');
  };
  PhotonPlayer.prototype.getData = function() {
    return this.getCustomProperty('data');
  };
  PhotonPlayer.prototype.onPropertiesChange = function(changedCustomProps) {
    if (this.isLocal) {
      document.title = this.getName() + ' / ' + this.getId() + ' Pairs Game (Master Client)';
    }
    this.client.updatePlayerOnlineList();
  };
  PhotonPlayer.prototype.init = function() {
    this.setCustomProperty('target', null);
    this.setCustomProperty('leader', false);
    this.setCustomProperty('time', Date.now());
  };
  PhotonPlayer.prototype.setInfo = function(id, name, data) {
    this.client.setUserId(id);
    this.setCustomProperty('id', id);
    this.setCustomProperty('name', name);
    this.setCustomProperty('data', data);
    this.init();
  };
  return PhotonPlayer;
}(window.Photon.LoadBalancing.Actor));
window.PhotonClient = PhotonClient;
window.PhotonPlayer = PhotonPlayer;