var BattleResultResponse = (function() {
  function BattleResultResponse(data) {
    var _this = this;
    _this.data = data;
  }
  BattleResultResponse.prototype.playerModel = function() {
  	return new PlayerModel(this.data.playerModel);
  };
  BattleResultResponse.prototype.gem = function() {
  	return this.data.gem;
  };
  BattleResultResponse.prototype.boxId = function() {
  	return this.data.boxId;
  };
  BattleResultResponse.prototype.coin = function() {
  	return this.data.coin;
  };
  BattleResultResponse.prototype.cup = function() {
  	return this.data.cup;
  };
  return BattleResultResponse;
})();