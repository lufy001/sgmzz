var BuyResponse = (function() {
  function BuyResponse(data) {
    var _this = this;
    _this.data = data;
  }
  BuyResponse.prototype.playerModel = function() {
    return new PlayerModel(this.data.playerModel);
  };
  BuyResponse.prototype.contents = function() {
    return new ContentsModel(this.data.contents);
  };
  return BuyResponse;
})();