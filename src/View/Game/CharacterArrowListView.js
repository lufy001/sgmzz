var ARROW_SPEED_MAP = {
  'very fast': 4.5,
  'fast': 3.5,
  'medium': 2.5,
  'slow': 1.5
};
var CharacterArrowListView = (function() {
  function CharacterArrowListView(model) {
    var _this = this;
    _this._width = 640;
    LExtends(_this, ArrowListView, [[]]);
    _this.model = model;
    console.error(model);
    _this.speed = ARROW_SPEED_MAP[_this.model.attackSpeed()];
    _this._addEvent();
        
  }
    
  CharacterArrowListView.directions = ['left', 'up', 'right', 'down', 'question'];
  CharacterArrowListView.prototype._addEvent = function() {
    var _this = this;
    _this.addEventListener(LEvent.ENTER_FRAME, _this._onFrame, _this);
    CommonEvent.addEventListener(CommonEvent.ARROW_DRAW, _this._checkDraw, _this);
    CommonEvent.addEventListener(CommonEvent.ARROW_CHECK, _this._checkGo, _this);
  };
  CharacterArrowListView.prototype._onFrame = function(event) {
    var _this = this;
    if (_this.numChildren === 0 || _this.x <= -_this.getWidth()) {
      _this.init();
      return;
    }
    _this.x -= _this.speed;
  };
  CharacterArrowListView.prototype.init = function() {
    var _this = this;
    _this.x = _this._width;
    _this.clear();
    var directions = CharacterArrowListView.directions;
    var num = (Math.random() * 4 >>> 0) + 2;
    for (var i = 0; i < num; i++) {
      var direction = directions[directions.length * Math.random() >>> 0];
      _this.add(direction);
    }
    if (_this._isSkillEnabled()) {
      _this.filters = [new LDropShadowFilter(5, 0, '#FF0000')];
    } else {
      _this.filters = null;
    }
  };
  CharacterArrowListView.prototype._isReady = function() {
    return this.childList.findIndex(function(child) {
      return !child.isDark;
    }) < 0;
  };
  CharacterArrowListView.prototype._checkGo = function(event) {
    var _this = this;
    if (!_this._isReady()) {
      _this._arrowsInit();
      return;
    }
    var params = {};
    var e = new LEvent(CommonEvent.ARROW_ATTACK);
    params.characterId = _this.model.id();
    params.belong = CharacterBelong.SELF;
    params.targetId = GameManager.selectEnemyId;
    params.directions = [];
    var skill = _this.model.skill();
    var skillArrows = skill ? skill.arrows() : null;
    var skillEnabled = !!skill && _this.childList.length >= 3;
    var skillPower = 0;
    for (var i = 0; i < _this.childList.length; i++) {
      var child = _this.childList[i];
      if (child.direction === Direction.ALL) {
        skillPower++;
      }
      var currentDirection = child.currentDirection;
      params.directions.push(currentDirection);
      if (skillEnabled && skillArrows[i] !== currentDirection) {
        skillEnabled = false;
      }
    }
    if (skillEnabled) {
      params.skillId = skill.id();
    }
    e.params = params;
    CommonEvent.dispatchEvent(e);
    if (GameManager.isMulti()) {
      MasterClient.attack({ params: params });
    }
    if (skillPower > 0) {
      e = new LEvent(CommonEvent.ADD_SKILL_POWER);
      e.value = skillPower;
      CommonEvent.dispatchEvent(e);
    }
    _this.init();
  };
  CharacterArrowListView.prototype._isSkillEnabled = function() {
    var _this = this;
    var skill = _this.model.skill();
    var skillArrows = skill ? skill.arrows() : null;
    var skillEnabled = !!skill && _this.childList.length >= 3;
    for (var i = 0; skillEnabled && i < _this.childList.length; i++) {
      var child = _this.childList[i];
      var direction = child.direction;
      if (skillEnabled && direction !== Direction.ALL && skillArrows[i] !== direction) {
        skillEnabled = false;
      }
    }
    return skillEnabled;
  };
  CharacterArrowListView.prototype._arrowsInit = function() {
    this.childList.forEach(function(child) {
      child.init();
    });
  };
  CharacterArrowListView.prototype._checkDraw = function(event) {
    var _this = this;
    var inputChildList = event.inputChildList;
    _this._arrowsInit();
    var length = Math.min(inputChildList.length, _this.numChildren);
    for (var i = 0; i < length; i++) {
      var direction = inputChildList[i].direction;
      if (_this.childList[i].isAll()) {
        _this.childList[i].setState(direction, true);
      } else if (_this.childList[i].direction !== direction) {
        _this._arrowsInit();
        break;
      }
      _this.childList[i].setState(direction, true);
    }
  };
  return CharacterArrowListView;
})();