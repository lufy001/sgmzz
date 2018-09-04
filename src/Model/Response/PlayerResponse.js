var PlayerResponse = (function() {
  function PlayerResponse(data) {
    var _this = this;
    _this.data = data;
  }
  PlayerResponse.prototype.team = function(value) {
    var _this = this;
    if (!_this.data._team) {
      _this.data._team = [];
      _this.data.team.forEach(function(child) {
        var model = new CharacterModel(child);
        _this.data._team.push(model);
      });
    }
    return _this.data._team;
  };
  PlayerResponse.prototype.id = function() {
    return this.data.id;
  };
  PlayerResponse.prototype.name = function() {
    return this.data.name;
  };
  PlayerResponse.prototype.amount = function() {
    return undefined;
  };
  PlayerResponse.prototype.cup = function() {
    return this.data.cup;
  };
  PlayerResponse.prototype.maxCup = function() {
    return this.data.maxCup;
  };
  PlayerResponse.prototype.lv = function() {
    return this.data.lv;
  };
  return PlayerResponse;
})();