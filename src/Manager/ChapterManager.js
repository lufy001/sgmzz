var ChapterManager = (function() {
  function ChapterManager() {
    var _this = this;
    _this.masterList = {};
  }
  ChapterManager.prototype.setMasters = function(jsonDataList) {
    var _this = this;
    //var jsonDataList = JSON.parse(dataStr);
    jsonDataList.forEach(function(chapter) {
      _this.masterList[chapter.id()] = chapter;
    });
  };
  ChapterManager.prototype.getMasterModel = function(id) {
    console.error(id,this.masterList);
    return this.masterList[id];
  };
    
  return new ChapterManager();
})();
