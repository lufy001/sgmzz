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
    CommonEvent.addEventListener(CommonEvent.RESULT_TIE, _this._onResultTie, _this);
    CommonEvent.addEventListener(CommonEvent.RESULT_FAIL, _this._onResultFail, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_OVER, _this._onGameOver, _this);
    SoundManager.playBGM('bg_battle');
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
    var startTime = MasterClient.startTime();
    GameManager.endTime = parseInt(startTime) + BATTLE_TOTAL_TIME + BATTLE_DELAY_TIME;
    MasterClient.addEventListener(GameEvent.PLAYER_LEAVE, _this._onPlayerLeave, _this);
    MasterClient.addEventListener(GameEvent.PLAYER_JOIN, _this._onPlayerJoin, _this);
    GameManager.matchId = request.matchId;
    var enemy = MasterClient.enemy();
    var enemyData = enemy.getData();
    GameManager.enemyModel = new PlayerModel(enemyData);
    var event = new LEvent(CommonEvent.GAME_MULTI_START);
    CommonEvent.dispatchEvent(event);
  };
  GameController.prototype._onPlayerJoin = function(event) {
    var _this = this;
    var actor = event.actor;
    if (actor.getId() === MasterClient.playerId()) {
      return;
    }
    MasterClient.synchronize({});
  };
  GameController.prototype._onPlayerLeave = function(event) {
    var _this = this;
    var actor = event.actor;
    if (actor.getId() === MasterClient.playerId()) {
      //自己掉线，返回Home，重新进入战斗
      CommonEvent.dispatchEvent(CommonEvent.GAME_OVER);
      setTimeout(function() {
        Common.changeScene('HomeController', { multiCheck: true });
      }, 100);
      return;
    }
    GameService.instance().getMatchTarget()
      .then(function(response) {
        if (response.matchId) {
          //对方掉线，继续战斗
        } else {
          //对战已被强制结束，返回Home
          CommonEvent.dispatchEvent(CommonEvent.GAME_OVER);
          Common.changeScene('HomeController', { });
        }
      });
  };
  GameController.prototype._onLoadSingle = function(request) {
    var _this = this;
    var selectChapterId = request.selectChapterId;
    var selectStageId = request.selectStageId;
    _this.selectStageId = selectStageId;
    var masters = MasterService.instance().masters;
    var chapter = masters.masterChapters().find(function(child) {
      return child.id() === selectChapterId;
    });
    var stage = chapter.stages().find(function(child) {
      return child.id() === selectStageId;
    });
    GameManager.endTime = BaseService.getTime() + BATTLE_TOTAL_TIME;
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
    _this.resultView.updateView({ isWin: true, stageId: _this.selectStageId });
    CommonEvent.dispatchEvent(CommonEvent.GAME_OVER);
  };
  GameController.prototype._onResultTie = function() {
    var _this = this;
    _this._removeResultEvent();
    _this.resultView.visible = true;
    _this.resultView.updateView({ isTie: true, stageId: _this.selectStageId });
    CommonEvent.dispatchEvent(CommonEvent.GAME_OVER);
  };
  GameController.prototype._onResultFail = function() {
    var _this = this;
    _this.resultView.visible = true;
    _this.resultView.updateView({ isWin: false, stageId: _this.selectStageId });
    CommonEvent.dispatchEvent(CommonEvent.GAME_OVER);
  };
  GameController.prototype._onGameOver = function(event) {
    var _this = this;
    _this._removeResultEvent();
    if (GameManager.isMulti()) {
      MasterClient.disconnect();
    }
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
    MasterClient.removeEventListener(GameEvent.PLAYER_LEAVE, _this._onPlayerLeave, _this);
    MasterClient.removeEventListener(GameEvent.PLAYER_JOIN, _this._onPlayerJoin, _this);
    CommonEvent.removeEventListener(CommonEvent.RESULT_TIE, _this._onResultTie, _this);
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