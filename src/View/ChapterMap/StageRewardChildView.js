var StageRewardChildView = (function() {
  function StageRewardChildView(type, data) {
    var _this = this;
    LExtends(_this, LListChildView, []);

    var properties = {
      background: {
        type: 'LBitmap',
        data: 'frame09'
      },
      gemIcon: {
        type: 'LBitmap',
        data: 'icon_gem',
        properties: {
          x: 5,
          y: 5,
          scaleX: 40 / 55,
          scaleY: 40 / 55
        }
      },
      boxIcon: {
        type: 'BoxIconView',
        properties: {
          x: 5,
          y: 5,
          scaleX: 0.4,
          scaleY: 0.4
        }
      }
      
    };
    LExtends(_this, BaseView, [properties]);
    _this.init(type, data);
  }
  StageRewardChildView.prototype.init = function(type, data) {
    var _this = this;
    _this.gemIcon.visible = false;
    _this.boxIcon.visible = false;
    if (type === 'gem') {
      _this.gemIcon.visible = true;
      return;
    }
    _this.boxIcon.visible = true;
    _this.boxIcon.labelLevel.size = 40;
    _this.boxIcon.labelLevel.y = 60;
    _this.boxIcon.addEventListener(LEvent.COMPLETE, _this._boxComplete, _this);
    _this.boxIcon.updateView(new BoxModel(data));
    
  };
  StageRewardChildView.prototype._boxComplete = function(event) {
    var _this = this;
    _this.cacheAsBitmap(false);
    _this.updateView();
    
  };
  return StageRewardChildView;
})();