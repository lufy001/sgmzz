var HomeController = (function() {
  function HomeController(request) {
    var _this = this;
    var properties = {
      playerView: {
        type: 'HomePlayerView',
        properties: {
          x: 40,
          y: 40
        }
      },
      cupView: {
        type: 'HomeCupView',
        properties: {
          x: 40,
          y: 100
        }
      },
      btnRanking: {
        type: 'LButton',
        state: 'icon_ranking',
        onClick: '_openRanking',
        properties: {
          x: 310,
          y: 100
        }
      },
      btnNews: {
        type: 'LButton',
        state: 'icon_news',
        onClick: '_openNews',
        properties: {
          x: 375,
          y: 100
        }
      },
      btnSingleAttack: {
        type: 'CommonButton',
        label: 'Story',
        params: { img: 'btn_single_attack', size: 28, offsetX: 10, offsetY: -5 },
        onClick: '_gotoChapterMap',
        properties: {
          x: LGlobal.width * 0.5 - dataList['btn_single_attack'].width,
          y: (LGlobal.height - dataList['btn_single_attack'].height) * 0.5
        }
      },
      btnMultiAttack: {
        type: 'CommonButton',
        label: 'Battle',
        params: { img: 'btn_multi_attack', size: 28, offsetX: 10, offsetY: -5 },
        onClick: '_gotoGame',
        properties: {
          x: LGlobal.width * 0.5,
          y: (LGlobal.height - dataList['btn_multi_attack'].height) * 0.5
        }
      },
      boxLayer: {
        type: 'LSprite',
        properties: {
          x: LGlobal.width - 100,
          y: LGlobal.height - 220
        }
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    _this.init();
  }
  HomeController.prototype.onLoad = function(request) {
    var _this = this;
    if (request.multiCheck) {
      _this._checkContinueBattle();
    } else {
      _this._checkLoginBonus();
    }
  };
  HomeController.prototype._checkContinueBattle = function() {
    var _this = this;
    GameService.instance().getMatchTarget()
      .then(function(response) {
        if (response.matchId) {
          MasterClient.addEventListener(GameEvent.JOINED_LOBBY, _this._onJoinedLobby, _this);
          var playerId = LPlatform.player().getID();
          MasterClient.start(playerId, response);
        } else {
          _this._checkLoginBonus();
        }
      });
  };
  HomeController.prototype._onFailJoinRoom = function(event) {
    var _this = this;
    MasterClient.removeEventListener(GameEvent.JOINED_LOBBY, _this._onFailJoinRoom, _this);
    _this._checkLoginBonus();
  };
  HomeController.prototype._onJoinedLobby = function(event) {
    var _this = this;
    MasterClient.removeEventListener(GameEvent.JOINED_LOBBY, _this._onJoinedLobby, _this);
    MasterClient.addEventListener(GameEvent.JOINED_LOBBY, _this._onFailJoinRoom, _this);
    _this._connectRoom();
  };
  HomeController.prototype._joinRoom = function(e) {
    var _this = this;
    MasterClient.removeEventListener(GameEvent.ROOM_IN, _this._joinRoom, _this);
    if (MasterClient.myRoomActorCount() === 1) {
      MasterClient.disconnect();
      GameService.instance().matchCancel(true)
        .then(function() {
          _this._onFailJoinRoom();
        });
      return;
    }
    var player = MasterClient.player();
    var response = player.getData();
    _this._matchOver({ success: true, matchId: response.matchId });
  };
  HomeController.prototype._matchOver = function(event) {
    if (event.success) {
      Common.changeScene('GameController', { battleType: 'multi', matchId: event.matchId });
    }
  };
  HomeController.prototype._connectRoom = function() {
    var _this = this;
    var player = MasterClient.player();
    var response = player.getData();
    var data = {};
    var roomName = 'BattleRoom_' + response.matchId;
    MasterClient.addEventListener(GameEvent.ROOM_IN, _this._joinRoom, _this);
    if (response.startTime) {
      response.startTime = parseInt(response.startTime);
    }
    data.startTime = response.startTime || 0;
    data.team = PlayerManager.playerModel.teamToJson();
    data.level = PlayerManager.playerModel.level();
    data.isLeader = response.isLeader;
    data.battleRoom = roomName;
    player.setData(data);
    
    MasterClient.joinRoom(roomName);
  };
  HomeController.prototype._checkLoginBonus = function() {
    if (!PlayerManager.playerModel.loginBonusCalled()) {
      var dialog = new LoginBonusDialogController({ width: 440, height: 500, hideClose: true });
      dialogLayer.addChild(dialog);
    }
  };
  HomeController.prototype.init = function() {
    var _this = this;
    _this.cupView.updateView();

    _this._boxUpdateView();
        
    CommonEvent.addEventListener(CommonEvent.OPEN_BOX, _this._boxOpened, _this);
    CommonEvent.addEventListener(CommonEvent.PLAYER_UPDATE, _this._playerUpdate, _this);
  };
  HomeController.prototype._openRanking = function(event) {
    var dialog = new RankingDialogController({ width: 440, height: 500 });
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._openNews = function(event) {
    var dialog = new NewsDialogController({ width: 400, height: 500 });
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._boxOpened = function(event) {
    var _this = this;
    _this._playerUpdate();
    var params = { width: LGlobal.width, height: LGlobal.height, model: event.model, hideClose: true, contents: event.contents };
    var dialog = new ContentsGetDialogController(params);
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._playerUpdate = function(event) {
    var _this = this;
    _this.cupView.updateView();
    _this.playerView.updateView();
    _this._boxUpdateView();
    headerView.updateView();
  };
  HomeController.prototype._gotoChapterMap = function(event) {
    Common.changeScene('ChapterMapController');
  };
  HomeController.prototype._gotoGame = function(event) {
    var _this = this;
    if (window.setting.isLocal) {
      return;
    }
    var dialog = new MatchDialogController({ width: 400, height: 210, hideClose: true });
    dialog.addEventListener('close', _this._matchOver, _this);
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._openBoxs = function(event) {
    var _this = this;
    var dialog = new HomeBoxsDialogController({ width: 460, height: 180, hideClose: true });
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._boxUpdateView = function(event) {
    var _this = this;
    _this.boxLayer.removeAllChild();

    var boxs = [];
    PlayerManager.playerModel.boxs().forEach(function(box) {
      if (box && box.boxId() > 0) {
        boxs.push(box);
      }
    });
    if (boxs.length === 0) {
      return;
    } else if (boxs.length > 1) {
      boxs.sort(function(a, b) {
        if (a.status() !== b.status()) {
          return a.status() === 'lock' ? 1 : -1;
        }
        return a.time() - b.time();
      });
    }
    var boxView = new HomeBoxView(boxs[0]);
    _this.boxLayer.addChild(boxView);
    boxView.addEventListener(LMouseEvent.MOUSE_UP, _this._openBoxs, _this);
  };
  return HomeController;
})();