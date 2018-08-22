var LevelManager = (function(){
    function LevelManager(){
        var _this = this;
        _this.masterList = {};
    }
    LevelManager.prototype.setMasters = function(jsonDataList){
        var _this = this;
        //var jsonDataList = JSON.parse(dataStr);
        jsonDataList.forEach(function(data){
            _this.masterList[data.level] = data;
        });
    };
    LevelManager.prototype.getMaster = function(level){
        return this.masterList[level];
    };
    
    return new LevelManager();
})();