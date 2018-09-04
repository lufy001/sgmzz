var PlayerResponse = (function() {
  function PlayerResponse(data) {
    var _this = this;
    _this.data = data;
  }
  PlayerResponse.prototype.playerModel = function() {
    return new PlayerModel(this.data.playerModel);
  };
  PlayerResponse.prototype.contents = function() {
    return new ContentsModel(this.data.contents);
  };
  return PlayerResponse;
})();