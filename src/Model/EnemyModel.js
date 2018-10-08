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
    var lv = _this.level() - 1;
    var multiplier = lv * lv / 196 + lv / 14 + 1;
    return (_this._master.hp() + _this.level() * _this._master.hpPlus()) * multiplier >> 0;
  };
    
  return EnemyModel;
})();