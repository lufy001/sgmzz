var PlayerModel = (function() {
  function PlayerModel(data) {
    var _this = this;
    _this.data = data;
    if (_this.data.boxs) {
      _this._init();
    }
  }
  PlayerModel.prototype._init = function(value) {
    this.boxs();
  };
  PlayerModel.prototype.lastStageId = function() {
    return this.data.lastStageId;
  };
  PlayerModel.prototype.winTimesMulti = function() {
    return this.data.winTimesMulti || 0;
  };
  PlayerModel.prototype.winBoxOver = function() {
    return this.data.winBoxOver;
  };
  PlayerModel.prototype.loginBonusCalled = function() {
    return this.data.loginBonusCalled;
  };
  PlayerModel.prototype.loginBonusCount = function() {
    return this.data.loginBonusCount;
  };
  PlayerModel.prototype.coin = function(value) {
    if (value) {
      this.data.coin = value;
      return;
    }
    return this.data.coin;
  };
  PlayerModel.prototype.gem = function(value) {
    if (value) {
      this.data.gem = value;
      return;
    }
    return this.data.gem;
  };
  PlayerModel.prototype.exp = function(value) {
    if (value) {
      this.data.exp = value;
      return;
    }
    return this.data.exp;
  };
  PlayerModel.prototype.level = function(value) {
    if (value) {
      this.data.level = value;
      return;
    }
    return this.data.level || this.data.lv;
  };
  PlayerModel.prototype.teamIndex = function(value) {
    if (value) {
      this.data.teamIndex = teamIndex;
      return;
    }
    return this.data.teamIndex;
  };
  PlayerModel.prototype.teamToJson = function() {
    var team = this.team();
    var res = [];
    team.forEach(function(model) {
      res.push({ id: model.id(), level: model.level() });
    });
    return res;
  };
  PlayerModel.prototype.teams = function() {
    return this.data.teams;
  };
  PlayerModel.prototype.teamData = function() {
    return this.data.teams[this.data.teamIndex];
  };
  PlayerModel.prototype.team = function(value) {
    var _this = this;
    if (value) {
      _this.data._team = null;
      _this.data.teams[_this.data.teamIndex] = value;
      return;
    }
    if (_this.data.teamIndex !== _this.data._teamIndex) {
      _this.data._teamIndex = _this.data.teamIndex;
      _this.data._team = null;
    }
    if (!_this.data._team) {
      _this.data._team = [];
      var characters = _this.characters();
      _this.teamData().forEach(function(id) {
        var model = characters.find(function(child) {
          return child.id() === id;
        });
        _this.data._team.push(model);
      });
    }
    return _this.data._team;
  };
  PlayerModel.prototype.boxs = function(value) {
    var _this = this;
    if (typeof value !== UNDEFINED) {
      _this.data.boxs = value;
      _this.data._boxs = null;
    }
    if (!_this.data._boxs) {
      _this.data._boxs = [];
      _this.data.boxs.forEach(function(data) {
        _this.data._boxs.push(data ? new BoxModel(data) : null);
      });
      _this.data._boxs.sort(function(a, b) {
        return b.id() - a.id();
      });
    }
    return _this.data._boxs;
  };
  PlayerModel.prototype.getCharacter = function(characterId) {
    var _this = this;
    if (!_this._characterMap) {
      _this.characters();
    }
    return _this._characterMap[characterId];
  };
  PlayerModel.prototype.characters = function() {
    var _this = this;
    if (!_this.data._characters) {
      _this.data._characters = [];
      _this.data.characters.forEach(function(data) {
        _this.data._characters.push(new CharacterModel(data));
      });
      _this.data._characters.sort(function(a, b) {
        return a.id() - b.id();
      });
      _this._characterMap = Common.getAssociative(_this.data._characters, 'id');
    }
    return _this.data._characters;
  };
  PlayerModel.prototype.id = function() {
    return this.data.id;
  };
  PlayerModel.prototype.name = function() {
    return this.data.name;
  };
  PlayerModel.prototype.cup = function(value) {
    if (value) {
      this.data.cup = value;
    }
    return this.data.cup;
  };
  PlayerModel.prototype.versions = function() {
    return this.data.versions;
  };
  PlayerModel.prototype.unlockBoxAdTimesWatched = function(value) {
    if (typeof value !== UNDEFINED) {
      this.data.unlockBoxAdTimesWatched = value;
    }
    return this.data.unlockBoxAdTimesWatched || 0;
  };
  return PlayerModel;
})();