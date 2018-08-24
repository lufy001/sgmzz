var BoxModel = (function() {
  function BoxModel(data) {
    var _this = this;
    _this.data = data;
    _this.init();
  }
  BoxModel.prototype.init = function() {
    var _this = this;
    _this._master = BoxManager.getMasterModel(_this.boxId());
  };
  BoxModel.prototype.id = function() {
    return this.data.id;
  };
  BoxModel.prototype.boxId = function() {
    return this.data.boxId;
  };
  BoxModel.prototype.time = function() {
    return this.data.time;
  };
  BoxModel.prototype.status = function() {
    return this.data.status;
  };
  BoxModel.prototype.name = function() {
    return this._master.name();
  };
  BoxModel.prototype.img = function() {
    return this._master.img();
  };
  BoxModel.prototype.coin = function() {
    return this._master.coin();
  };
  BoxModel.prototype.allTime = function() {
    return this._master.allTime();
  };
  BoxModel.prototype.cards = function() {
    return this._master.cards();
  };
  BoxModel.prototype.introduction = function() {
    return this._master.introduction();
  };
  return BoxModel;
})();