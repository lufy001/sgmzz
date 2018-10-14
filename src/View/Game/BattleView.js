var BattleView = (function() {
  function BattleView() {
    var _this = this;
    _this._width = 640;
    _this._height = 960;
    var properties = {
      gameMap: {
        type: 'GameMapView'
      },
      stepLabel: {
        type: 'Label',
        properties: {
          textAlign: 'right',
          text: '0/0',
          size: 30,
          x: 630,
          y: 435
        }
      },
      timeLabel: {
        type: 'Label',
        properties: {
          textAlign: 'right',
          text: '2:00',
          size: 30,
          x: 600,
          y: 10
        }
      },
      gameTeam: {
        type: 'GameTeamView',
        properties: {
          startX: -150,
          endX: 0,
          clearX: 700,
          x: 0,
          y: 120
        }
      },
      enemyTeam: {
        type: 'EnemyTeamView',
        properties: {
          x: 480,
          y: 300
        }
      },
      opponentTeam: {
        type: 'OpponentTeamView',
        properties: {
          startX: 530,
          endX: 480,
          x: 480,
          y: 120
        }
      },
      board: {
        type: 'ArrowBoardView',
        properties: {
          x: 0,
          y: 460
        }
      },
      skillCtrlView: {
        type: 'SkillCtrlView',
        properties: {
          x: 10,
          y: 756
        }
      },
      ctrlView: {
        type: 'CtrlView',
        properties: {
          x: 300,
          y: 756
        }
      },
      footerButton: {
        type: 'LButton',
        onClick: '_showMenu',
        state: 'icon_game_menu',
        properties: {
          y: 890
        }
      },
      footerMenu: {
        type: 'GameMenuView',
        properties: {
          visible: false
        }
      },
      countDownView: {
        type: 'BattleCountDownView',
        properties: {
          visible: false
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  BattleView.prototype.init = function() {
    var _this = this;
    _this._initScale();
    CommonEvent.addEventListener(CommonEvent.GAME_MULTI_START, _this._onGameMultiStart, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_CONTINUE, _this._onGameContinue, _this);

    CommonEvent.addEventListener(CommonEvent.GAME_OVER, _this._onResultOver, _this);
    MasterClient.addEventListener(GameEvent.SYNCHRONIZE_REQUEST, _this._onSynchronizeRequest, _this);
  };
  BattleView.prototype._onSynchronizeRequest = function(event) {
    var _this = this;
    var characterView, i;
    var params = {};
    var playerParams = { hp: _this.gameTeam.hpProgress.progress, buffers: [] };
    for (i = 0; i < _this.gameTeam.layer.numChildren; i++) {
      characterView = _this.gameTeam.layer.childList[i];
      playerParams.buffers.push(characterView.model.buffer());
    }
    params.playerTeam = playerParams;
    var opponentParams = { hp: _this.opponentTeam.hpProgress.progress, buffers: [] };
    for (i = 0; i < _this.opponentTeam.layer.numChildren; i++) {
      characterView = _this.opponentTeam.layer.childList[i];
      opponentParams.buffers.push(characterView.model.buffer());
    }
    params.opponentTeam = opponentParams;
    MasterClient.synchronize({ params: params });
  };
  BattleView.prototype._onResultOver = function(event) {
    var _this = this;
    _this.removeEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
    _this.skillCtrlView.clear();
  };
  BattleView.prototype._onGameMultiStart = function(event) {
    var _this = this;
    _this.gameMap.updateView(GameManager.matchId % 24 + 1);
    _this.countDownView.updateView();
    _this.stepLabel.visible = false;
    _this.enemyTeam.visible = false;
    _this.opponentTeam.visible = true;
    _this.gameTeam.x = _this.gameTeam.startX;
    _this.opponentTeam.x = _this.opponentTeam.startX;
    LTweenLite.to(_this.opponentTeam, 1, { x: _this.opponentTeam.endX });
    LTweenLite.to(_this.gameTeam, 1, { x: _this.gameTeam.endX, onStart: function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_MASK_SHOW);
    }, onComplete: function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_MASK_HIDE);
      CommonEvent.dispatchEvent(CommonEvent.ENEMY_AUTO_SELECT);
      _this.gameTeam.hpProgress.visible = true;
    } });
    _this.addEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
  };
  BattleView.prototype._onTimeout = function() {
    if (GameManager.isMulti()) {
      CommonEvent.dispatchEvent(CommonEvent.RESULT_TIE);
    } else {
      CommonEvent.dispatchEvent(CommonEvent.RESULT_FAIL);
    }
  };
  BattleView.prototype._onframe = function(event) {
    var _this = this;
    var times = GameManager.endTime - BaseService.getTime();
    if (times < 0) {
      _this._onResultOver();
      _this._onTimeout();
      return;
    } else if (times > BATTLE_TOTAL_TIME) {
      times = BATTLE_TOTAL_TIME;
    }
    times = times * 0.001 >> 0;
    var minute = times / 60 >> 0;
    var second = times % 60;
    _this.timeLabel.text = minute + ':' + second;
  };
  BattleView.prototype._onGameStart = function(event) {
    var _this = this;
    _this.gameMap.updateView(event.stage.map() % 24 + 1);
    _this.stepLabel.visible = true;
    _this.enemyTeam.visible = true;
    _this.opponentTeam.visible = false;
    _this.stepLabel.text = GameManager.stepIndex + '/' + GameManager.stepSum;
    _this.gameTeam.x = _this.gameTeam.startX;
    _this.gameTeam.hpProgress.visible = false;
    LTweenLite.to(_this.gameTeam, 1, { x: _this.gameTeam.endX, onStart: function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_MASK_SHOW);
    }, onComplete: function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_MASK_HIDE);
      CommonEvent.dispatchEvent(CommonEvent.ENEMY_AUTO_SELECT);
      _this.gameTeam.hpProgress.visible = true;
    } });
    _this.addEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
  };
  BattleView.prototype._onGameContinue = function(event) {
    var _this = this;
    _this.stepLabel.text = GameManager.stepIndex + '/' + GameManager.stepSum;
    _this.gameTeam.hpProgress.visible = false;
    _this.enemyTeam.visible = false;
    LTweenLite.to(_this.gameTeam, 1, { x: _this.gameTeam.clearX, onStart: function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_MASK_SHOW);
    }, onComplete: function() {} })
      .to(_this, 1, { alpha: 0, onStart: function() {},
        onComplete: function() {
          _this.enemyTeam.visible = true;
          _this.gameTeam.x = _this.gameTeam.startX;
        } })
      .to(_this, 0.5, { alpha: 1, onStart: function() {},
        onComplete: function() {} })
      .to(_this.gameTeam, 1, { x: _this.gameTeam.endX, onStart: function() {
      }, onComplete: function() {
        CommonEvent.dispatchEvent(CommonEvent.BATTLE_MASK_HIDE);
        CommonEvent.dispatchEvent(CommonEvent.ENEMY_AUTO_SELECT);
        _this.gameTeam.hpProgress.visible = true;
      } });
  };
  BattleView.prototype._initScale = function() {
    var _this = this;
    var scale = 1;
    if (_this._width / _this._height > LGlobal.width / LGlobal.height) {
      scale = LGlobal.width / _this._width;
      _this.y = (LGlobal.height - _this._height * scale) * 0.5;
    } else {
      scale = LGlobal.height / _this._height;
      _this.x = (LGlobal.width - _this._width * scale) * 0.5;
    }
    _this.scaleX = _this.scaleY = scale;
  };
  BattleView.prototype._showMenu = function(event) {
    var _this = this;
    _this.footerMenu.visible = true;
  };
    
  return BattleView;
})();