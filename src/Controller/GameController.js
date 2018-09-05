var GameController = (function() {
  function GameController(request) {
    var _this = this;

    var properties = {
      battleView: {
        type: 'BattleView'
      },
      resultView: {
        type: 'BattleResultView',
        properties: {
          visible: false
        }
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    _this._init();
  }
  GameController.prototype.onLoad = function(request) {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.RESULT_WIN, _this._onResultWin, _this);
    CommonEvent.addEventListener(CommonEvent.RESULT_FAIL, _this._onResultFail, _this);

    if (request.battleType === 'single') {
      GameManager.isMulti(false);
      _this._onLoadSingle(request);
    } else {
      GameManager.isMulti(true);
      _this._onLoadMulti(request);
    }
  };
  GameController.prototype._onLoadMulti = function(request) {
    var _this = this;
    var event = new LEvent(CommonEvent.GAME_MULTI_START);
    CommonEvent.dispatchEvent(event);
  };
  GameController.prototype._onLoadSingle = function(request) {
    var _this = this;
    var selectChapterId = request.selectChapterId;
    var selectStageId = request.selectStageId;
    _this.selectStageId = selectStageId;
    var masters = MasterService.instance().masters;
    var chapter = masters.chapters().find(function(child) {
      return child.id() === selectChapterId;
    });
    var stage = chapter.stages().find(function(child) {
      return child.id() === selectStageId;
    });
    GameManager.stepIndex = 1;
    GameManager.stepSum = stage.enemys().length;
    var event = new LEvent(CommonEvent.GAME_START);
    event.chapter = chapter;
    event.stage = stage;
    CommonEvent.dispatchEvent(event);
  };
  GameController.prototype._onResultWin = function() {
    var _this = this;
    _this._removeResultEvent();
    _this.resultView.visible = true;
    _this.resultView.updateView({ isWin: true });
  };
  GameController.prototype._onResultFail = function() {
    var _this = this;
    _this._removeResultEvent();
    _this.resultView.visible = true;
    _this.resultView.updateView({ isWin: false });
  };
  GameController.prototype._onMaskShow = function() {
    var _this = this;
    _this.mask = _this._mask;
  };
  GameController.prototype._onMaskHide = function() {
    var _this = this;
    _this.mask = null;
  };
  GameController.prototype.die = function() {
    var _this = this;
    _this._removeResultEvent();
    CommonEvent.removeEventListener(CommonEvent.BATTLE_MASK_SHOW, _this._onMaskShow, _this);
    CommonEvent.removeEventListener(CommonEvent.BATTLE_MASK_HIDE, _this._onMaskHide, _this);
    _this.callParent('die', arguments);
  };
  GameController.prototype._removeResultEvent = function() {
    var _this = this;
    CommonEvent.removeEventListener(CommonEvent.RESULT_WIN, _this._onResultWin, _this);
    CommonEvent.removeEventListener(CommonEvent.RESULT_FAIL, _this._onResultFail, _this);
  };
  GameController.prototype._init = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.BATTLE_MASK_SHOW, _this._onMaskShow, _this);
    CommonEvent.addEventListener(CommonEvent.BATTLE_MASK_HIDE, _this._onMaskHide, _this);
        
    _this._mask = new LSprite();
    _this._mask.graphics.drawRect(0, '#ff0000', [_this.battleView.x, _this.battleView.y, _this.battleView.getWidth(), _this.battleView.getHeight()]);
  };
    
  return GameController;
})();