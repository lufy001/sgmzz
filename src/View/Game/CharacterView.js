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
    _this.addEventListener(CommonEvent.SKILL_START, _this._onSkillStart, _this);

    CommonEvent.addEventListener(CommonEvent.ARROW_ATTACK, _this._onArrowAttack, _this);
    CommonEvent.addEventListener(CommonEvent.ON_HERT, _this._onHert, _this);

    _this.character.addFrameScript(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.RIGHT), function() {
      _this._attackToHert();
    }, []);
  };
  CharacterView.prototype.die = function() {
    var _this = this;
    CommonEvent.removeEventListener(CommonEvent.ARROW_ATTACK, _this._onArrowAttack, _this);
    //CommonEvent.removeEventListener(CommonEvent.SKILL_START, _this._onSkillStart, _this);
    CommonEvent.removeEventListener(CommonEvent.ON_HERT, _this._onHert, _this);
    _this.callParent('die', arguments);
  };
  CharacterView.prototype._attackToHert = function() {
    var _this = this;
    SoundManager.playSE('se_atk');
    var params = _this._params;
    var skill = params.skillId ? SkillManager.getMasterModel(params.skillId) : null;
    var directions = params.directions;
    _this._params = null;
        
    var hert = _this.model.attack();
    hert = hert + hert * (directions.length - 2) * 0.5;
    var event = new LEvent(CommonEvent.ON_HERT);
    event.hertValue = hert >>> 0;
    event.attackType = _this.model.attackType();
    event.targetId = params.targetId;
    event.belong = params.belong;
    CommonEvent.dispatchEvent(event);

    //skill = _this.model.skill();
    _this._dispatchSkillStart(skill, directions.length, params.targetId);
    /*if (!skill) {
      return;
    }
    event = new LEvent(CommonEvent.SKILL_START);
    var skillParams = {};
    skillParams.skillId = skill.id();
    skillParams.hert = _this.model.attack();
    skillParams.directionCount = directions.length;
    skillParams.belong = params.belong;
    skillParams.targetId = skill.target() === 'self' ? _this.model.id() : params.targetId;
    skillParams.amount = 1;
    event.params = skillParams;
    CommonEvent.dispatchEvent(event);*/
  };
  CharacterView.prototype._onArrowAttack = function(event) {
    var _this = this;
    var params = event.params;
    if (_this.model.belong() !== params.belong || _this.model.id() !== params.characterId) {
      return;
    }
    _this._params = params;
    _this.setActionDirection(CharacterAction.ATTACK, _this.direction);
  };
  CharacterView.prototype.showSkillCtrl = function(value) {
    var _this = this;
    if (_this.skillCtrl) {
      _this.skillCtrl.visible = true;
      _this.skillCtrl.alpha = 1;
      return;
    }
    var skill = _this.model.skill();
    var skillArrows = skill ? skill.arrows() : [];
    if (skillArrows.length === 0) {
      return;
    }
    var arrowList = new ArrowListView(skillArrows);
    _this.skillCtrl = arrowList;
    arrowList.x = -25;
    arrowList.scaleX = arrowList.scaleY = 0.6;
    _this.addChild(arrowList);
  };
  CharacterView.prototype._onFrame = function(event) {
    var _this = this;
    _this.callParent('_onFrame', arguments);
    if (!_this.skillCtrl || !_this.skillCtrl.visible) {
      return;
    }
    if (_this.skillCtrl.alpha > 0.7) {
      _this.skillCtrl.alpha -= 0.005;
    } else {
      _this.skillCtrl.alpha -= 0.05;
    }
    if (_this.skillCtrl.alpha < 0) {
      _this.skillCtrl.alpha = 0;
      _this.skillCtrl.visible = false;
    }
  };
  CharacterView.prototype.addHp = function(value) {
    var event = new LEvent('player:changeHp');
    event.value = value;
    this.dispatchEvent(event);
  };
  CharacterView.prototype._onHert = function(event) {
    var _this = this;
    if (_this.model.belong() === event.belong || _this.model.id() !== event.targetId) {
      return;
    }
    var hert = event.hertValue;
    if (event.attackType === 'physice') {
      hert = hert * _this.model.physiceDefense();
    } else {
      hert = hert * _this.model.magicDefense();
    }
    _this.showHpChange(-hert);
    var e = new LEvent('player:changeHp');
    e.value = -hert;
    _this.dispatchEvent(e);
  };
  return CharacterView;
})();