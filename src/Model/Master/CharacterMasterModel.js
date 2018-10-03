var CharacterMasterModel = (function() {
  function CharacterMasterModel(data) {
    var _this = this;
    _this.data = data;
  }
  CharacterMasterModel.prototype.id = function() {
    return this.data.id;
  };
  CharacterMasterModel.prototype.name = function() {
    return Localization.get("character_name_" + this.data.id);
  };
  CharacterMasterModel.prototype.introduction = function() {
    return this.data.introduction || ' ';
  };
  CharacterMasterModel.prototype.skillId = function() {
    return this.data.skillId;
  };
  CharacterMasterModel.prototype.attackIds = function() {
    return this.data.attackIds;
  };
  CharacterMasterModel.prototype.attackSpeed = function() {
    return this.data.attackSpeed;
  };
  CharacterMasterModel.prototype.rarity = function() {
    return this.data.rarity;
  };
  CharacterMasterModel.prototype.attackType = function() {
    return this.data.attackType;
  };
  CharacterMasterModel.prototype.attack = function() {
    return this.data.attack;
  };
  CharacterMasterModel.prototype.attackPlus = function() {
    return this.data.attackPlus;
  };
  CharacterMasterModel.prototype.hp = function() {
    return this.data.hp;
  };
  CharacterMasterModel.prototype.hpPlus = function() {
    return this.data.hpPlus;
  };
  return CharacterMasterModel;
})();