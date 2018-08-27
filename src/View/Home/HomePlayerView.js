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
        parent: 'playerLayer',
        properties: {
          text: 'lufy',
          size: 24,
          x: 20,
          y: 18
        }
      },
      amountBackground: {
        type: 'LBitmap',
        data: 'amount_bg',
        parent: 'playerLayer',
        properties: {
          x: 225,
          y: 17
        }
      },
      icon: {
        type: 'LBitmap',
        data: 'icon_cup',
        parent: 'playerLayer',
        properties: {
          scaleX: 0.6,
          scaleY: 0.6,
          x: 190,
          y: 10
        }
      },
      cupLabel: {
        type: 'Label',
        parent: 'playerLayer',
        properties: {
          text: '4233',
          size: 20,
          x: 250,
          y: 20
        }
      },
      settingButton: {
        type: 'CommonButton',
        onClick: '_onClickSetting',
        label: '',
        params: { img: 'frame06', icon: 'icon_setting' },
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
        
    LGlobal.destroy = false;
    _this.playerLayer.remove();
    LGlobal.destroy = true;
    _this.playerLayer.cacheAsBitmap(true);
    var btnPlayer = new LButton(_this.playerLayer);
    _this.addChild(btnPlayer);
  };
  HomePlayerView.prototype._onClickSetting = function(event) {
    var _this = this;
    var dialog = new SettingDialogController({ width: 400, height: 180, hideClose: true });
    dialogLayer.addChild(dialog);
  };
  HomePlayerView.prototype.updateView = function(value) {
    var _this = this;
        
  };
  return HomePlayerView;
})();