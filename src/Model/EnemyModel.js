var EnemyModel = (function() {
  function EnemyModel(data) {
    var _this = this;
    LExtends(_this, CharacterModel, [data]);
  }
  EnemyModel.prototype.belong = function() {
    return 'enemy';
  };
  EnemyModel.prototype.hp = function() {
    var _this = this;
    return (_this._master.hp() + _this.level() * _this._master.hpPlus()) * 4;
  };
    
  return EnemyModel;
})();