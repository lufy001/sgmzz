var BattleSkillIconView = (function() {
  function BattleSkillIconView() {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.init();
  }
  BattleSkillIconView.prototype.init = function() {
    var _this = this;
    _this._icon = new SkillIconView();
    _this._icon.addEventListener(LEvent.COMPLETE, _this._onSkillIconUpdate, _this);
    _this.addChild(_this._icon);
    _this._mask = Common.getTranslucentBitmap(64, 64);
    _this.addChild(_this._mask);
    CommonEvent.addEventListener(CommonEvent.SKILL_READY, _this._onSkillReady, _this);
    
  };
  BattleSkillIconView.prototype.setModel = function(characterModel) {
    var _this = this;
    _this.characterModel = characterModel;
    _this._icon.updateView(characterModel.skill());
  };
  BattleSkillIconView.prototype._onSkillIconUpdate = function(event) {
    this.cacheAsBitmap(false);
    this.updateView();
  };
  BattleSkillIconView.prototype.onClick = function(event) {
    var _this = this;
    if (_this._mask) {
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
    if (GameManager.isMulti()) {
      MasterClient.skillStart({ params: params });
    }
    event.currentTarget.deleteChildView(_this);
    CommonEvent.dispatchEvent(e);
  };
  BattleSkillIconView.prototype._onSkillReady = function() {
    var _this = this;
    _this._mask.remove();
    _this._mask = null;
    _this.cacheAsBitmap(false);
    _this.updateView();
    CommonEvent.removeEventListener(CommonEvent.SKILL_READY, _this._onSkillReady, _this);
    setTimeout(function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_SKILL_CREATE);
    });
  };
  return BattleSkillIconView;
})();