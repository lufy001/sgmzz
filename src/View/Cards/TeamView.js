var TeamView = (function() {
  function TeamView() {
    var _this = this;
    var properties = {
      background: {
        type: 'LPanel',
        data: 'team',
        width: 460,
        height: 260,
        x1: 230,
        x2: 240,
        y1: 110,
        y2: 120
      },
      title: {
        type: 'Label',
        properties: {
          text: 'Battle Deck',
          textAlign: 'center',
          size: 24,
          x: 230,
          y: 60
        }
      },
      cardLayer: {
        type: 'LSprite',
        properties: {
          x: 15,
          y: 105
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  TeamView.prototype.init = function() {
    var _this = this;
        
    _this._tweens = [];
    UserService.instance().playerModel.team().forEach(function(child) {
      var cardView = new CardView(child);
      cardView.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
      cardView._x = cardView.x = _this.cardLayer.numChildren * 110;
      _this.cardLayer.addChild(cardView);
    });
    _this.x = 10;
  };
  TeamView.prototype.updateView = function() {
    var _this = this;
    var team = UserService.instance().playerModel.team();
    for (var i = 0; i < team.length; i++) {
      var cardView = _this.cardLayer.childList[i];
      cardView.updateView(team[i]);
    }
  };
  TeamView.prototype.run = function() {
    var _this = this;
    _this.cardLayer.childList.forEach(function(child) {
      var x = child.x;
      var y = child.y;
      var tween = LTweenLite.to(child, 0.1, { loop: true, x: x + 2, y: y })
        .to(child, 0.1, { x: x - 2, y: y - 2 })
        .to(child, 0.1, { x: x - 2, y: y + 2 })
        .to(child, 0.1, { x: x, y: y });
      _this._tweens.push(tween);
    });
  };  
  TeamView.prototype.stop = function() {
    var _this = this;
    _this._tweens.forEach(function(tween) {
      LTweenLite.remove(tween);
    });
    _this.cardLayer.childList.forEach(function(child) {
      child.x = child._x;
      child.y = 0;
    });
    _this._tweens.length = 0;
  };
  TeamView.prototype._onClick = function(event) {
    var _this = this;
    var e;
    var card = event.currentTarget;
    if (_this._tweens.length === 0) {
      e = new LEvent(CommonEvent.CARD_CLICK);
      e.isTeamCard = true;
      e.x = _this.x + _this.cardLayer.x + card.x;
      e.y = _this.y + _this.cardLayer.y + card.y + 120;
    } else {
      e = new LEvent(CommonEvent.CARD_USE);
    }
    e.model = card.characterModel;
    CommonEvent.dispatchEvent(e);
  };
  return TeamView;
})();