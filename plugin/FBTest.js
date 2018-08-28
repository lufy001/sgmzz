var FBInstant = (function() {
  function FBInstant() {
    var _this = this;
    _this._randId = Math.random() > 0.5 ? 100 : 50;
    console.error('id: ', this._randId);
    _this.player = {
      getID: function() {
        return _this._randId + '';
      },
      getName: function() {
        return _this._randId + 'abc';
      }
    };
  }
  FBInstant.prototype.setLoadingDisplay = function(value) {
    this.loadingDisplay = value;
  };
  FBInstant.prototype.initializeAsync = function() {
    return Promise.resolve();
  };
  FBInstant.prototype.startGameAsync = function() {
    return Promise.resolve();
  };
  FBInstant.prototype.setLoadingProgress = function(progress) {
    if (this.loadingDisplay) {
      this.loadingDisplay.setProgress(progress);
    }
  };

  return new FBInstant();
})();