var BattleView = (function() {
  function BattleView() {
    var _this = this;
    _this._width = 640;
    _this._height = 960;
    var properties = {
      gameMap: {
        params: { id: 1 },
        type: 'GameMapView'
      },
      stepLabel: {
        type: 'Label',
        properties: {
          textAlign: 'right',
          text: '0/0',
          size: 30,
          x: 630,
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
      board: {
        type: 'ArrowBoardView',
        properties: {
          x: 0,
          y: 460
        }
      },
      ctrlView: {
        type: 'CtrlView',
        properties: {
          x: 320,
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
      }
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  BattleView.prototype.init = function() {
    var _this = this;
    _this._initScale();
    CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_CONTINUE, _this._onGameContinue, _this);
  };
  BattleView.prototype._onGameStart = function(event) {
    var _this = this;
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