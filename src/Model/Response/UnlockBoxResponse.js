var UnlockBoxResponse = (function() {
  function UnlockBoxResponse(data) {
    var _this = this;
    _this.data = data;
  }
  UnlockBoxResponse.prototype.boxs = function() {
    return this.data.boxs;
  };
  return UnlockBoxResponse;
})();