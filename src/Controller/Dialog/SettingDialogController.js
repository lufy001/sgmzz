var SettingDialogController = (function() {
  function SettingDialogController(request) {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    var properties = {
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
      musicView: {
        type: 'CheckboxView',
        parent: 'layer',
        params: { icon: 'icon_bgm', iconX: -60, iconY: -15 },
        properties: {
          x: 150,
          y: 80
        }
      },
      sfxView: {
        type: 'CheckboxView',
        parent: 'layer',
        params: { icon: 'icon_sfx', iconX: -60, iconY: -20 },
        properties: {
          x: 150,
          y: 150
        }
      },
      languageIcon: {
        type: 'LBitmap',
        parent: 'layer',
        data: 'icon_language',
        properties: {
          x: 80,
          y: 220
        }
      },
      languageButton: {
        type: 'CommonButton',
        onClick: '_onClickLanguage',
        label: Localization.get(settingData.language),
        parent: 'layer',
        params: { img: 'btn03' },
        properties: {
          x: 150,
          y: 220
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  SettingDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.musicView.addEventListener('check:change', _this._onMusicChange, _this);
    _this.sfxView.addEventListener(LMouseEvent.MOUSE_UP, _this._onSfxChange, _this);
    var settingData = LPlugin.GetSetting();
    _this.musicView.updateView(!settingData.music_disable);
    _this.sfxView.updateView(!settingData.sfx_disable);
  };
  SettingDialogController.prototype._onMusicChange = function(event) {
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
  SettingDialogController.prototype._onSfxChange = function(event) {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    settingData.sfx_disable = !_this.sfxView.value;
    LPlugin.SetSetting(settingData);
  };
  SettingDialogController.prototype._onClickLanguage = function(event) {
    var _this = this;
    var dialog = new LanguageDialogController({ width: 360, height: 400 });
    dialogLayer.addChild(dialog);
  };
    
  return SettingDialogController;
})();