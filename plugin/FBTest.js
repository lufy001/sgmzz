var FBInstant = (function() {
  function FBInstant() {
    this._rand = Math.random();
    this.player = {
      getID: function() {
        return '000_' + this._rand;
      },
      getName: function() {
        return '000_' + this._rand;
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