var EnemyTeamView = (function() {
  function EnemyTeamView() {
    var _this = this;
    var properties = {
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  EnemyTeamView.prototype.init = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.RESULT_CHECK, _this._onResultCheck, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_CONTINUE, _this._onGameContinue, _this);
    CommonEvent.addEventListener(CommonEvent.ENEMY_AUTO_SELECT, _this._onEnemyAutoSelect, _this);
  };
  EnemyTeamView.prototype._onEnemyAutoSelect = function(event) {
    var _this = this;
    if (_this.numChildren > 0) {
      _this.getChildAt(0).toSelect();
    }
  };
  EnemyTeamView.prototype._onGameStart = function(event) {
    var _this = this;
    _this.removeAllChild();
    _this._stage = event.stage;
    _this.updateView();
  };
  EnemyTeamView.prototype._onGameContinue = function(event) {
    this.updateView();
  };
  EnemyTeamView.prototype._onResultCheck = function() {
    var _this = this;
    if (_this.numChildren > 0) {
      _this.getChildAt(0).toSelect();
      return;
    } else if (GameManager.stepIndex < GameManager.stepSum) {
      GameManager.stepIndex++;
      CommonEvent.dispatchEvent(CommonEvent.GAME_CONTINUE);
      return;
    }
    CommonEvent.dispatchEvent(CommonEvent.RESULT_WIN);
  };
  EnemyTeamView.prototype.updateView = function() {
    var _this = this;
    var enemys = _this._stage.enemys();
    var enemyModels = enemys[GameManager.stepIndex - 1];
    _this.points = [{ x: 0, y: -100, scale: 1.5 }, { x: 0, y: 20, scale: 2 }, { x: 0, y: 120, scale: 1.5 }];
    enemyModels.forEach(function(child) {
      _this.addCharacter(child);
    });
  };
  EnemyTeamView.prototype.addCharacter = function(data) {
    var _this = this;
    var point = _this.points[_this.numChildren];
    var card = new EnemyView(data, point.scale);
    card.x = point.x;
    card.y = point.y;
    //card.scaleX = card.scaleY = point.scale;
    _this.addChild(card);
  };
  return EnemyTeamView;
})();