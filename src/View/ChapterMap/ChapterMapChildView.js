var ChapterMapChildView = (function() {
  function ChapterMapChildView(model, lastChapterId) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    var properties = {
      background: {
        type: 'LPanel',
        data: 'area-background',
        width: 400,
        height: 126
      },
      indexLabel: {
        type: 'Label',
        properties: {
          text: 'story ' + (model.id() - 99),
          textAlign: 'center',
          size: 30,
          x: 100,
          y: 10
        }
      },
      titleLabel: {
        type: 'Label',
        properties: {
          text: model.title(),
          size: 30,
          x: 20,
          y: 50
        }
      },
      markIcon: {
        type: 'LBitmap',
        data: model.id() >= lastChapterId + 1 ? 'icon_exclamation' : 'icon_ok'
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.model = model;
  }
  ChapterMapChildView.prototype.init = function() {
    var _this = this;
  };
  ChapterMapChildView.prototype.onClick = function(event) {
    var _this = event.target;
    var listView = event.currentTarget;
    var e = new LEvent('stageShow');
    e.model = _this.model;
    listView.dispatchEvent(e);
  };
  return ChapterMapChildView;
})();