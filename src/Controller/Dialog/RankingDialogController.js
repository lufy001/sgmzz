var RankingDialogController = (function() {
  function RankingDialogController(request) {
    var _this = this;
    var properties = {
      titleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: 'Ranking',
          size: 26,
          textAlign: 'center',
          x: request.width * 0.5,
          y: 10
        }
      },
      listView: {
        type: 'LListView',
        width: request.width - 40,
        height: request.height - 70,
        parent: 'layer',
        properties: {
          maxPerLine: 1,
          cellWidth: request.width - 40,
          cellHeight: 50,
          arrangement: LListView.Direction.Horizontal,
          x: 20,
          y: 50
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  RankingDialogController.prototype.onLoad = function(request) {
    var _this = this;
    RankingService.instance().getList()
      .then(function(response) {
        _this._showListView(response.players());
      });
        
    CommonEvent.addEventListener(CommonEvent.SHOW_PLAYER_PROFILE, _this._showProfile, _this);
  };
  RankingDialogController.prototype.die = function() {
    CommonEvent.removeEventListener(CommonEvent.SHOW_PLAYER_PROFILE, this._showMessage, this);
  };
  RankingDialogController.prototype._showProfile = function(event) {
    var _this = this;
    //var dialog = new ProfileDialogController({ width: 460, height: 560, model: event.model });
    var dialog = new ProfileDialogController({ width: 460, height: 560 });
    dialogLayer.addChild(dialog);
  };
  RankingDialogController.prototype._showListView = function(players) {
    var _this = this;
    var items = [];
    var contentX = 0;
    var contentY = 20;
    for (var index = 0; index < players.length; index++) {
      var child = new RankingChildView(players[index], index % 2 === 0);
      items.push(child);
    }
    _this.listView.updateList(items);
  };
  return RankingDialogController;
})();