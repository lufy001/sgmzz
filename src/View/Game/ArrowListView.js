var ArrowListView = (function() {
  function ArrowListView(list) {
    var _this = this;
    LExtends(_this, BaseView, []);
    _this.addList(list);
  }
  ArrowListView.prototype.addList = function(list) {
    var _this = this;
    for (var i = 0; list && i < list.length; i++) {
      _this.add(list[i]);
    }
  };
  ArrowListView.prototype.add = function(value) {
    var _this = this;
    var arrow = GameManager.getArrow();
    arrow.setDirection(value);
    arrow.x = _this.numChildren * arrow.getWidth();
    _this.addChild(arrow);
  };
  ArrowListView.prototype.clear = function() {
    var _this = this;
    while (_this.numChildren > 0) {
      var child = _this.getChildAt(0);
      child.setState(child.direction, false);
      GameManager.pushArrow(child);
    }
  };
  return ArrowListView;
})();