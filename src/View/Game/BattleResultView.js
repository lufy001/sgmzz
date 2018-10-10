var BattleResultView = (function() {
  function BattleResultView() {
    var _this = this;
    var properties = {
      winLabel: {
        type: 'Label',
        properties: {
          textAlign: 'center',
          text: 'Game Win',
          color: '#FFFF00',
          weight: 'bolder',
          size: 50,
          x: LGlobal.width * 0.5,
          y: 50
        }
      },
      lossLabel: {
        type: 'Label',
        properties: {
          textAlign: 'center',
          text: 'Game Loss',
          color: '#CCCCCC',
          weight: 'bolder',
          size: 50,
          x: LGlobal.width * 0.5,
          y: 50
        }
      },
      tieLabel: {
        type: 'Label',
        properties: {
          textAlign: 'center',
          text: 'Game Tie',
          color: '#CCCCCC',
          weight: 'bolder',
          size: 50,
          x: LGlobal.width * 0.5,
          y: 50
        }
      },
      cupParamView: {
        type: 'ResultParamView',
        params: { icon: 'icon_cup' },
        properties: {
          x: LGlobal.width * 0.5,
          y: 150
        }
      },
      gemParamView: {
        type: 'ResultParamView',
        params: { icon: 'icon_gem' },
        properties: {
          x: LGlobal.width * 0.5,
          y: 210
        }
      },
      coinParamView: {
        type: 'ResultParamView',
        params: { icon: 'icon_coin' },
        properties: {
          x: LGlobal.width * 0.5,
          y: 270
        }
      },
      boxView: {
        type: 'BoxIconView',
        properties: {
          x: LGlobal.width * 0.5 - 50,
          y: 330
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  BattleResultView.prototype.reset = function(params) {
    var _this = this;
    _this.tieLabel.visible = !!params.isTie;
    _this.winLabel.visible = !params.isTie && params.isWin;
    _this.lossLabel.visible = !params.isTie && !params.isWin;
    _this.cupParamView.visible = false;
    _this.gemParamView.visible = false;
    _this.coinParamView.visible = false;
    _this.boxView.visible = false;
  };
  BattleResultView.prototype.updateView = function(params) {
    var _this = this;
    _this.reset(params);
    if (params.isTie) {
      var player = MasterClient.player();
      var data = player.getData();
      if (data.isLeader || MasterClient.myRoomActorCount() === 1) {
        GameService.instance().matchCancel(true);
      }
      _this._addEvent();
      return;
    }
    if (!params.isWin) {
      if (GameManager.isMulti()) {
        var currentCup = PlayerManager.playerModel.cup();
        var cup = Common.countCup(GameManager.enemyModel.cup() - currentCup);
        currentCup -= cup;
        PlayerManager.playerModel.cup(currentCup < 0 ? 0 : currentCup);
        var response = new BattleResultResponse({ cup: -cup });
        _this._showResult(response);
      }
      _this._addEvent();
      return;
    }
    if (GameManager.isMulti()) {
      GameService.instance().sendMultiResult(GameManager.matchId)
        .then(function(response) {
          _this._showResult(response);
        });
    } else {
      GameService.instance().sendSingleResult(params.stageId)
        .then(function(response) {
          _this._showResult(response);
        });
    }
  };
  BattleResultView.prototype._showResult = function(params) {
    var _this = this;
    var playerModel = params.playerModel();
    if (playerModel) {
      PlayerManager.playerModel = playerModel;
    }
    CommonEvent.dispatchEvent(CommonEvent.PLAYER_UPDATE);
    var y = 150;
    var height = 60;
    var promise = Promise.resolve();
    if (params.cup()) {
      _this.cupParamView.y = y;
      y += height;
      promise = promise.then(function() {
        _this.cupParamView.visible = true;
        _this.cupParamView.updateView(params.cup());
        return Common.delay(500);
      });
    }
    if (params.gem()) {
      _this.gemParamView.y = y;
      y += height;
      promise = promise.then(function() {
        _this.gemParamView.visible = true;
        _this.gemParamView.updateView(params.gem());
        return Common.delay(500);
      });
    }
    if (params.coin()) {
      _this.coinParamView.y = y;
      y += height;
      promise = promise.then(function() {
        _this.coinParamView.visible = true;
        _this.coinParamView.updateView(params.coin());
        return Common.delay(500);
      });
    }
    if (params.boxId()) {
      var boxModel = new BoxModel({ boxId: params.boxId(), lv: params.boxLv() });
      promise = promise.then(function() {
        _this.boxView.visible = true;
        _this.boxView.y = 0;
        _this.boxView.scaleX = 0.01;
        _this.boxView.scaleY = 0.01;
        _this.boxView.updateView(boxModel);
        LTweenLite.to(_this.boxView, 0.5, { y: y, scaleX: 1, scaleY: 1, ease: LEasing.Bounce.easeOut });
        return Common.delay(500);
      });
    }
    if (!params.isWin) {
      promise = promise.then(function() {
        return Common.delay(500);
      });
    }
    promise.then(function() {
      _this._addEvent();
    });
  };
  BattleResultView.prototype.init = function() {
    var _this = this;
    var maskBackground = Common.getTranslucentMask();
    _this.addChildAt(maskBackground, 0);
  };
  BattleResultView.prototype._addEvent = function() {
    var _this = this;
    MasterClient.disconnect();
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
  };
  BattleResultView.prototype._onClick = function(event) {
    var _this = this;
    _this.removeEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
    _this.visible = false;
    if (GameManager.isMulti()) {
      Common.changeScene('HomeController', { });
    } else {
      Common.changeScene('ChapterMapController', { });
    }
    
  };
    
  return BattleResultView;
})();