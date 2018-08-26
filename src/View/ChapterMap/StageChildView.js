var StageChildView = (function() {
  function StageChildView(model, chapterId, stageId) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    var properties = {
      background: {
        type: 'LPanel',
        data: 'stage-background',
        width: 400,
        height: 126
      },
      indexLabel: {
        type: 'Label',
        properties: {
          text: 'story ' + (chapterId - 99) + ' - ' + model.id() % 1000,
          textAlign: 'center',
          size: 30,
          x: 100,
          y: 10
        }
      },
      titleLabel: {
        type: 'Label',
        properties: {
          text: model.title(),
          size: 30,
          x: 100,
          y: 50
        }
      },
      card: {
        type: 'CardBackgroundView',
        properties: {
          scaleX: 0.6,
          scaleY: 0.6,
          x: 20,
          y: 40
        }
      },
      levelLabel: {
        type: 'Label',
        properties: {
          text: '',
          textAlign: 'center',
          size: 20,
          x: 50,
          y: 80
        }
      },
      markIcon: {
        type: 'LBitmap',
        data: model.id() > stageId ? 'icon_exclamation' : 'icon_ok'
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.model = model;
    _this.chapterId = chapterId;
    _this.init();
  }
  StageChildView.prototype.init = function() {
    var _this = this;
    var raritys = [];
    var maxLevel = 0;
    var rarity;
    _this.model.enemys().forEach(function(child) {
      child.forEach(function(enemyModel) {
        raritys.push(enemyModel.rarity());
        maxLevel = enemyModel.level() > maxLevel ? enemyModel.level() : maxLevel;
      });
    });
    rarity = raritys.find(function(child) {
      return child === 'ssr';
    });
    rarity = rarity || raritys.find(function(child) {
      return child === 'sr';
    });
    rarity = rarity || raritys.find(function(child) {
      return child === 'r';
    });
    rarity = rarity || 'c';
    _this.card.updateView(rarity);
    _this.levelLabel.text = 'Lv' + maxLevel;
  };
  StageChildView.prototype.onClick = function(event) {
    var _this = event.target;
    var listView = event.currentTarget;
    var e = new LEvent('stageClick');
    e.model = _this.model;
    listView.dispatchEvent(e);
  };
  return StageChildView;
})();