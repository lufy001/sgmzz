var AUTO_ATTACK_TIME = {
  'very fast': 3000,
  'fast': 4000,
  'medium': 5000,
  'slow': 6000
};
var EnemyView = (function() {
  function EnemyView(model, scale) {
    var _this = this;
    _this._scale = scale;
    var properties = {
      hpProgress: {
        type: 'ProgressView',
        params: { background: 'hp_back_mini', foreground: 'hp_front_mini' },
        properties: {
          y: -5
        }
      },
      selectIcon: {
        type: 'LBitmap',
        data: 'arrow-select',
        properties: {
          x: 30,
          y: 0,
          visible: false
        }
      },
    };
    LExtends(_this, BattleCharacterView, [model, properties]);
    _this.updateView(model);
    _this._addEvent();
  }
      
  EnemyView.prototype._characterInit = function() {
    var _this = this;
    _this.character.scaleX = _this.character.scaleY = _this._scale;
    _this.character.x = -_this.character.getWidth() * 0.5;
    _this.character.y = -_this.character.getHeight();
    _this.hpProgress.x = -_this.hpProgress.getWidth() * 0.5;
    _this.selectIcon.x = _this.selectIcon.getWidth();
    _this.selectIcon.y = _this.character.y + (_this.character.getHeight() - _this.selectIcon.getHeight()) * 0.5;
  };
      
  EnemyView.prototype.init = function(data) {
    var _this = this;
    _this.callParent('init', arguments);
          
    _this.setActionDirection(CharacterAction.MOVE, CharacterDirection.LEFT);
    _this._characterInit();
  };
  
  EnemyView.prototype.updateView = function(model) {
    var _this = this;
    _this.model = model;
    _this._attackSpeed = AUTO_ATTACK_TIME[_this.model.attackSpeed()];
    _this._attackSpeedStep = _this._attackSpeed;
    _this.hpProgress.updateView({ progress: _this.model.hp(), sum: _this.model.hp(), fontSize: 14 });
    _this.load();
  };
  EnemyView.prototype._addEvent = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.SELECT_ENEMY, _this._onSelectEnemy, _this);
    CommonEvent.addEventListener(CommonEvent.ENEMY_HERT, _this._onHert, _this);
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
  };
  EnemyView.prototype.die = function() {
    CommonEvent.removeEventListener(CommonEvent.SELECT_ENEMY, this._onSelectEnemy, this);
    CommonEvent.removeEventListener(CommonEvent.ENEMY_HERT, this._onHert, this);
    this.callParent('die');
  };
  EnemyView.prototype._onClick = function(event) {
    this.toSelect();
  };
  EnemyView.prototype.toSelect = function() {
    var _this = this;
    var e = new LEvent(CommonEvent.SELECT_ENEMY);
    e.model = _this.model;
    CommonEvent.dispatchEvent(e);
  };
  EnemyView.prototype._onSelectEnemy = function(event) {
    var _this = this;
    var model = event.model;
    _this.selectIcon.visible = _this.model.id() === model.id();
  };
  EnemyView.prototype._onHert = function(event) {
    var _this = this;
    if (!_this.selectIcon.visible) {
      return;
    }
    var hert = event.hertValue;
    if (event.attackType === 'physice') {
      hert = hert * _this.model.physiceDefense();
    } else {
      hert = hert * _this.model.magicDefense();
    }
    var hp = _this.hpProgress.progress - hert;
    _this.hpProgress.updateView({ progress: hp >= 0 ? hp : 0, fontSize: 14 });
    if (hp <= 0) {
      _this.remove();
      CommonEvent.dispatchEvent(CommonEvent.RESULT_CHECK);
    }
  };
  EnemyView.prototype.addHp = function(value) {
    var _this = this;
    var hp = _this.hpProgress.progress + value;
    _this.hpProgress.updateView({ progress: hp < _this.hpProgress.sum ? hp : _this.hpProgress.sum, fontSize: 14 });
  };
  EnemyView.prototype._onFrame = function(event) {
    var _this = this;
    _this.callParent('_onFrame', arguments);
    _this._attackSpeedStep -= LGlobal.speed;
    if (_this._attackSpeedStep > 0) {
      return;
    }
    _this._attackSpeedStep = _this._attackSpeed;
    _this._attackToHert();
  };
  EnemyView.prototype._attackToHert = function() {
    var _this = this;
    var skill = _this.skill;
    var directionLength = (4 * Math.random() >> 0) + 2;
    _this._skill = null;
    var team = UserService.instance().playerModel.team();
    var hert = _this.model.attack();
    hert = hert + hert * (directionLength - 2) * 0.5;
    var event = new LEvent(CommonEvent.PLAYER_HERT);
    event.targetId = team[team.length * Math.random() >> 0].id();
    event.hertValue = hert >>> 0;
    event.attackType = _this.model.attackType();
    CommonEvent.dispatchEvent(event);
    if (!skill) {
      return;
    }
    event = new LEvent(CommonEvent.SKILL_START);
    event.skill = skill;
    event.hert = hert;
    event.directionCount = directionLength;
    event.model = _this.model;
    event.isToAll = false;
    CommonEvent.dispatchEvent(event);
  };
  return EnemyView;
})();