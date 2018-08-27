var FBInstant = (function() {
  function FBInstant() {
    this._randId = 10000000 * Math.random() >>> 0;
    this.player = {
      getID: function() {
        return this._randId;
      },
      getName: function() {
        return this._randId + 'abc';
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