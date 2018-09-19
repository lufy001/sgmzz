var ChapterMapController = (function() {
  function ChapterMapController(request) {
    var _this = this;

    var properties = {
      titleLayer: {
        type: 'LSprite',
        properties: {
          toX: (LGlobal.width - dataList['chapter-title'].width) * 0.5,
          fromX: (-LGlobal.width - dataList['chapter-title'].width) * 0.5,
          y: 15
        }
      },
      titleBackground: {
        parent: 'titleLayer',
        type: 'LBitmap',
        data: 'chapter-title'
      },
      titleLabel: {
        parent: 'titleLayer',
        type: 'Label',
        properties: {
          text: 'story challenge',
          textAlign: 'center',
          size: 40,
          x: dataList['chapter-title'].width * 0.5,
          y: 5
        }
      },
      btnQuit: {
        parent: 'titleLayer',
        type: 'CommonButton',
        label: '',
        onClick: '_onClickQuit',
        params: { img: 'btn_gree_64', icon: 'icon_quit', iconWidth: 48, iconHeight: 48 },
        properties: {
          x: -32,
          y: -5
        }
      },
      chapterListView: {
        type: 'LListView',
        properties: {
          maxPerLine: 1,
          cellWidth: 400,
          cellHeight: 126,
          arrangement: LListView.Direction.Horizontal,
          x: LGlobal.width + 40,
          y: 80
        }
      },
      stageListView: {
        type: 'LListView',
        properties: {
          maxPerLine: 1,
          cellWidth: 400,
          cellHeight: 126,
          arrangement: LListView.Direction.Horizontal,
          x: LGlobal.width + 40,
          y: 80,
          visible: false
        }
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    _this._init();
  }
  ChapterMapController.prototype.onLoad = function(request) {
    var _this = this;

    var lastStageId = PlayerManager.playerModel.lastStageId();
    var lastChapterId = lastStageId / 1000 >>> 0;
    var currentChapterId = lastChapterId;
    var items = [];
    var masters = MasterService.instance().masters;
    var chapters = masters.masterChapters();
    var chapter = ChapterManager.getMasterModel(lastChapterId);
    var newStageId = chapter.stages().find(function(stage) {
      return stage.id() > lastStageId;
    });
    if (!newStageId) {
      var currentChapter = chapters.find(function(chapter) {
        return chapter.id() > lastChapterId;
      });
      currentChapterId = currentChapter ? currentChapter.id() : currentChapterId + 1;
    }
    for (var i = chapters.length - 1; i >= 0; i--) {
      var child = chapters[i];
      if (child.id() > currentChapterId) {
        continue;
      }
      items.push(new ChapterMapChildView(child, currentChapterId));
    }
    _this.chapterListView.updateList(items);
    
    LTweenLite.to(_this.titleLayer, 0.3, { x: _this.titleLayer.toX });
    LTweenLite.to(_this.chapterListView, 0.3, { x: 40 });
  };
  ChapterMapController.prototype._onShowStage = function(event) {
    var _this = this;
    var lastStageId = PlayerManager.playerModel.lastStageId();
    var chapterModel = event.model;
    var items = [];
    var child;
    var stages = chapterModel.stages();
    for (var i = stages.length - 1; i >= 0; i--) {
      child = stages[i];
      if (child.id() > lastStageId + 1) {
        continue;
      }
      items.push(new StageChildView(child, chapterModel.id(), lastStageId));
    }
    if (items.length === 0) {
      child = stages[0];
      items.push(new StageChildView(child, chapterModel.id(), lastStageId));
    }
    _this.stageListView.updateList(items);

    LTweenLite.to(_this.titleLayer, 0.3, { x: _this.titleLayer.fromX })
      .to(_this.titleLayer, 0.3, { x: _this.titleLayer.toX });
    LTweenLite.to(_this.chapterListView, 0.3, { x: LGlobal.width + 40, onComplete: function() {
      _this.chapterListView.visible = false;
      _this.stageListView.visible = true;
      _this.titleLabel.text = chapterModel.title();
    } }).to(_this.stageListView, 0.3, { x: 40, onComplete: function() {} });
  };
  ChapterMapController.prototype._onClickQuit = function(event) {
    var _this = this;
    if (_this.chapterListView.visible) {
      LTweenLite.to(_this.titleLayer, 0.3, { x: _this.titleLayer.fromX });
      LTweenLite.to(_this.chapterListView, 0.3, { x: LGlobal.width + 40, onComplete: function() {
        Common.changeScene('HomeController');
      } });
    } else {
      _this._onShowChapter();
    }
  };
  ChapterMapController.prototype._onShowChapter = function() {
    var _this = this;
    LTweenLite.to(_this.titleLayer, 0.3, { x: _this.titleLayer.fromX })
      .to(_this.titleLayer, 0.3, { x: _this.titleLayer.toX });
    LTweenLite.to(_this.stageListView, 0.3, { x: LGlobal.width + 40, onComplete: function() {
      _this.stageListView.visible = false;
      _this.chapterListView.visible = true;
      _this.titleLabel.text = 'story challenge';
    } }).to(_this.chapterListView, 0.3, { x: 40, onComplete: function() {} });
  };
  ChapterMapController.prototype.die = function() {
    var _this = this;
    _this.callParent('die', arguments);
  };
  ChapterMapController.prototype._onClickStage = function(event) {
    var _this = this;
    var stageId = event.model.id();
    var chapterId = stageId / 1000 >>> 0;
    Common.changeScene('GameController', { selectChapterId: chapterId, selectStageId: stageId, battleType: 'single' });
  };
    
  ChapterMapController.prototype._init = function() {
    var _this = this;
    _this.titleLayer.x = _this.titleLayer.fromX;
    _this.chapterListView.resize(400, LGlobal.height - _this.chapterListView.y);
    _this.stageListView.resize(400, LGlobal.height - _this.stageListView.y);
    _this.chapterListView.addEventListener('stageShow', _this._onShowStage, _this);
    _this.stageListView.addEventListener('stageClick', _this._onClickStage, _this);
  };
    
  return ChapterMapController;
})();
