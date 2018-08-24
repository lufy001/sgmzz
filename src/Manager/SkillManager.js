var SkillManager = (function() {
  function SkillManager() {
    var _this = this;
    _this.masterList = {};
  }
  SkillManager.prototype.setMasters = function(jsonDataList) {
    var _this = this;
    //var jsonDataList = JSON.parse(dataStr);
    jsonDataList.forEach(function(data) {
      var masterModel = new SkillMasterModel(data);
      _this.masterList[masterModel.id()] = masterModel;
    });
  };
  SkillManager.prototype.getMasterModel = function(id) {
    return this.masterList[id];
  };
    
  return new SkillManager();
})();