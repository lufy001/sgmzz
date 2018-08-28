var CharacterView = (function() {
  function CharacterView(model, properties) {
    var _this = this;
    LExtends(_this, BattleCharacterView, [model, properties]);
    //_this.model = model;
    _this.load();
  }
  CharacterView.prototype.init = function(data) {
    var _this = this;
    _this.callParent('init', arguments);
    _this.setActionDirection(CharacterAction.MOVE, CharacterDirection.RIGHT);

    _this.character.addFrameScript(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.RIGHT), function() {
      _this._attackToHert();
    }, []);
    _this.character.addEventListener(LEvent.COMPLETE, _this.actionComplete, _this);

    CommonEvent.addEventListener(CommonEvent.ARROW_ATTACK, _this._checkAttack, _this);
    CommonEvent.addEventListener(CommonEvent.SKILL_START, _this._onSkillStart, _this);
    CommonEvent.addEventListener(CommonEvent.PLAYER_HERT, _this._onHert, _this);
  };
  CharacterView.prototype.die = function() {
    var _this = this;
    CommonEvent.removeEventListener(CommonEvent.ARROW_ATTACK, _this._checkAttack, _this);
    CommonEvent.removeEventListener(CommonEvent.SKILL_START, _this._onSkillStart, _this);
    CommonEvent.removeEventListener(CommonEvent.PLAYER_HERT, _this._onHert, _this);
    _this.callParent('die', arguments);
  };
  CharacterView.prototype._attackToHert = function() {
    var _this = this;
    var skill = _this.skill;
    var directions = _this._directions;
    _this._directions = null;
    _this._skill = null;
        
    var hert = _this.model.attack();
    hert = hert + hert * (directions.length - 2) * 0.5;
    var event = new LEvent(CommonEvent.ENEMY_HERT);
    event.hertValue = hert >>> 0;
    event.attackType = _this.model.attackType();
    CommonEvent.dispatchEvent(event);
        
    if (!skill) {
      return;
    }
    event = new LEvent(CommonEvent.SKILL_START);
    event.skill = skill;
    event.hert = hert;
    event.directionCount = directions.length;
    event.model = _this.model;
    event.isToAll = false;
    CommonEvent.dispatchEvent(event);
  };
  CharacterView.prototype.actionComplete = function(event) {
    var _this = this;
    switch (_this.action) {
      case CharacterAction.ATTACK:
        _this.setActionDirection(CharacterAction.MOVE, _this.direction);
        break;
    }
  };
  CharacterView.prototype._checkAttack = function(event) {
    var _this = this;
    var params = event.params;
    if (_this.model.belong() !== params.belong || _this.model.id() !== params.characterId) {
      return;
    }
    _this._directions = params.directions;
    _this._skill = params.skill;
    _this.setActionDirection(CharacterAction.ATTACK, _this.direction);
  };
  CharacterView.prototype.addHp = function(value) {
    var event = new LEvent('player:changeHp');
    event.value = value;
    _this.dispatchEvent(event);
  };
  CharacterView.prototype._onHert = function(event) {
    var _this = this;
    if (event.targetId !== _this.model.id()) {
      return;
    }
    var hert = event.hertValue;
    if (event.attackType === 'physice') {
      hert = hert * _this.model.physiceDefense();
    } else {
      hert = hert * _this.model.magicDefense();
    }
    var e = new LEvent('player:changeHp');
    e.value = -hert;
    _this.dispatchEvent(e);
  };
  return CharacterView;
})();