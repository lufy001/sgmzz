var MastersResponse = (function() {
  function MastersResponse(data) {
    var _this = this;
    _this.data = data;
  }
  MastersResponse.prototype.news = function() {
    return this.data.news;
  };
  MastersResponse.prototype.masterShop = function() {
    return this.data.master_shop;
  };
  MastersResponse.prototype.masterPurchase = function() {
    return this.data.master_purchase;
  };
  MastersResponse.prototype.masterBoxs = function() {
    return this.data.master_boxs;
  };
  MastersResponse.prototype.masterCharacters = function() {
    return this.data.master_characters;
  };
  MastersResponse.prototype.masterLevel = function() {
    return this.data.master_level;
  };
  MastersResponse.prototype.masterSkills = function() {
    return this.data.master_skills;
  };
  MastersResponse.prototype.chapters = function() {
    var _this = this;
    if (!_this.data._chapters) {
      _this.data._chapters = [];
      for (var i = 0; i < _this.data.chapters.length; i++) {
        var model = new ChapterMasterModel(_this.data.chapters[i]);
        _this.data._chapters.push(model);
      }
    }
    return _this.data._chapters;
  };
    
  return MastersResponse;
})();