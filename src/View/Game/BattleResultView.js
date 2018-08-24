var BattleResultView = (function() {
  function BattleResultView() {
    var _this = this;
    var properties = {
      testLabel: {
        type: 'Label',
        properties: {
          textAlign: 'center',
          text: 'Game Win',
          size: 30,
          x: LGlobal.width * 0.5,
          y: 10
        }
      },
      coinLabel: {
        type: 'Label',
        properties: {
          textAlign: 'center',
          text: '0',
          size: 30,
          x: LGlobal.width * 0.5,
          y: 210
        }
      },
      /*effectLayer:{
                type:"LSprite",
              properties:{
                  x:LGlobal.width * 0.5,
                    y:LGlobal.height * 0.5
                }
            },
            winEffect:{
                type:"LBitmap",
                data:"win_effect",
                parent:"effectLayer",
              properties:{
                  x:-dataList["win_effect"].width * 0.5,
                  y:-dataList["win_effect"].height * 0.5
                }
            }*/
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  BattleResultView.prototype.updateView = function() {

  };
  BattleResultView.prototype.init = function() {
    var _this = this;
    var maskBackground = Common.getTranslucentMask();
    _this.addChildAt(maskBackground, 0);
        
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
    //CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    //CommonEvent.addEventListener(CommonEvent.GAME_CONTINUE, _this._onGameContinue, _this);
  };
  BattleResultView.prototype._onClick = function(event) {
    var _this = this;
    _this.visible = false;
    Common.changeScene('HomeController', { selectChapterId: 100, selectStageId: 100001 });
  };
    
  return BattleResultView;
})();