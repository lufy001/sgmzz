var SkillMasterModel = (function(){
    function SkillMasterModel(data){
        var _this = this;
        _this.data = data;
    }
    SkillMasterModel.prototype.id = function(){
        return this.data.id;
    };
    SkillMasterModel.prototype.name = function(){
        return this.data.name;
    };
    SkillMasterModel.prototype.icon = function(){
        return this.data.icon;
    };
    SkillMasterModel.prototype.target = function(){
        return this.data.target;
    };
    SkillMasterModel.prototype.type = function(){
        return this.data.type;
    };
    SkillMasterModel.prototype.percentage = function(){
        return this.data.percentage;
    };
    SkillMasterModel.prototype.plus = function(){
        return this.data.plus;
    };
    SkillMasterModel.prototype.amount = function(){
        return this.data.amount;
    };
    SkillMasterModel.prototype.introduction = function(){
        return this.data.introduction || " ";
    };
    
    return SkillMasterModel;
})();