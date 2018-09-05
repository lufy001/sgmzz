var FBInstant = (function() {
  function FBInstant() {
    var _this = this;
    _this._playerId = 'DEBUG000001';
    _this._playerName = 'DEBUG000001';
    if (window.setting.platform === 'debug') {
      var id = _this.getWebParameter('id');
      if (id) {
        _this._playerId = _this._playerName = id;
      }
    }
    console.log('_this._playerId', _this._playerId);
    _this.player = {
      getID: function() {
        return _this._playerId + '';
      },
      getName: function() {
        return _this._playerName;
      }
    };
    _this.context = {
      chooseAsync: function() {
        return Promise.resolve();
      }
    };
  }
  FBInstant.prototype.getWebParameter = function(key) {
    var str = location.search.split('?');
    if (str.length < 2) {
      return '';
    }
    var params = str[1].split('&');
    for (var i = 0; i < params.length; i++) {
      var keyVal = params[i].split('=');
      if (keyVal[0] === key && keyVal.length === 2) {
        return decodeURIComponent(keyVal[1]);
      }
    }
    return '';
  };
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
      this.loadingDisplay.setProgress(parseFloat(progress).toFixed(2));
    }
  };
  FBInstant.prototype.getDataAsync = function(key) {
    return Promise.resolve({});
  };
  FBInstant.prototype.setDataAsync = function(data) {
    return Promise.resolve();
  };
  FBInstant.prototype.setSessionData = function(data) {
    //
  };
  FBInstant.prototype.updateAsync = function(options) {
    return Promise.resolve();
  };

  return new FBInstant();
})();