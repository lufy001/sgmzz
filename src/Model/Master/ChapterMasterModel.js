var ChapterMasterModel = (function(){
    function ChapterMasterModel(data){
        var _this = this;
        _this.data = data;
    }
    ChapterMasterModel.prototype.id = function(){
        return this.data.id;
    };
    ChapterMasterModel.prototype.title = function(){
        return this.data.title;
    };
    ChapterMasterModel.prototype.stages = function(){
        var _this = this;
        if(!_this.data._stages){
            _this.data._stages = [];
            for(var i=0;i<_this.data.stages.length;i++){
                var model = new StageMasterModel(_this.data.stages[i]);
                _this.data._stages.push(model);
            }
        }
        return _this.data._stages;
        //return this.data.stages;
    };
    
    return ChapterMasterModel;
})();