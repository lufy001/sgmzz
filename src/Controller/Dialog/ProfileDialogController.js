var ProfileDialogController = (function() {
  function ProfileDialogController(request) {
    var _this = this;
    var properties = {
      titleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: request.model.name(),
          size: 26,
          textAlign: 'center',
          x: request.width * 0.5,
          y: 10
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  ProfileDialogController.prototype.onLoad = function(request) {
    var _this = this;
        
  };
    
  ProfileDialogController.prototype._showProfile = function(event) {
    var _this = this;
        
  };
  ProfileDialogController.prototype._showListView = function(players) {
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
  return ProfileDialogController;
})();