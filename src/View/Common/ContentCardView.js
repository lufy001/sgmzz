var ContentCardView = (function() {
  function ContentCardView(model, data) {
    var _this = this;
    var properties = {
      layer: {
        type: 'LSprite'
      },
      background: {
        type: 'CardBackgroundView',
        parent: 'layer'
      },
      nameLabel: {
        type: 'Label',
        properties: {
          text: model.name ? model.name() : '',
          size: 12,
          color: '#F5DEB3',
          textAlign: 'center',
          x: 50,
          y: 75
        }
      },
      amountLabel: {
        type: 'Label',
        properties: {
          text: 'x' + data.amount,
          size: 16,
          textAlign: 'center',
          x: 50,
          y: 90
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.updateView(model);
  }
  ContentCardView.prototype._updateBackground = function() {
    var _this = this;
    var model = _this.characterModel;
    var rarity = model.rarity && model.rarity() ? model.rarity() : 'c';
    _this.background.updateView(rarity, !model.id);
  };
  ContentCardView.prototype.load = function() {
    var _this = this;
    if (!_this.characterModel.id) {
      return;
    }
    dataList.character = dataList.character || {};
    if (dataList.character[_this.characterModel.id()]) {
      _this.init(dataList.character[_this.characterModel.id()]);
      return;
    }
    var imgs = [
      { name: 'character', path: 'resources/images/characters/' + _this.characterModel.id() + '.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.character[_this.characterModel.id()] = data;
      _this.init(data);
    });
  };
  ContentCardView.prototype.init = function(data) {
    var _this = this;
    if (_this.anime) {
      _this.anime.remove();
    }
    var bitmapData = new LBitmapData(data['character']);
    _this.anime = new LAnimationTimeline(bitmapData, CharacterManager.getAnimationData());
    _this.anime.x = 18;
    _this.anime.y = 12;
    CharacterManager.setAnimationLabel(_this.anime);
    _this.layer.addChild(_this.anime);
    var label = CharacterAction.STAND + '-' + CharacterDirection.DOWN;
    _this.anime.gotoAndPlay(label);
        
    setTimeout(function() {
      _this.dispatchEvent(LEvent.COMPLETE);
    });
  };
  ContentCardView.prototype.updateView = function(model) {
    var _this = this;
    _this.characterModel = model;
    _this._updateBackground();
    if (_this.characterModel.id) {
      _this.load();
    } else {
      _this.amountProgress.visible = false;
      _this.levelLabel.visible = false;
    }
  };
  return ContentCardView;
})();