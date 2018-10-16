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
    CommonEvent.addEventListener(CommonEvent.SKILL_READY, _this._onSkillReady, _this);
  };
  SkillCtrlView.prototype.clear = function() {
    var _this = this;
    var itemList = _this.skillList.getItems();
    for (var i = itemList.length-1; i >= 0; i--) {
      _this.skillList.deleteChildView(itemList[i]);
    }
  };
  SkillCtrlView.prototype._onBattleSkillCreate = function(event) {
    var _this = this;
    var team = PlayerManager.playerModel.team().filter(function(character) {
      return !!character.skill();
    });
    if (team.length === 0) {
      return;
    }
    var character = team[team.length * Math.random() >>> 0];
    var battleSkillIconView = new BattleSkillIconView();
    battleSkillIconView.setModel(character);
    _this.skillList.insertChildView(battleSkillIconView);
  };
  
  SkillCtrlView.prototype.die = function() {
    var _this = this;
    CommonEvent.removeEventListener(CommonEvent.SKILL_READY, _this._onSkillReady, _this);
    _this.callParent('die', arguments);
  };
  
  SkillCtrlView.prototype._onSkillReady = function() {
    var _this = this;
    var itemList = _this.skillList.getItems();
    if (itemList.length === 0) {
      return;
    }
    for (var i = 0; i < itemList.length; i++) {
      var child = itemList[i];
      if(child.isReady()){
      	continue;
      }
      child.skillReady();
      break;
    }

    setTimeout(function() {
      CommonEvent.dispatchEvent(CommonEvent.BATTLE_SKILL_CREATE);
    });
  };
  return SkillCtrlView;
})();