var ContentsModel = (function() {
  function ContentsModel(data) {
    var _this = this;
    _this.data = data;
  }
  ContentsModel.prototype.coin = function() {
    return this.data.coin;
  };
  ContentsModel.prototype.gem = function() {
    return this.data.gem;
  };
  ContentsModel.prototype.cards = function() {
    return this.data.cards;
  };
  return ContentsModel;
})();