var EffectMasterModel = (function() {
  function EffectMasterModel(data) {
    var _this = this;
    _this.data = data;
  }
  EffectMasterModel.prototype.id = function() {
    return this.data.id;
  };
  EffectMasterModel.prototype.img = function() {
    return this.data.img;
  };
  EffectMasterModel.prototype.size = function() {
    return this.data.size;
  };
  EffectMasterModel.prototype.rows = function() {
    return this.data.rows;
  };
  EffectMasterModel.prototype.cols = function() {
    return this.data.cols;
  };
  EffectMasterModel.prototype.speed = function() {
    return this.data.speed;
  };
  EffectMasterModel.prototype.offset = function() {
    return this.data.offset;
  };
  EffectMasterModel.prototype.moveStep = function() {
    return this.data.moveStep;
  };
  EffectMasterModel.prototype.coordinate = function() {
    return this.data.coordinate;
  };
  EffectMasterModel.prototype.target = function() {
    return this.data.target;
  };
  EffectMasterModel.prototype.tween = function() {
    return this.data.tween;
  };
  EffectMasterModel.prototype.isAnime = function() {
    return this.data.rows > 1 || this.data.cols > 1;
  };
  EffectMasterModel.prototype.animationData = function() {
    return LGlobal.divideCoordinate(this.data.size.width, this.data.size.height, this.data.rows, this.data.cols);
  };
  return EffectMasterModel;
})();