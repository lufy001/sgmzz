var ArrowBoardView = (function() {
  function ArrowBoardView() {
    var _this = this;
    var properties = {
      background: {
        type: 'LBitmap',
        data: 'arrow_board'
      },
      layer: {
        type: 'LSprite',
        properties: {
          y: 10
        }
      },
      inputArrowList: {
        type: 'ArrowListView',
        properties: {
          x: 15,
          y: 200
        }
      },
      skillProgress: {
        type: 'ProgressView',
        //params: { progress: 0, sum: 50, background: 'hp_back', foreground: 'hp_front', labelVisible: false },
        params: { progress: 0, sum: SKILL_MAX_POWER, background: 'skill_bar_bg', foreground: 'skill_bar_front', labelVisible: false },
        properties: {
          x: 20,
          y: 260,
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  ArrowBoardView.prototype.init = function() {
    var _this = this;
    _this.layer.mask = new LSprite();
    _this.layer.mask.graphics.drawRect(0, '#ff0000', [20, 15, 600, 160]);
    CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.GAME_MULTI_START, _this._onGameStart, _this);
    CommonEvent.addEventListener(CommonEvent.ARROW_CLICK, _this._arrowClick, _this);
    CommonEvent.addEventListener(CommonEvent.ADD_SKILL_POWER, _this._onAddSkillPower, _this);
    CommonEvent.addEventListener(CommonEvent.RESULT_WIN, _this._onGameOver, _this);
    CommonEvent.addEventListener(CommonEvent.RESULT_FAIL, _this._onGameOver, _this);
  };
  ArrowBoardView.prototype._onGameOver = function(event) {
    var _this = this;
    _this.layer.removeAllChild();
    _this.inputArrowList.clear();
  };
  ArrowBoardView.prototype._onGameStart = function(event) {
    var _this = this;
    _this.layer.removeAllChild();
    PlayerManager.playerModel.team().forEach(function(child) {
      _this._addArrowList(child);
    });
    _this.skillProgress.updateView({ progress: 0, sum: _this.skillProgress.sum });
  };
  ArrowBoardView.prototype._addArrowList = function(model) {
    var _this = this;
    var arrowList = new CharacterArrowListView(model);
    arrowList.y = _this.layer.numChildren * 40;
    _this.layer.addChild(arrowList);
  };
  ArrowBoardView.prototype._onAddSkillPower = function(event) {
    var _this = this;
    var progress = _this.skillProgress.progress + event.value;
    if (progress < 0) {
      progress = 0;
    } else if (progress >= _this.skillProgress.sum) {
      progress -= _this.skillProgress.sum;
      CommonEvent.dispatchEvent(CommonEvent.SKILL_READY);
    }
    _this.skillProgress.updateView({ progress: progress, sum: _this.skillProgress.sum });
  };
  ArrowBoardView.prototype._arrowClick = function(event) {
    var _this = this;   
    var e;
    if (event.input === 'ok') {
      e = new LEvent(CommonEvent.ARROW_CHECK);
      e.type = event.input;
      e.arrowLength = _this.inputArrowList.numChildren;
      _this.inputArrowList.clear();
    } else {
      _this.inputArrowList.add(event.input);
      e = new LEvent(CommonEvent.ARROW_DRAW);
      e.inputChildList = _this.inputArrowList.childList;
    }
    CommonEvent.dispatchEvent(e);
  };
  return ArrowBoardView;
})();