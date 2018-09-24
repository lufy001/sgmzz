var CardsController = (function() {
  function CardsController(request) {
    var _this = this;
    var properties = {
      layer: {
        type: 'LSprite'
      },
      teamView: {
        type: 'PlayerTeamView',
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
  CardsController.prototype.onLoad = function(request) {
    var _this = this;
    _this.teamView.updateView(PlayerManager.playerModel.team());
    _this._oldTeams = JSON.stringify(PlayerManager.playerModel.teams());
    _this._oldTeamIndex = PlayerManager.playerModel.teamIndex();
  };
  CardsController.prototype.onClose = function() {
    var _this = this;
    var teamIndex = PlayerManager.playerModel.teamIndex();
    var teams = PlayerManager.playerModel.teams();
    if (JSON.stringify(teams) === _this._oldTeams && _this._oldTeamIndex === teamIndex) {
      return;
    }
    console.error(teams);
    UserService.instance().setTeams(teams, teamIndex);
  };
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
    CommonEvent.addEventListener(CommonEvent.OPEN_BOX, _this._cardListUpdate, _this);
        
    CommonEvent.dispatchEvent(CommonEvent.CARD_LIST_UPDATE);
  };
  CardsController.prototype._cardListUpdate = function(event) {
    var _this = this;
    var team = PlayerManager.playerModel.teamData();
    var itemList = _this.listView.getItems();
    if (itemList.length > 0) {
      for (var i = 0; i < itemList.length; i++) {
        itemList[i].updateView();
      }
    }
    
    var items = [];
    CharacterManager.masterArray.sort(function(a, b) {
      var aHas = !!PlayerManager.playerModel.getCharacter(a.id());
      var bHas = !!PlayerManager.playerModel.getCharacter(b.id());
      if (aHas ^ bHas) {
        return aHas ? -1 : 1;
      }
      return a.id() - b.id();
    });
    CharacterManager.masterArray
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
    var maxY = LGlobal.height - 170;
    _this._selectModel = event.model;
    if (event.isTeamCard || event.y <= maxY) {
      _this.cardButtonsView.show(event.x, event.y, event.isTeamCard);
      return;
    }
    var dragEffect = _this.listView.dragEffect;
    _this.listView.dragEffect = LListView.DragEffects.None;
    LTweenLite.to(_this.listView.clipping, 0.1, { y: _this.listView.clipping.y + event.y - maxY, 
      onComplete: function() {
        _this.listView.dragEffect = dragEffect;
        _this.cardButtonsView.show(event.x, maxY, event.isTeamCard);
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
    _this.teamView.updateView(PlayerManager.playerModel.team());
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
    var model = PlayerManager.playerModel.getCharacter(_this._selectModel.id());
    var dialog = new CardDetailDialogController({ width: 440, height: 560, model: model });
    dialogLayer.addChild(dialog);
    
  };
  return CardsController;
})();