var BaseTeamView = (function() {
  function BaseTeamView(properties) {
    var _this = this;
    LExtends(_this, BaseView, [properties]);
    _this._addBaseEvent();
  }
  BaseTeamView.prototype._addBaseEvent = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.SKILL_START, _this._onSkillStart, _this);
  };
  BaseTeamView.prototype._onSkillStart = function(event) {
    var _this = this;
    if (_this.layer.numChildren === 0) {
      return;
    }
    var params = event.params;
    var skill = params.skillId ? SkillManager.getMasterModel(params.skillId) : null;
    params.skill = skill;
    var belong = params.belong;
    var amount = params.amount;
    var targetId = params.targetId;
    var selfBelong = _this.layer.getChildAt(0).model.belong();
    var sameBelong = belong === selfBelong;
    if (skill.target() === 'self' ^ sameBelong) {
      return;
    }
    var targetIndex = _this.layer.childList.findIndex(function(child) {
      return child.model.id() === targetId;
    });
    for (var i = 0, length = _this.layer.childList.length; i < amount; i++) {
      var index = (targetIndex + i) % length;
      if (i > 0 && index === targetIndex) {
        break;
      }
      var child = _this.layer.childList[index];
      child.dispatchEvent(event);
    }
  };
  return BaseTeamView;
})();