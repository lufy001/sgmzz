var UserLevelManager = (function() {
  function UserLevelManager() {
    var _this = this;
    _this.masterList = {};
  }
  UserLevelManager.prototype.setMasters = function(jsonDataList) {
    var _this = this;
    //var jsonDataList = JSON.parse(dataStr);
    jsonDataList.forEach(function(data) {
      _this.masterList[data.level] = data;
    });
  };
  UserLevelManager.prototype.getMaster = function(level) {
    return this.masterList[level];
  };
    
  return new UserLevelManager();
})();