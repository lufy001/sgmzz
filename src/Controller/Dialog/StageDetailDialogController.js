var StageDetailDialogController = (function() {
  function StageDetailDialogController(request) {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    var properties = {
      titleReward: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 20,
          y: 20,
          text: Localization.get('possible rewards'),
          size: 25,
          //textAlign: 'center'
        }
      },
      listViewReward: {
        type: 'LListView',
        parent: 'layer',
        width: 360,
        height: 100,
        properties: {
          maxPerLine: 5,
          cellWidth: 50,
          cellHeight: 50,
          arrangement: LListView.Direction.Horizontal, 
          x: 20,
          y: 60
        }
      },
      enemyTitle: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 20,
          y: 175,
          text: Localization.get('enemys'),
          size: 25,
          //textAlign: 'center'
        }
      },
      enemyListView_0: {
        type: 'LListView',
        parent: 'layer',
        width: 300,
        height: 118,
        properties: {
          maxPerLine: 3,
          cellWidth: 100,
          cellHeight: 118,
          arrangement: LListView.Direction.Horizontal, 
          x: 20,
          y: 210
        }
      },
      enemyListView_1: {
        type: 'LListView',
        parent: 'layer',
        width: 300,
        height: 118,
        properties: {
          maxPerLine: 3,
          cellWidth: 100,
          cellHeight: 118,
          arrangement: LListView.Direction.Horizontal, 
          x: 20,
          y: 328
        }
      },
      enemyListView_2: {
        type: 'LListView',
        parent: 'layer',
        width: 300,
        height: 118,
        properties: {
          maxPerLine: 3,
          cellWidth: 100,
          cellHeight: 118,
          arrangement: LListView.Direction.Horizontal, 
          x: 20,
          y: 446
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  StageDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.mobel = request.model;
    _this._setRewards(request.isClear);
    _this._setEnemys();
  };
  StageDetailDialogController.prototype._setRewards = function(isClear) {
    var _this = this;
    var child;
    var boxIds = _this.mobel.boxIds();
    var items = [];
    if (!isClear) {
      child = new StageRewardChildView('gem');
      items.push(child);
    }
    for (var i = 0; i < boxIds.length; i++) {
      child = new StageRewardChildView('box', { boxId: boxIds[i], lv: _this.mobel.boxLv() });
      items.push(child);
    }
    _this.listViewReward.updateList(items);
  };
  StageDetailDialogController.prototype._setEnemys = function() {
    var _this = this;
    var enemys = _this.mobel.enemys();
    for (var i = 0; i < enemys.length; i++) {
      _this._setRowEnemys(i, enemys[i]);
    }
  };
  StageDetailDialogController.prototype._setRowEnemys = function(index, childEnemys) {
    var _this = this;
    var items = [];
    for (var i = 0; i < childEnemys.length; i++) {
      var child = new StageCardChildView(childEnemys[i]);
      items.push(child);
    }
    _this['enemyListView_' + index].updateList(items);
  };
    
  return StageDetailDialogController;
})();