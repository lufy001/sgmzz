var CardsController = (function() {
  function CardsController(request) {
    var _this = this;
    var properties = {
      layer: {
        type: 'LSprite'
      },
      teamView: {
        type: 'TeamView',
        parent: 'layer',
        properties: {
          y: 40
        }
      },
      listView: {
        type: 'LListView',
        parent: 'layer',
        properties: {
          maxPerLine: 4,
          cellWidth: 100,
          cellHeight: 150,
          arrangement: LListView.Direction.Horizontal,
          x: 40,
          y: 300
        }
      },
      selectCardView: {
        type: 'SelectCardView',
        parent: 'layer',
        properties: {
          visible: false,
          y: 300
        }
      },
      cardButtonsView: {
        type: 'CardButtonsView'
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    _this.init();
  }
  CardsController.prototype.init = function() {
    var _this = this;
        
    _this.listView.resize(400, LGlobal.height - _this.listView.y);

    _this.cardButtonsView.hide();

    CommonEvent.addEventListener(CommonEvent.CARD_CLICK, _this._cardClick, _this);
    CommonEvent.addEventListener(CommonEvent.CARD_USE_CLICK, _this._cardUseClick, _this);
    CommonEvent.addEventListener(CommonEvent.CARD_DETAIL_CLICK, _this._cardDetailClick, _this);
    CommonEvent.addEventListener(CommonEvent.CARD_USE_CANCEL, _this._cardUseCancel, _this);
    CommonEvent.addEventListener(CommonEvent.CARD_USE, _this._cardUse, _this);
    CommonEvent.addEventListener(CommonEvent.CARD_LIST_UPDATE, _this._cardListUpdate, _this);
        
    CommonEvent.dispatchEvent(CommonEvent.CARD_LIST_UPDATE);
  };
  CardsController.prototype._cardListUpdate = function(event) {
    var _this = this;
    var team = PlayerManager.playerModel.teamData();
    var items = [];
    PlayerManager.playerModel.characters()
      .forEach(function(model) {
        var index = team.indexOf(model.id());
        if (index >= 0) {
          return;
        }
        var cardView = new CardChildView(model);
        items.push(cardView);
      });
    items.push(new CardChildView({}), new CardChildView({}), new CardChildView({}), new CardChildView({}));
    _this.listView.updateList(items);
  };
  CardsController.prototype._cardClick = function(event) {
    var _this = this;
    _this._selectModel = event.model;
    if (event.isTeamCard || event.y <= LGlobal.height - 150) {
      _this.cardButtonsView.show(event.x, event.y, event.isTeamCard);
      return;
    }
    var dragEffect = _this.listView.dragEffect;
    _this.listView.dragEffect = LListView.DragEffects.None;
    LTweenLite.to(_this.listView.clipping, 0.1, { y: _this.listView.clipping.y + event.y - (LGlobal.height - 150), 
      onComplete: function() {
        _this.listView.dragEffect = dragEffect;
        _this.cardButtonsView.show(event.x, event.y, event.isTeamCard);
      } });
  };
  CardsController.prototype._cardUse = function(event) {
    var _this = this;
    _this.teamView.stop();
    _this.selectCardView.visible = false;
    var changeModel = event.model;
    var team = PlayerManager.playerModel.teamData();
    var index = team.indexOf(changeModel.id());
    team[index] = _this._selectModel.id();
    PlayerManager.playerModel.team(team);
    _this.teamView.updateView();
    _this.listView.visible = true;
    CommonEvent.dispatchEvent(CommonEvent.CARD_LIST_UPDATE);
  };
  CardsController.prototype._cardUseClick = function(event) {
    var _this = this;
    _this.teamView.run();
    _this.listView.visible = false;
    _this.selectCardView.show(_this._selectModel);
  };
  CardsController.prototype._cardUseCancel = function(event) {
    var _this = this;
    _this.listView.visible = true;
    _this.teamView.stop();
  };
  CardsController.prototype._cardDetailClick = function(event) {
    var _this = this;
    var dialog = new CardDetailDialogController({ width: 440, height: 560, model: _this._selectModel });
    dialogLayer.addChild(dialog);
    
  };
  return CardsController;
})();