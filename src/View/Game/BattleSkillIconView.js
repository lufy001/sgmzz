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
    _this._toDisable();
  };
  BattleSkillIconView.prototype._onSkillClick = function(event) {
    var _this = this;
    if (_this.filters) {
      return;
    }

    var e = new LEvent(CommonEvent.SKILL_START);
    var params = {};
    var skill = _this.characterModel.skill();
    params.skillId = skill.id();
    params.directionCount = 5;
    params.model = _this.characterModel;
    params.belong = _this.characterModel.belong();
    params.hert = _this.characterModel.attack();
    params.targetId = skill.target() === 'self' ? _this.characterModel.id() : GameManager.selectEnemyId;
    params.amount = skill.special();
    e.params = params;
    CommonEvent.dispatchEvent(e);
    if (GameManager.isMulti()) {
      MasterClient.skillStart({ params: params });
    }
    CommonEvent.dispatchEvent(CommonEvent.BATTLE_SKILL_RESET);
  };
  BattleSkillIconView.prototype._toDisable = function() {
    if (this.filters) {
      return;
    }
    this.filters = [new LColorMatrixFilter([0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0])];
  };
  BattleSkillIconView.prototype._onSkillReady = function() {
    this.filters = null;
    this.cacheAsBitmap(false);
  };
  return BattleSkillIconView;
})();