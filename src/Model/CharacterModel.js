var CharacterModel = (function() {
  function CharacterModel(data) {
    var _this = this;
    _this.data = data;
    _this.init();
  }
  CharacterModel.prototype.init = function() {
    var _this = this;
    _this.data._buffer = {};
    _this._master = CharacterManager.getMasterModel(_this.id());
  };
  CharacterModel.prototype.id = function() {
    return this.data.id;
  };
  CharacterModel.prototype.belong = function() {
    return 'self';
  };
  CharacterModel.prototype.level = function() {
    return this.data.level;
  };
  CharacterModel.prototype.amount = function() {
    return this.data.amount;
  };
  CharacterModel.prototype.name = function() {
    return this._master.name();
  };
  CharacterModel.prototype.introduction = function() {
    return this._master.introduction();
  };
  CharacterModel.prototype.rarity = function() {
    return this._master.rarity();
  };
  CharacterModel.prototype.attackType = function() {
    return this._master.attackType();
  };
  CharacterModel.prototype.hert = function() {
    return this.attack();
  };
  CharacterModel.prototype.attack = function() {
    var _this = this;
    var value = _this._master.attack() + _this.level() * _this._master.attackPlus();
    if (_this.data._buffer['atk']) {
      value = value * (1 + _this.data._buffer['atk'].value);
    }
    return value >>> 0;
  };
  CharacterModel.prototype.buffer = function(value) {
    if (typeof value === UNDEFINED) {
      return this._buffer;
    }
    this._buffer = value;
  };
  CharacterModel.prototype.physiceDefense = function() {
    return this.data._buffer['phy_def'] || 1;
  };
  CharacterModel.prototype.magicDefense = function() {
    return this.data._buffer['mag_def'] || 1;
  };
  CharacterModel.prototype.addBuffer = function(key, value, time) {
    return this.data._buffer[key] = { value: value, time: time };
  };
  CharacterModel.prototype.getBuffer = function(key) {
    return this.data._buffer[key];
  };
  CharacterModel.prototype.deleteBuffer = function(key) {
    delete this.data._buffer[key];
  };
  CharacterModel.prototype.autoBufferDelete = function(keys) {
    var _this = this;
    var bufferKeys = ['atk', 'phy_def', 'mag_def', 'poison', 'ice'];
    var deleteKeys = [];
    bufferKeys.forEach(function(key) {
      var buffer = _this.data._buffer[key];
      if (!buffer) {
        return;
      }
      buffer.time -= LGlobal.speed;
      if (buffer.time <= 0) {
        delete _this.data._buffer[key];
        deleteKeys.push(key);
      }
    });
    return deleteKeys;
  };
  CharacterModel.prototype.skill = function() {
    var _this = this;
    if (!_this._skill && _this._master.skillId()) {
      //_this._skill = new SkillModel({ id: _this._master.skillId(), level: _this.level() }); 
      _this._skill = SkillManager.getMasterModel(_this._master.skillId());
    }
    return _this._skill;
  };
  CharacterModel.prototype.attackSpeed = function() {
    return this._master.attackSpeed();
  };
  CharacterModel.prototype.hp = function() {
    var _this = this;
    return (_this._master.hp() + _this.level() * _this._master.hpPlus()) * 2;
  };
  return CharacterModel;
})();