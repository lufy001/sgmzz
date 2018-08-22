var BoxManager = (function(){
    function BoxManager(){
        var _this = this;
        _this.masterList = {};
    }
    BoxManager.prototype.setMasters = function(jsonDataList){
        var _this = this;
        //var jsonDataList = JSON.parse(dataStr);
        jsonDataList.forEach(function(data){
            var masterModel = new BoxMasterModel(data);
            _this.masterList[masterModel.id()] = masterModel;
        });
    };
    BoxManager.prototype.getMasterModel = function(id){
        return this.masterList[id];
    };
    
    return new BoxManager();
})();