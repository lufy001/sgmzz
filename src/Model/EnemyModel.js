var EnemyModel = (function(){
    function EnemyModel(data){
        var _this = this;
        LExtends (_this, CharacterModel, [data]);
    }
    EnemyModel.prototype.belong = function(){
        return "enemy";
    };
    
    return EnemyModel;
})();