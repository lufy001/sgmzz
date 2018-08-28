var OpponentModel = (function() {
  function OpponentModel(data) {
    var _this = this;
    LExtends(_this, CharacterModel, [data]);
  }
  OpponentModel.prototype.belong = function() {
    return 'opponent';
  };
    
  return OpponentModel;
})();