var HomePlayerView = (function() {
  function HomePlayerView() {
    var _this = this;
    var properties = {
      playerLayer: {
        type: 'LPanel',
        data: 'frame06',
        width: 340,
        height: 60
      },
      labelName: {
        type: 'Label',
        properties: {
          text: PlayerManager.playerModel.name(),
          size: 24,
          x: 20,
          y: 18
        }
      },
      amountBackground: {
        type: 'LBitmap',
        data: 'amount_bg',
        properties: {
          x: 225,
          y: 17
        }
      },
      icon: {
        type: 'LBitmap',
        data: 'icon_cup',
        properties: {
          scaleX: 0.6,
          scaleY: 0.6,
          x: 190,
          y: 10
        }
      },
      cupLabel: {
        type: 'Label',
        properties: {
          text: PlayerManager.playerModel.cup(),
          size: 20,
          x: 250,
          y: 20
        }
      },
      settingButton: {
        type: 'CommonButton',
        onClick: '_onClickSetting',
        label: '',
        params: { img: 'frame06', icon: 'icon_setting', offsetX: -5 },
        properties: {
          x: 340
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  HomePlayerView.prototype.init = function() {
    var _this = this;
    _this.playerLayer.cacheAsBitmap(true);
  };
  HomePlayerView.prototype.updateView = function() {
    var _this = this;
    _this.cupLabel.text = PlayerManager.playerModel.cup();
  };
  HomePlayerView.prototype._onClickSetting = function(event) {
    var _this = this;
    var dialog = new SettingDialogController({ width: 400, height: 320, hideClose: true });
    dialogLayer.addChild(dialog);
  };
  return HomePlayerView;
})();