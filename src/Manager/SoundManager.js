var SoundManager = (function() {
  function SoundManager() {
    var _this = this;
    _this.list = {};
    _this._waitingBGM = null;
    _this.currentBGM = null;
    LGlobal.ll_touchStartEvent_old = LGlobal.ll_touchStartEvent;
    LGlobal.ll_touchStartEvent = function(event, eveIndex, canvasX, canvasY) {
      _this._playWaitingBGM();
      LGlobal.ll_touchStartEvent_old(event, eveIndex, canvasX, canvasY);
    };
  }
  SoundManager.prototype.musicEnable = function() {
    var settingData = LPlugin.GetData('setting_data', {});
    return !settingData.music_disable;
  };
  SoundManager.prototype.sfxEnable = function() {
    var settingData = LPlugin.GetData('setting_data', {});
    return !settingData.sfx_disable;
  };
  SoundManager.prototype.playSE = function(name) {
    var _this = this;
    if (!_this.sfxEnable()) {
      return;
    }
    if (_this.list[name]) {
      _this.list[name].play();
      return;
    }
    _this.load(name, 'wav')
      .then(function(sound) {
        _this.list[name] = sound;
        sound.play();
      });
  };
  SoundManager.prototype.playBGM = function(name) {
    var _this = this;
    _this.currentBGMName = name;
    if (!LSound.webAudioEnabled) {
      return;
    }
    if (_this.currentBGM) {
      if (_this.currentBGM.name === name) {
        return;
      } else {
        _this.currentBGM.stop();
        _this.currentBGM = null;
      }
    }
    if (_this.list[name]) {
      if (!_this.musicEnable()) {
        return;
      }
      _this.list[name].play();
      return;
    }
    var needWait = !window.dataList[name];
    _this.load(name, 'mp3')
      .then(function(sound) {
        _this.list[name] = sound;
        _this.currentBGM = sound;
        _this._waitingBGM = needWait ? sound : null;
        if (!_this.musicEnable()) {
          return;
        }
        sound.play(0, Number.MAX_VALUE);
      });
  };
  SoundManager.prototype._playWaitingBGM = function() {
    var _this = this;
    if (!_this._waitingBGM) {
      return;
    }
    if (_this.currentBGM) {
      if (_this._waitingBGM.name === _this.currentBGM.name && _this._waitingBGM.getCurrentTime() > 0) {
        return;
      }
      _this.currentBGM.close();
    }
    if (!_this.musicEnable()) {
      return;
    }
    _this._waitingBGM.play(0, Number.MAX_VALUE);
    _this._waitingBGM = null;
  };
  SoundManager.prototype.load = function(name, extension) {
    var _this = this;
    var sound = new LSound();
    sound.name = name;
    if (window.dataList[name]) {
      sound.load(window.dataList[name]);
      return Promise.resolve(sound);
    } else {
      return new Promise(function(resolve, reject) {
        var url = 'resources/sound/' + name + '.' + extension;
        sound.addEventListener(LEvent.COMPLETE, function(event) {
          resolve(sound);
        });
        sound.load(url);
      });
    }
  };
    
  return new SoundManager();
})();