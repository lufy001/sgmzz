var TeamView = (function() {
  function TeamView(properties) {
    var _this = this;
    var baseProperties = {
      background: {
        type: 'LSprite'
      },
      title: {
        type: 'Label',
        properties: {
          text: Localization.get('Battle Deck'),
          textAlign: 'center',
          size: 24,
          x: 230
        }
      },
      cardLayer: {
        type: 'LSprite',
        properties: {
          x: 15,
          y: 40
        }
      }
    };
    for (var key in properties) {
      baseProperties[key] = properties[key];
    }
    LExtends(_this, BaseView, [baseProperties]);
  }
  TeamView.prototype._cardInit = function(team) {
    var _this = this;
    team.forEach(function(child) {
      var cardView = new CardView(child);
      cardView.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
      cardView._x = cardView.x = _this.cardLayer.numChildren * 110;
      _this.cardLayer.addChild(cardView);
    });
  };
  TeamView.prototype.updateView = function(team) {
    var _this = this;
    if (_this.cardLayer.numChildren === 0) {
      _this._cardInit(team);
    } else {
      for (var i = 0; i < team.length; i++) {
        var cardView = _this.cardLayer.childList[i];
        cardView.updateView(team[i]);
      }
    }
  };
  
  return TeamView;
})();