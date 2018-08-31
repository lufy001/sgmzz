var OpponentCharacterView = (function() {
  function OpponentCharacterView(model) {
    var _this = this;
    var properties = {
      selectIcon: {
        type: 'LBitmap',
        data: 'arrow-select',
        properties: {
          x: 80,
          y: 30,
          visible: false
        }
      }
    };
    LExtends(_this, CharacterView, [model, properties]);
    
  }
  OpponentCharacterView.prototype._onArrowAttack = function(event) {
    var _this = this;
    var params = event.params;
    if (_this.model.belong() !== params.belong || _this.model.id() !== params.characterId) {
      return;
    }
    _this._params = params;
    _this.setActionDirection(CharacterAction.ATTACK, _this.direction);
  };
  OpponentCharacterView.prototype.init = function(data) {
    var _this = this;
    _this.callParent('init', arguments);
    _this.setActionDirection(CharacterAction.MOVE, CharacterDirection.LEFT);
    _this.character.addFrameScript(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.LEFT), function() {
      _this._attackToHert();
    }, []);
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
    CommonEvent.addEventListener(CommonEvent.SELECT_ENEMY, _this._onSelectEnemy, _this);
  };
  OpponentCharacterView.prototype.die = function() {
    CommonEvent.removeEventListener(CommonEvent.SELECT_ENEMY, this._onSelectEnemy, this);
    this.callParent('die');
  };
  OpponentCharacterView.prototype._onClick = function(event) {
    this.toSelect();
  };
  OpponentCharacterView.prototype.toSelect = function() {
    var _this = this;
    var e = new LEvent(CommonEvent.SELECT_ENEMY);
    e.model = _this.model;
    CommonEvent.dispatchEvent(e);
  };
  OpponentCharacterView.prototype._onSelectEnemy = function(event) {
    var _this = this;
    var model = event.model;
    _this.selectIcon.visible = _this.model.id() === model.id();
    if (_this.selectIcon.visible) {
      GameManager.selectEnemyId = _this.model.id();
    }
  };
  return OpponentCharacterView;
})();