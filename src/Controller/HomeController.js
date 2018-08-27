var HomeController = (function() {
  function HomeController(request) {
    var _this = this;
        
    var properties = {
      playerView: {
        type: 'HomePlayerView',
        properties: {
          x: 40,
          y: 40
        }
      },
      cupView: {
        type: 'HomeCupView',
        properties: {
          x: 40,
          y: 100
        }
      },
      btnRanking: {
        type: 'LButton',
        state: 'icon_ranking',
        onClick: '_openRanking',
        properties: {
          x: 310,
          y: 100
        }
      },
      btnNews: {
        type: 'LButton',
        state: 'icon_news',
        onClick: '_openNews',
        properties: {
          x: 375,
          y: 100
        }
      },
      btnSingleAttack: {
        type: 'CommonButton',
        label: 'Story',
        params: { img: 'btn_single_attack', size: 28, offsetX: 10, offsetY: -5 },
        onClick: '_gotoChapterMap',
        properties: {
          x: LGlobal.width * 0.5 - dataList['btn_single_attack'].width,
          y: (LGlobal.height - dataList['btn_single_attack'].height) * 0.5
        }
      },
      btnMultiAttack: {
        type: 'CommonButton',
        label: 'Battle',
        params: { img: 'btn_multi_attack', size: 28, offsetX: 10, offsetY: -5 },
        onClick: '_gotoGame',
        properties: {
          x: LGlobal.width * 0.5,
          y: (LGlobal.height - dataList['btn_multi_attack'].height) * 0.5
        }
      },
      boxLayer: {
        type: 'LSprite',
        properties: {
          x: LGlobal.width - 100,
          y: LGlobal.height - 220
        }
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    _this.init();
  }
  HomeController.prototype.onLoad = function(request) {
  };
  HomeController.prototype.init = function() {
    var _this = this;
    _this.cupView.updateView(0);

    _this._boxUpdateView();
        
    CommonEvent.addEventListener(CommonEvent.OPEN_BOX, _this._boxOpened, _this);
  };
  HomeController.prototype._openRanking = function(event) {
    var dialog = new RankingDialogController({ width: 440, height: 500 });
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._openNews = function(event) {
    var dialog = new NewsDialogController({ width: 400, height: 500 });
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._boxOpened = function(event) {
    var _this = this;
    _this._boxUpdateView();
    headerView.updateView();
  };
  HomeController.prototype._gotoChapterMap = function(event) {
    Common.changeScene('ChapterMapController');
  };
  HomeController.prototype._gotoGame = function(event) {
    var dialog = new MatchDialogController({ width: 400, height: 210, hideClose: true });
    dialogLayer.addChild(dialog);
    //Common.changeScene('GameController', { battleType: 'multi' });
  };
  HomeController.prototype._openBoxs = function(event) {
    var _this = this;
    var dialog = new HomeBoxsDialogController({ width: 460, height: 180, hideClose: true });
    dialogLayer.addChild(dialog);
  };
  HomeController.prototype._boxUpdateView = function(event) {
    var _this = this;
    _this.boxLayer.removeAllChild();
    var boxs = [];
    UserService.instance().playerModel.boxs().forEach(function(box) {
      if (box && box.status() === 'unlock') {
        boxs.push(box);
      }
    });
    if (boxs.length === 0) {
      return;
    } else if (boxs.length > 1) {
      boxs.sort(function(a, b) {
        return a.time() - b.time();
      });
    }
    var boxView = new HomeBoxView(boxs[0]);
    _this.boxLayer.addChild(boxView);
    boxView.addEventListener(LMouseEvent.MOUSE_UP, _this._openBoxs, _this);
  };
  return HomeController;
})();