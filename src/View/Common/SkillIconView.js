var SkillIconView = (function() {
  function SkillIconView(model) {
    var _this = this;
    var properties = {
      icon: {
        type: 'LBitmap',
        data: null
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.updateView(model);
  }
  SkillIconView.prototype.load = function() {
    var _this = this;
    dataList.skill = dataList.skill || {};
    if (dataList.skill[_this.skillModel.id()]) {
      _this.init(dataList.skill[_this.skillModel.id()]);
      return;
    }
    var imgs = [
      { name: 'skill', path: 'resources/images/skills/' + _this.skillModel.id() + '.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.skill[_this.skillModel.id()] = data;
      _this.init(data);
    });
  };
  SkillIconView.prototype.updateView = function(model) {
    var _this = this;
    console.log('SkillIconView', model);
    _this.skillModel = model;
    if (!model) {
      return;
    }
    _this.load();
  };
  SkillIconView.prototype.init = function(data) {
    var _this = this;
    _this.icon.bitmapData = new LBitmapData(data['skill']);
  };
  SkillIconView.prototype._skillClick = function(event) {
    var _this = this;
    console.log(_this.skillModel.id(), _this.skillModel.target());
    var eventType;
    if (_this.skillModel.target() === CharacterBelong.SELF) {
      eventType = CommonEvent.SKILL_TO_SELF;
    } else {
      eventType = CommonEvent.SKILL_TO_TARGET;
    }
    var e = new LEvent(eventType);
    e.skillModel = _this.skillModel;
    CommonEvent.dispatchEvent(e);
  };
  return SkillIconView;
})();