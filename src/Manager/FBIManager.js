var FBIManager = (function() {
  function FBIManager() {
  }
  FBIManager.prototype.player = function() {
    return FBInstant.player;
  };
  FBIManager.prototype.initializeAsync = function() {
    return FBInstant.initializeAsync();
  };
  FBIManager.prototype.startGameAsync = function() {
    return FBInstant.startGameAsync();
  };
  FBIManager.prototype.setLoadingProgress = function(progress) {
    return FBInstant.setLoadingProgress(progress);
  };

  return new FBIManager();
})();