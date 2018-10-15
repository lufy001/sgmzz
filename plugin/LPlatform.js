var LPlatform = (function() {
  function LPlatform() {
    this.sdk = FBInstant;
    this._fbSessionData = {};
    this._updateContexts = {};
  }
  LPlatform.prototype.player = function() {
    return this.sdk.player;
  };
  LPlatform.prototype.currentContextID = function() {
    return this._currentContextID;
  };
  LPlatform.prototype.initializeAsync = function() {
    return this.sdk.initializeAsync();
  };
  LPlatform.prototype.startGameAsync = function() {
    return this.sdk.startGameAsync();
  };
  LPlatform.prototype.setLoadingProgress = function(progress) {
    return this.sdk.setLoadingProgress(parseFloat(progress).toFixed(2));
  };
  LPlatform.prototype.getDataAsync = function(key) {
    return this.player().getDataAsync([key])
      .then(function(data) {
        return Promise.resolve(data[key]);
      });
  };
  LPlatform.prototype.setDataAsync = function(key, value) {
    var data = {};
    data[key] + value;
    return this.player().setDataAsync(data);
  };
  LPlatform.prototype.setSessionData = function(key, value) {
    this._fbSessionData[key] = value;
    return this.sdk.setSessionData(this._fbSessionData);
  };
  LPlatform.prototype.choose = function(force) {
    var _this = this;
    return _this.sdk.context.chooseAsync()
      .then(function() {
        _this._currentContextID = _this.sdk.context.getID();
      })
      .catch(function() {
        if (force && !_this._currentContextID) {
          _this.choose(true);
        }
      });
  };
  LPlatform.prototype.updateAsync = function(options) {
    var _this = this;
    if (!_this._currentContextID || _this._updateContexts[_this._currentContextID]) {
      return;
    }
    _this._updateContexts[_this._currentContextID] = true;
    return _this.sdk.updateAsync();
  };
  LPlatform.prototype.isSupported = function(key) {
    return !!_this.sdk[key];
  };
  LPlatform.prototype.showVideoAsync = function(placementId) {
    var _this = this;
    return _this.loadRewardedVideoAsync(placementId)
      .then(function() {
        return _this._ad.showAsync();
      });
  };
  LPlatform.prototype.loadRewardedVideoAsync = function(placementId, show) {
    var _this = this;
    _this._adPromise = _this._adPromise || _this.sdk.getRewardedVideoAsync(placementId)
      .then(function(rewardedVideo) {
        _this._ad = rewardedVideo;
        return _this._ad.loadAsync();
      });
    return _this._adPromise;
  };
  return new LPlatform();
})();