var ContentsGetDialogController = (function() {
  function ContentsGetDialogController(request) {
    var _this = this;
    var properties = {
      staticLayer: {
        type: 'LSprite',
        properties: {
          x: 20,
          y: 20
        }
      }
    };
    var contentX = 180;
    var contentY = 0;
    if (request.contents.gem() > 0) {
      properties.gemIcon = {
        type: 'LBitmap',
        data: 'icon_gem',
        parent: 'staticLayer',
        properties: {
          x: contentX,
          y: contentY
        }
      };
      properties.gemLabel = {
        type: 'Label',
        parent: 'staticLayer',
        properties: {
          x: contentX + 80,
          y: contentY + 10,
          text: request.contents.gem(),
          size: 30
        }
      };
      contentY += 50;
    }
    if (request.contents.coin() > 0) {
      properties.coinIcon = {
        type: 'LBitmap',
        data: 'icon_coin',
        parent: 'staticLayer',
        properties: {
          x: contentX,
          y: contentY
        }
      };
      properties.coinLabel = {
        type: 'Label',
        parent: 'staticLayer',
        properties: {
          x: contentX + 80,
          y: contentY + 10,
          text: request.contents.coin(),
          size: 30
        }
      };
    }
    LExtends(_this, DialogController, [request, properties]);
  }
  ContentsGetDialogController.prototype.onLoad = function(request) {
    var _this = this;
    var cards = request.contents.cards();
    _this.layer.getChildAt(0).visible = false;
    var contentX = 0;
    var contentY = _this.staticLayer.getHeight() + 20;
    
    for (var i = 0, index = 0; index < cards.length; i++) {
      for (var j = 0; j < 4; j++) {
        index = i * 4 + j;
        if (index >= cards.length) {
          break;
        }
        var card = _this._addCard(cards[index]);
        card.x = contentX + j * 110;
        card.y = contentY + i * 180;
      }
    }
        
  };
  ContentsGetDialogController.prototype._addCard = function(data) {
    var _this = this;
    var model = PlayerManager.playerModel.characters()
      .find(function(child) {
        return child.id() === data.id;
      });
    if (!model) {
      //TODO:
    }
    var contentCardView = new ContentCardView(model, data);
    _this.staticLayer.addChild(contentCardView);
    return contentCardView;
  };
  return ContentsGetDialogController;
})();