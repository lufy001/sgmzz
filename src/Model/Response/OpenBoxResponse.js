var OpenBoxResponse = (function() {
  function OpenBoxResponse(data) {
    var _this = this;
    _this.data = data;
  }
  OpenBoxResponse.prototype.playerModel = function() {
    return new PlayerModel(this.data.playerModel);
  };
  OpenBoxResponse.prototype.contents = function() {
    return new ContentsModel(this.data.contents);
  };
  return OpenBoxResponse;
})();