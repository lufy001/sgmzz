var LPlatform = (function() {
  function LPlatform() {
    this.sdk = FBInstant;
  }
  LPlatform.prototype.player = function() {
    return this.sdk.player;
  };
  LPlatform.prototype.initializeAsync = function() {
    return this.sdk.initializeAsync();
  };
  LPlatform.prototype.startGameAsync = function() {
    return this.sdk.startGameAsync();
  };
  LPlatform.prototype.setLoadingProgress = function(progress) {
    return this.sdk.setLoadingProgress(progress);
  };
  return new LPlatform();
})();