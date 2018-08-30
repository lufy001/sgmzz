var BattleSkillIconView = (function() {
  function BattleSkillIconView() {
    var _this = this;
    LExtends(_this, SkillIconView, []);
  }
  BattleSkillIconView.prototype.init = function(data) {
    var _this = this;
    _this.callParent('init', arguments);
    _this._toDisable();
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onSkillClick, _this);
    CommonEvent.addEventListener(CommonEvent.SKILL_READY, _this._onSkillReady, _this);
  };
  BattleSkillIconView.prototype.setModel = function(characterModel) {
    var _this = this;
    _this.characterModel = characterModel;
    _this.updateView(characterModel.skill());
  };
  BattleSkillIconView.prototype._onSkillClick = function(event) {
    var _this = this;
    if (_this.filters) {
      return;
    }
    var e = new LEvent(CommonEvent.SKILL_START);
    e.skill = _this.characterModel.skill();
    e.directionCount = 4;
    e.model = _this.characterModel;
    e.isToAll = true;
    CommonEvent.dispatchEvent(e);
  };
  BattleSkillIconView.prototype._toDisable = function() {
    this.filters = [new LColorMatrixFilter([0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0])];
  };
  BattleSkillIconView.prototype._onSkillReady = function() {
    this.filters = null;
    this.cacheAsBitmap(false);
  };
  return BattleSkillIconView;
})();