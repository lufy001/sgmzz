var StageDetailDialogController = (function() {
  function StageDetailDialogController(request) {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    var properties = {
      titleReward: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 200,
          y: 10,
          text: Localization.get('reward'),
          size: 38,
          textAlign: 'center'
        }
      },
      listViewReward: {
        type: 'LListView',
        parent: 'layer',
        properties: {
          maxPerLine: 4,
          cellWidth: 100,
          cellHeight: 150,
          arrangement: LListView.Direction.Horizontal,
          x: 40,
          y: 300
        }
      },
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 200,
          y: 10,
          text: Localization.get('Setting'),
          size: 38,
          textAlign: 'center'
        }
      },
      listView: {
        type: 'LListView',
        parent: 'layer',
        properties: {
          maxPerLine: 4,
          cellWidth: 100,
          cellHeight: 150,
          arrangement: LListView.Direction.Horizontal,
          x: 40,
          y: 300
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  StageDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.musicView.addEventListener('check:change', _this._onMusicChange, _this);
    _this.sfxView.addEventListener(LMouseEvent.MOUSE_UP, _this._onSfxChange, _this);
    var settingData = LPlugin.GetSetting();
    _this.musicView.updateView(!settingData.music_disable);
    _this.sfxView.updateView(!settingData.sfx_disable);
  };
  StageDetailDialogController.prototype._onMusicChange = function(event) {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    settingData.music_disable = !_this.musicView.value;
    LPlugin.SetSetting(settingData);
    if (SoundManager.currentBGM) {
      SoundManager.currentBGM.close();
    }
    if (settingData.music_disable) {
      return;
    }
    if (SoundManager.currentBGM) {
      SoundManager.currentBGM.play();
    } else {
      SoundManager.playBGM(SoundManager.currentBGMName);
    }
  };
  StageDetailDialogController.prototype._onSfxChange = function(event) {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    settingData.sfx_disable = !_this.sfxView.value;
    LPlugin.SetSetting(settingData);
  };
  StageDetailDialogController.prototype._onClickLanguage = function(event) {
    var _this = this;
    var dialog = new LanguageDialogController({ width: 360, height: 400 });
    dialogLayer.addChild(dialog);
  };
    
  return StageDetailDialogController;
})();