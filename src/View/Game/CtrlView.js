var CtrlView = (function() {
  function CtrlView() {
    var _this = this;
    _this._width = 640;
    _this._height = 960;
        
    var properties = {
      btnLeft: {
        type: 'LButton',
        state: 'button-left',
        onClick: '_onClick',
        properties: {
          name: 'left',
          x: 0,
          y: 64
        }
      },
      btnUp: {
        type: 'LButton',
        state: 'button-up',
        onClick: '_onClick',
        properties: {
          name: 'up',
          x: 64,
          y: 0
        }
      },
      btnRight: {
        type: 'LButton',
        state: 'button-right',
        onClick: '_onClick',
        properties: {
          name: 'right',
          x: 128,
          y: 64
        }
      },
      btnDown: {
        type: 'LButton',
        state: 'button-down',
        onClick: '_onClick',
        properties: {
          name: 'down',
          x: 64,
          y: 128
        }
      },
      btnSkill: {
        type: 'BattleSkillIconView',
        properties: {
          x: 220,
          y: 0
        }
      },
      btnOk: {
        type: 'LButton',
        state: 'button-ok',
        onClick: '_onClick',
        properties: {
          name: 'ok',
          x: 220,
          y: 104
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  CtrlView.prototype.init = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_MULTI_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.BATTLE_SKILL_RESET, _this._onBattleSkillReset, _this);
  };
  CtrlView.prototype._onGameStart = function(event) {
    var _this = this;
    CommonEvent.dispatchEvent(CommonEvent.BATTLE_SKILL_RESET);
  };
  CtrlView.prototype._onBattleSkillReset = function(event) {
    var _this = this;
    var team = UserService.instance().playerModel.team();
    var character = team[team.length * Math.random() >>> 0];
    var e = new LEvent(CommonEvent.BATTLE_SKILL_RESET);
    //_this.btnSkill.updateView(character.skill());
    _this.btnSkill.setModel(character);
  };
  CtrlView.prototype._onClick = function(event) {
    var e = new LEvent(CommonEvent.ARROW_CLICK);
    e.input = event.currentTarget.name;
    CommonEvent.dispatchEvent(e);
  };
  return CtrlView;
})();