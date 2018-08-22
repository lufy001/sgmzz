var BattleSkillIconView = (function(){
    function BattleSkillIconView(){
        var _this = this;
        LExtends (_this, SkillIconView, []);
    }
    BattleSkillIconView.prototype.init = function(data){
        var _this = this;
        _this.callParent("init",arguments);
        _this.addEventListener(LMouseEvent.MOUSE_UP, _this._skillClick, _this);
    };
    BattleSkillIconView.prototype._skillClick = function(event){
        var _this = this;
        
    };
    return BattleSkillIconView;
})();