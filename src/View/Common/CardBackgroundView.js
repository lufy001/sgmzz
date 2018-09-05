var CardBackgroundView = (function() {
  function CardBackgroundView(rarity) {
    var _this = this;
    var properties = {
      background: {
        type: 'LBitmap'
      },
      rarityBitmap: {
        type: 'LBitmap'
      }
    };
    LExtends(_this, BaseView, [properties]);
    if (rarity) {
      _this.updateView(rarity);
    }
  }
  CardBackgroundView.prototype.updateView = function(rarity, isHidden) {
    var _this = this;
    var bgKey = rarity === 'ssr' ? 'card_background_r' : 'card_background';
    _this.background.bitmapData = new LBitmapData(dataList[bgKey]);
    if (isHidden) {
      _this.background.alpha = 0;
      _this.rarityBitmap.visible = false;
      return;
    } else {
      _this.background.alpha = 1;
      _this.rarityBitmap.visible = true;
    }
    _this.rarityBitmap.bitmapData = new LBitmapData(dataList['card_' + rarity]);
  };
  return CardBackgroundView;
})();