var BoxModel = (function() {
  function BoxModel(data) {
    var _this = this;
    _this.data = data;
    _this._initTime = Date.now();
  }
  BoxModel.prototype.id = function() {
    return this.data.id;
  };
  BoxModel.prototype.master = function() {
    var _this = this;
    _this._master = _this._master || BoxManager.getMasterModel(_this.boxId());
    return _this._master;
  };
  BoxModel.prototype.boxId = function() {
    return this.data.boxId;
  };
  BoxModel.prototype.time = function() {
    var _this = this;
    var dataTime = _this.data.time;
    var elapsedTime = Date.now() - _this._initTime;
    var value = dataTime - (elapsedTime * 0.001 >> 0);
    return value > 0 ? value : 0;
  };
  BoxModel.prototype.status = function() {
    return this.data.status;
  };
  BoxModel.prototype.name = function() {
    return this.master().name();
  };
  BoxModel.prototype.img = function() {
    return this.master().img();
  };
  BoxModel.prototype.coin = function() {
    return JSON.parse(this.master().coin());
  };
  BoxModel.prototype.gem = function () {
    return JSON.parse(this.master().gem());
  };
  BoxModel.prototype.allTime = function() {
    return this.master().allTime();
  };
  BoxModel.prototype.cards = function() {
    return this.master().cards();
  };
  BoxModel.prototype.introduction = function() {
    return this.master().introduction();
  };
  return BoxModel;
})();