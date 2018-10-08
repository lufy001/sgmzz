var SkillCtrlView = (function() {
  function SkillCtrlView() {
    var _this = this;

    var properties = {
      skillList: {
        type: 'LListView',
        width: 420,
        height: 315,
        properties: {
          maxPerLine: 4,
          cellWidth: 64,
          cellHeight: 64,
          arrangement: LListView.Direction.Horizontal,
          x: 0,
          y: 0
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
        
    _this.init();
  }
  SkillCtrlView.prototype.init = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.BATTLE_SKILL_CREATE, _this._onBattleSkillCreate, _this);
  };
  SkillCtrlView.prototype.clear = function() {
    var _this = this;
    _this.skillList.die();
  };
  SkillCtrlView.prototype._onBattleSkillCreate = function(event) {
    var _this = this;
    var team = PlayerManager.playerModel.team();
    var character = team[team.length * Math.random() >>> 0];
    var battleSkillIconView = new BattleSkillIconView();
    battleSkillIconView.setModel(character);
    _this.skillList.insertChildView(battleSkillIconView);
  };
  return SkillCtrlView;
})();