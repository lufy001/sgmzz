var EffectManager = (function() {
  function EffectManager() {
    var _this = this;
    _this.masterAttackList = {};
  }
  EffectManager.prototype.setMasters = function(dataStr) {
    var _this = this;
    var jsonDataList = JSON.parse(dataStr);
    jsonDataList.attack.forEach(function(data) {
      var masterModel = new EffectMasterModel(data);
      _this.masterAttackList[masterModel.id()] = masterModel;
    });
  };
  EffectManager.prototype.getMasterAttack = function(id) {
    return this.masterAttackList[id];
  };
    
  return new EffectManager();
})();