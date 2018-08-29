var HeaderView = (function() {
  function HeaderView() {
    var _this = this;
    var properties = {
      levelBackground: {
        type: 'LBitmap',
        data: 'icon_level',
        properties: {
          x: 5,
          y: 2.5
        }
      },
      levelLabel: {
        type: 'Label',
        properties: {
          text: '11',
          size: 20,
          textAlign: 'center',
          x: 20,
          y: 6
        }
      },
      expProgress: {
        type: 'ProgressView',
        params: { progress: 0, sum: 2000, background: 'amount_bg', foreground: 'amount_front' },
        properties: {
          x: 35,
          y: 5
        }
      },
      gemView: {
        type: 'IconStatusView',
        params: { background: 'amount_bg', icon: 'icon_gem', iconSize: 32 },
        properties: {
          x: 330,
          y: 5
        }
      },
      coinView: {
        type: 'IconStatusView',
        params: { background: 'amount_bg', icon: 'icon_coin', iconSize: 32 },
        properties: {
          x: 190,
          y: 5
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.updateView();
  }
  HeaderView.prototype.updateView = function(data) {
    var _this = this;
    var playerModel = PlayerManager.playerModel;
    _this.expProgress.updateView({ progress: 9900, sum: 20000, fontSize: 14 });
    _this.gemView.updateView(playerModel.gem());
    _this.coinView.updateView(playerModel.coin());
  };
    
  return HeaderView;
})();