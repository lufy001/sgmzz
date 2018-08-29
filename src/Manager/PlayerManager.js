var PlayerManager = (function() {
  function PlayerManager() {
    var _this = this;
    _this.playerModel = null;
		_this.masterList = {};
  }
  PlayerManager.prototype.setMasters = function(jsonDataList) {
    var _this = this;
    //var jsonDataList = JSON.parse(dataStr);
    jsonDataList.forEach(function(data) {
      _this.masterList[data.level] = data;
    });
  };
  PlayerManager.prototype.getMaster = function(level) {
    return this.masterList[level];
  };
  return new PlayerManager();
})();