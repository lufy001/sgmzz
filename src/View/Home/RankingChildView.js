var RankingChildView = (function() {
  function RankingChildView(model, iss) {
    var _this = this;
    var properties = {
      layer: {
        type: 'LPanel',
        data: iss ? 'frame04' : 'frame05',
        width: 390,
        height: 50
      },  
      rankLabel: {
        type: 'Label',
        properties: {
          text: model.rank(),
          x: 10,
          y: 10
        }
      },
      nameLabel: {
        type: 'Label',
        properties: {
          text: model.name(),
          x: 70,
          y: 10
        }
      },  
      cupIcon: {
        type: 'LBitmap',
        data: 'icon_cup',
        properties: {
          x: 260,
          y: 10,
          scaleX: 0.5,
          scaleY: 0.5
        }
      }, 
      scoreLabel: {
        type: 'Label',
        properties: {
          text: model.score(),
          x: 310,
          y: 10
        }
      }
    };
    LExtends(_this, LListChildView, []);
    LExtends(_this, BaseView, [properties]);
    _this.model = model;
  }
  RankingChildView.prototype.onClick = function(event) {
    var _this = this;
    var e = new LEvent(CommonEvent.SHOW_PLAYER_PROFILE);
    e.model = _this.model;
    CommonEvent.dispatchEvent(e);
  };
  return RankingChildView;
})();