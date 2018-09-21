var UnlockBoxResponse = (function() {
  function UnlockBoxResponse(data) {
    var _this = this;
    _this.data = data;
  }
  UnlockBoxResponse.prototype.boxs = function() {
    return this.data.boxs;
  };
  UnlockBoxResponse.prototype.unlockBoxAdTimesWatched = function() {
    return this.data.unlockBoxAdTimesWatched;
  };
  return UnlockBoxResponse;
})();