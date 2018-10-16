var CompetitionRewardModel = (function() {
  function CompetitionRewardModel(data) {
    var _this = this;
    _this.data = data;
  }
  CompetitionRewardModel.prototype.rank = function() {
    return this.data.rank;
  };
  CompetitionRewardModel.prototype.boxId = function() {
    return this.data.boxId;
  };
  CompetitionRewardModel.prototype.box = function() {
    var _this = this;
    _this.data.box = _this.data.box || new BoxModel({ boxId: _this.boxId() });
    return _this.data.box;
  };
  CompetitionRewardModel.prototype.contents = function() {
    return new ContentsModel(this.data.contents);
  };
    
  return CompetitionRewardModel;
})();