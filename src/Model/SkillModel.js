var SkillModel = (function() {
  function SkillModel(data) {
    var _this = this;
    _this.data = data;
    _this.init();
  }
  SkillModel.prototype.init = function() {
    var _this = this;
    _this._master = SkillManager.getMasterModel(_this.id());
  };
  SkillModel.prototype.id = function() {
    return this.data.id;
  };
  SkillModel.prototype.level = function() {
    return this.data.level;
  };
  SkillModel.prototype.name = function() {
    return this._master.name();
  };
  SkillModel.prototype.arrows = function() {
    return this._master.arrows();
  };
  SkillModel.prototype.icon = function() {
    return this._master.icon();
  };
  SkillModel.prototype.target = function() {
    return this._master.target();
  };
  SkillModel.prototype.type = function() {
    return this._master.type();
  };
  SkillModel.prototype.percentage = function() {
    return this._master.percentage() + this._master.plus() * this.level();
  };
  SkillModel.prototype.plus = function() {
    return this._master.plus();
  };
  SkillModel.prototype.amount = function() {
    return this._master.amount();
  };
  SkillModel.prototype.introduction = function() {
    return this._master.introduction();
  };
  return SkillModel;
})();