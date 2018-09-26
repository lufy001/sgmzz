var BattleCountDownView = (function() {
  function BattleCountDownView() {
    var _this = this;
    var properties = {
      timeLabel: {
        type: 'Label',
        properties: {
          textAlign: 'center',
          text: '5',
          size: 100,
          x: 320,
          y: 400
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  BattleCountDownView.prototype.init = function() {
    var _this = this;
    var background = Common.getTranslucentMask(640, 960);
    _this.addChildAt(background, 0);
  };
  BattleCountDownView.prototype.updateView = function() {
    var _this = this;
    _this.visible = true;
    _this.addEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
  };
  BattleCountDownView.prototype._onframe = function(event) {
    var _this = this;
    var times = GameManager.endTime - BaseService.getTime() - BATTLE_TOTAL_TIME;
    console.log('times', times, BaseService.getTime());
    if (times < 0) {
      _this.visible = false;
      _this.removeEventListener(LEvent.ENTER_FRAME, _this._onframe, _this);
      return;
    }
    times = times * 0.001 >> 0;
    _this.timeLabel.text = times;
  };
  
  return BattleCountDownView;
})();