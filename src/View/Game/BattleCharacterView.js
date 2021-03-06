var DEFAULT_BUFFER_TIME = 10000;
var POISON_BUFFER_TIME = 500;
var BattleCharacterView = (function() {
  function BattleCharacterView(model, properties) {
    var _this = this;
    properties = properties || {};
    var baseProperties = {
      layer: {
        type: 'LSprite'
      },
      bufferLayer: {
        type: 'LSprite'
      },
      showLayer: {
        type: 'LSprite'
      }
    };
    for (var key in properties) {
      baseProperties[key] = properties[key];
    }
    LExtends(_this, BaseView, [baseProperties]);
    _this.model = model;
  }
  BattleCharacterView.prototype.load = function() {
    var _this = this;
    dataList.character = dataList.character || {};
    if (dataList.character[_this.model.id()]) {
      _this.init(dataList.character[_this.model.id()]);
      return;
    }
    var imgs = [
      { name: 'character', path: 'resources/images/characters/' + _this.model.id() + '.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.character[_this.model.id()] = data;
      _this.init(data);
    });
  };
  BattleCharacterView.prototype.init = function(data) {
    var _this = this;

    var bitmapData = new LBitmapData(data['character']);
    _this.character = new LAnimationTimeline(bitmapData, CharacterManager.getAnimationData());
    _this.character.scaleX = _this.character.scaleY = 1.4;
    CharacterManager.setAnimationLabel(_this.character);
    _this.character.speed = 3;
    _this.layer.addChild(_this.character);
    _this.character.setFrameSpeedAt(13, 0, 2);
    _this.addEventListener(LEvent.ENTER_FRAME, _this._onFrame, _this);
    _this.character.addEventListener(LEvent.COMPLETE, _this.actionComplete, _this);
  };
  BattleCharacterView.prototype.actionComplete = function(event) {
    var _this = this;
    switch (_this.action) {
      case CharacterAction.ATTACK:
        _this.setActionDirection(CharacterAction.MOVE, _this.direction);
        break;
    }
  };
  BattleCharacterView.prototype.setActionDirection = function(action, direction) {
    var _this = this;
    if (_this.action === action && _this.direction === direction) {
      return;
    }
    var label = action + '-' + direction;
    _this.character.gotoAndPlay(label);
        
    _this.action = action;
    _this.direction = direction;
  };
  BattleCharacterView.prototype.addBuffer = function(key, value, time) {
    var _this = this;
    var buffer = _this.model.getBuffer(key);
    var bufferChild = _this.bufferLayer.getChildByName(key);
    if (buffer && typeof buffer === 'number') {
      _this.model.deleteBuffer(key);
      if (buffer * value < 0) {
        bufferChild.visible = false;
        _this._resetBufferPosition();
        return;
      }
    }
    _this.model.addBuffer(key, value, time);

    var img = 'buffer_' + key;
    if (typeof value === 'number') {
      img += value > 1 ? '_up' : '_down';
    }

    if (bufferChild) {
      bufferChild.bitmapData = new LBitmapData(dataList[img]);
      bufferChild.visible = true;
      _this._resetBufferPosition();
      return;
    }
    bufferChild = new LBitmap(new LBitmapData(dataList[img]));
    bufferChild.name = key;
    bufferChild.y = _this.character.y + _this.character.getHeight() - bufferChild.getHeight();
    _this.bufferLayer.addChild(bufferChild);
    _this._resetBufferPosition();
  };
  BattleCharacterView.prototype._deleteBufferFrame = function() {
    var _this = this;
    var keys = _this.model.autoBufferDelete();
    keys.forEach(function(key) {
      var bufferChild = _this.bufferLayer.getChildByName(key);
      bufferChild.visible = false;
    });
    if (keys.length > 0) {
      _this._resetBufferPosition();
    }
  };
  BattleCharacterView.prototype._onFrame = function(event) {
    var _this = this;
    _this._deleteBufferFrame();
    _this._poisonBuffer();
  };
  BattleCharacterView.prototype._poisonBuffer = function(event) {
    var _this = this;
    var buffer = _this.model.getBuffer('poison');
    if (!buffer) {
      _this._poisonTime = 0;
      return;
    }
    var now = Date.now();
    if (_this._poisonTime === 0) {
      _this._poisonTime = new Date(now + POISON_BUFFER_TIME);
    }
    if (_this._poisonTime < now) {
      _this._poisonTime = new Date(now + POISON_BUFFER_TIME);
      var hert = _this.hpProgress.progress * 0.01 >> 0;
      _this.addHp(-(hert > 0 ? hert : 1));
    }
  };
  BattleCharacterView.prototype._resetBufferPosition = function(value) {
    var _this = this;
    var position = 0;
    _this.bufferLayer.childList.forEach(function(child) {
      if (child.visible) {
        child.x = _this.character.x + position;
        position += child.getWidth();
      }
    });
  };
  BattleCharacterView.prototype._dispatchSkillStart = function(skill, directionCount, targetId) {
    var _this = this;
    if (!skill || directionCount < 3) {
      return;
    }
    var event = new LEvent(CommonEvent.SKILL_START);
    var params = {};
    params.skillId = skill.id();
    params.hert = _this.model.attack();
    params.directionCount = directionCount;
    params.belong = _this.model.belong();
    params.targetId = skill.target() === 'self' ? _this.model.id() : targetId;
    params.amount = 1;
    event.params = params;
    CommonEvent.dispatchEvent(event);
  };
  BattleCharacterView.prototype.addHp = function(value) {
  };
  BattleCharacterView.prototype._onSkillStart = function(event) {
    var _this = this;
    SoundManager.playSE('se_skill');
    var params = event.params;
    var skill = params.skill;
    var directionCount = params.directionCount;
    var value = skill.value()[directionCount - 3];
    var skillType = skill.type();
    switch (skillType) {
      case 'heal':
        _this.addHp(value * params.hert >> 0);
        break;
      case 'ski_atk':
        _this.addHp(-(value * params.hert >> 0));
        break;
      case 'atk':
      case 'phy_def':
      case 'mag_def':
        _this.addBuffer(skillType, value, DEFAULT_BUFFER_TIME);
        break;
      case 'sleep':
      case 'poison':
        _this.addBuffer(skillType, true, value);
        break;
      case 'all_def':
        _this.addBuffer('phy_def', value, DEFAULT_BUFFER_TIME);
        _this.addBuffer('mag_def', value, DEFAULT_BUFFER_TIME);
        break;
    }
  };
  BattleCharacterView.prototype.showHpChange = function(value) {
    var _this = this;
    var label = Common.getStrokeLabel({ text: (value > 0 ? '+' : '-') + value });
    _this.showLayer.addChild(label);
    var y = _this.character.y + 40;
    label.x = _this.character.x + 10 + (40 * Math.random() >> 0);
    label.y = y;
    LTweenLite.to(label, 0.1, { y: y - 5 }).to(label, 0.1, { alpha: 0, y: y - 10 });
  };
  return BattleCharacterView;
})();