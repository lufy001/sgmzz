var StageMasterModel = (function() {
  function StageMasterModel(data) {
    var _this = this;
    _this.data = data;
  }
  StageMasterModel.prototype.id = function() {
    return this.data.id;
  };
  StageMasterModel.prototype.title = function() {
    return Localization.get('stage_' + this.data.id);
  };
  StageMasterModel.prototype.map = function() {
    return this.data.map;
  };
  StageMasterModel.prototype.boxIds = function() {
    return this.data.boxIds;
  };
  StageMasterModel.prototype.boxLv = function() {
    return this.data.boxlv;
  };
  StageMasterModel.prototype.enemys = function() {
    var _this = this;
    if (!_this.data._enemys) {
      _this.data._enemys = [];
      for (var i = 0; i < _this.data.enemys.length; i++) {
        var enemyList = [];
        var childs = _this.data.enemys[i];
        for (var j = 0; j < childs.length; j++) {
          var model = new EnemyModel(childs[j]);
          enemyList.push(model);
        }
        _this.data._enemys.push(enemyList);
      }
    }
    return _this.data._enemys;
  };
    
  return StageMasterModel;
})();