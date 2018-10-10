var GLOBAL_ROOM_NAME = 'GlobalRoom (SGMZZ Game)';
var AppInfo = {
  //	Wss: true,
  AppId: window.setting.photonAppId,
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
var PhotonClient = (function(_super) {
  __photon_extends(PhotonClient, _super);
  function PhotonClient(masterClient) {
    var _this = _super.call(this, window.setting.wss ? window.Photon.ConnectionProtocol.Wss : window.Photon.ConnectionProtocol.Ws, AppInfo.AppId, AppInfo.AppVersion) || this;
    _this.logger = new window.Exitgames.Common.Logger('PhotonClient:', window.Exitgames.Common.Logger.Level.DEBUG);
    
    _this.masterClient = masterClient;
    _this.logger.info('Init', AppInfo.AppId, AppInfo.AppVersion);
    _this.setLogLevel(window.Exitgames.Common.Logger.Level.DEBUG);
    return _this;
  }
  PhotonClient.prototype.raiseEventAll = function(eventCode, data, options) {
    options = options || {};
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
    if (!name) {
      console.error('createPhotonClientRoom: roomName not found!');
      return;
    }
    this.myRoom().setEmptyRoomLiveTime(10000);
    this.createRoomFromMy(name);
  };
  PhotonClient.prototype.start = function(id, data) {
    var self = this;
    self.myActor().setInfo(id, data);
    self.connectToRegionMaster('EU');
  };
  PhotonClient.prototype.onError = function(errorCode, errorMsg) {
    console.error('onError', errorCode, errorMsg);
    // optional super call
    _super.prototype.onError.call(this, errorCode, errorMsg);
  };
  PhotonClient.prototype.onOperationResponse = function(errorCode, errorMsg, code, content) {
    if (!errorCode) {
      return;
    }
    var Constants = window.Photon.LoadBalancing.Constants;
    var roomName;
    switch (code) {
      case Constants.OperationCode.CreateGame:
        if (errorCode === Constants.ErrorCode.GameIdAlreadyExists) {
          roomName = this.myActor().getBattleRoom();
          if (roomName) {
            this.joinRoom(roomName);
            break;
          }
        }
        this.leaveRoom();
        console.error('CreateGame:', errorCode, errorMsg, code, content);
        break;
      case Constants.OperationCode.JoinGame:
        if (errorCode === Constants.ErrorCode.GameDoesNotExist) {
          var self = this;
          roomName = self.myActor().getBattleRoom();
          if (roomName) {
            setTimeout(function() {
              self.createPhotonClientRoom(roomName);
            }, 1000);
            break;
          }
        }
        this.leaveRoom();
        console.error('JoinGame:', errorCode, errorMsg, code, content);
        break;
      default:
        console.error('onOperationResponse:', errorCode, errorMsg, code, content);
        break;
    }
  };
  PhotonClient.prototype.onEvent = function(code, content, actorNr) {
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
  PhotonClient.prototype.onJoinRoom = function(createdByMe) {
    if (this.masterClient && this.masterClient.onJoinRoom) {
      this.masterClient.onJoinRoom(createdByMe);
    }
  };
  PhotonClient.prototype.onActorJoin = function(actor) {
    //console.warn('onActorJoin', actor, this.myRoom().name, this.myRoomActorsArray().length);
    if (this.masterClient && this.masterClient.onActorJoin) {
      this.masterClient.onActorJoin(actor);
    }
  };
  PhotonClient.prototype.onActorLeave = function(actor) {
    //console.warn('onActorLeave', actor);
    if (this.masterClient && this.masterClient.onActorLeave) {
      this.masterClient.onActorLeave(actor);
    }
  };
  PhotonClient.prototype.onPlayerPropertiesChange = function(changedCustomProps) {
    //console.warn('PhotonClient.prototype.onPlayerPropertiesChange');
    if (this.masterClient && this.masterClient.onPlayerPropertiesChange) {
      this.masterClient.onPlayerPropertiesChange(changedCustomProps);
    }
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
  PhotonPlayer.prototype.getId = function() {
    return this.getCustomProperty('userId');
  };
  PhotonPlayer.prototype.getBattleRoom = function() {
    return this.getData().battleRoom;
  };
  PhotonPlayer.prototype.getData = function() {
    return this.getCustomProperty('data');
  };
  PhotonPlayer.prototype.setData = function(data) {
    this.setCustomProperty('data', data);
  };
  PhotonPlayer.prototype.onPropertiesChange = function(changedCustomProps) {
    this.client.onPlayerPropertiesChange(changedCustomProps);
  };
  PhotonPlayer.prototype.setInfo = function(id, data) {
    this.client.setUserId(id);
    this.setCustomProperty('userId', id);
    this.setData(data);
  };
  return PhotonPlayer;
}(window.Photon.LoadBalancing.Actor));
window.PhotonClient = PhotonClient;
window.PhotonPlayer = PhotonPlayer;