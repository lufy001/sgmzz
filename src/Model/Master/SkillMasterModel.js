var SkillMasterModel = (function() {
  function SkillMasterModel(data) {
    var _this = this;
    _this.data = data;
  }
  SkillMasterModel.prototype.id = function() {
    return this.data.id;
  };
  SkillMasterModel.prototype.name = function() {
    return this.data.name;
  };
  SkillMasterModel.prototype.icon = function() {
    return this.data.icon;
  };
  SkillMasterModel.prototype.arrows = function() {
    return this.data.arrows;
  };
  SkillMasterModel.prototype.target = function() {
    return this.data.target;
  };
  SkillMasterModel.prototype.type = function() {
    return this.data.type;
  };
  SkillMasterModel.prototype.value = function() {
    return this.data.value;
  };
  SkillMasterModel.prototype.special = function() {
    return this.data.special;
  };
  SkillMasterModel.prototype.introduction = function() {
    return this.data.introduction || ' ';
  };
    
  return SkillMasterModel;
})();