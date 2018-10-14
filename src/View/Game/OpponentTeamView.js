var OpponentTeamView = (function() {
  function OpponentTeamView() {
    var _this = this;
    var properties = {
      layer: {
        type: 'LSprite',
        properties: {
          x: 0
        }
      },
      hpProgress: {
        type: 'ProgressView',
        params: { progress: 0, sum: 2000, background: 'hp_back', foreground: 'hp_front' },
        properties: {
          x: 140,
          y: 330,
          rotate: -90
        }
      }
    };
    LExtends(_this, BaseTeamView, [properties]);
    _this.init();
  }
  OpponentTeamView.prototype.init = function() {
    var _this = this;
    _this.hpProgress.label.visible = false;
    CommonEvent.addEventListener(CommonEvent.GAME_MULTI_START, _this._onGameMultiStart, _this);
    CommonEvent.addEventListener(CommonEvent.ENEMY_AUTO_SELECT, _this._onEnemyAutoSelect, _this);
    MasterClient.addEventListener(GameEvent.SYNCHRONIZE, _this._onSynchronize, _this);
  };
  OpponentTeamView.prototype._onSynchronize = function(event) {
    var _this = this;
    var params = event.params.playerTeam;
    var hp = params.hp;
    var buffers = params.buffers;
    GameManager.multiEnemyHp(hp);
    _this.hpProgress.updateView({ progress: hp, sum: _this.hpProgress.sum, fontSize: 22 });
    for (var i = 0; i < _this.layer.numChildren; i++) {
      var characterView = _this.layer.childList[i];
      var buffer = buffers[i];
      for (var key in buffer) {
        var bufferValue = buffer[key];
        characterView.addBuffer(key, bufferValue.value, bufferValue.time);
      }
      characterView.model.buffer(buffer);
    }
  };
  OpponentTeamView.prototype._onEnemyAutoSelect = function(event) {
    var _this = this;
    if (_this.layer.numChildren > 0) {
      _this.layer.getChildAt(0).toSelect();
    }
  };
  OpponentTeamView.prototype._onGameMultiStart = function(event) {
    var _this = this;
    _this.layer.removeAllChild();
    var teamData = MasterClient.enemy().getData().team;
    var level = MasterClient.enemy().getData().level;
    var hp = level * HP_LEVEL;
    teamData.forEach(function(data) {
      var child = new OpponentModel(data);
      hp += child.hp();
      _this.addCharacter(child);
    });
    GameManager.multiEnemyHp(hp);
    _this.hpProgress.updateView({ progress: hp, sum: hp, fontSize: 22 });
  };
  OpponentTeamView.prototype._onChangeHp = function(event) {
    var _this = this;
    var hp = _this.hpProgress.progress + event.value;
    if (hp > _this.hpProgress.sum) {
      hp = _this.hpProgress.sum;
    } else if (hp <= 0) {
      hp = 0;
      MasterClient.gameOver();
    }
    GameManager.multiEnemyHp(hp);
    _this.hpProgress.updateView({ progress: hp, sum: _this.hpProgress.sum, fontSize: 22 });
  };
  OpponentTeamView.prototype.addCharacter = function(data) {
    var _this = this;
    var character = new OpponentCharacterView(data, _this.layer.numChildren);
    character.addEventListener('player:changeHp', _this._onChangeHp, _this);
    character.y = 76 * _this.layer.numChildren;
    _this.layer.addChild(character);
  };
  return OpponentTeamView;
})();