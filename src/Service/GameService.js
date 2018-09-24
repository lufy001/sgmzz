var GameService = (function() {
  function GameService() {
    var _this = this;
    LExtends(_this, BaseService, []);
  }
  GameService.prototype.matchStart = function() {
    var _this = this;
    var action = {
      'class': 'match',
      'method': 'matchStart'
    };
    var request = {};
    if (!window.setting.isLocal) {
      return _this.send(action, request);
    }
    
    var res = {
    };
    return Promise.resolve(res);
  };
  
  GameService.prototype.getMatchTarget = function() {
    var _this = this;
    var action = {
      'class': 'match',
      'method': 'getMatchTarget'
    };
    var request = { };
    if (!window.setting.isLocal) {
      return _this.send(action, request);
    }
    
    var res = {
      targetId: 'TESTID'
    };
    if (LPlatform.player().getID() === 'MULTI01') {
      res.targetId = 'MULTI02';
    } else if (LPlatform.player().getID() === 'MULTI02') {
      res.targetId = 'MULTI01';
    }
    console.log('getMatchTarget', res);
    return Promise.resolve(res);
  };
  GameService.prototype.matchCancel = function() {
    var _this = this;
    var action = {
      'class': 'match',
      'method': 'matchCancel'
    };
    var request = { };
    if (!window.setting.isLocal) {
      return _this.send(action, request);
    }
    
    var res = {
    };
    return Promise.resolve(res);
  };
  GameService.prototype.sendSingleResult = function(stageId) {
    var _this = this;
    var action = {
      'class': 'game',
      'method': 'sendSingleResult'
    };
    var request = { 'stageId': stageId };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new BattleResultResponse(data);
          return Promise.resolve(response);
        });
    }
    var characters = [
      { id: 1, level: 1, amount: 22 }, 
      { id: 2, level: 2, amount: 2 }, 
      { id: 3, level: 3, amount: 10 },
      { id: 4, level: 4, amount: 1 },
      { id: 5, level: 1, amount: 0 },
      { id: 6, level: 2, amount: 0 },
      { id: 7, level: 1, amount: 1 },
      { id: 8, level: 2, amount: 2 },
      { id: 9, level: 3, amount: 3 }, 
      { id: 10, level: 1, amount: 4 }, 
      { id: 11, level: 3, amount: 5 },
      { id: 12, level: 1, amount: 6 },
      { id: 13, level: 1, amount: 7 },
      { id: 14, level: 2, amount: 8 },
      { id: 15, level: 1, amount: 9 },
      { id: 16, level: 1, amount: 6 }];
    var teams = [[1, 2, 3, 4]];
    var teamIndex = 0;
    var boxs = [
      { id: 1, boxId: 4, time: 3400000, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      { id: 3, boxId: 2, time: 0, status: 'lock' },
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var playerModel = {
      characters: characters,
      boxs: boxs,
      teams: teams,
      teamIndex: teamIndex,
      coin: 1000000,
      gem: 1000000,
      exp: 2222,
      lv: 11,
      lastStageId: 102002
    };
    var res = {
      playerModel: playerModel,
      boxId: 1,
      gem: 2
    };
    var response = new BattleResultResponse(res);
    return Promise.resolve(response);
  };

  GameService.prototype.sendMultiResult = function(matchId) {
    var _this = this;
    var action = {
      'class': 'game',
      'method': 'sendMultiResult'
    };
    var request = { 'matchId': matchId };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new BattleResultResponse(data);
          return Promise.resolve(response);
        });
    }
    var characters = [
      { id: 1, level: 1, amount: 22 }, 
      { id: 2, level: 2, amount: 2 }, 
      { id: 3, level: 3, amount: 10 },
      { id: 4, level: 4, amount: 1 },
      { id: 5, level: 1, amount: 0 },
      { id: 6, level: 2, amount: 0 },
      { id: 7, level: 1, amount: 1 },
      { id: 8, level: 2, amount: 2 },
      { id: 9, level: 3, amount: 3 }, 
      { id: 10, level: 1, amount: 4 }, 
      { id: 11, level: 3, amount: 5 },
      { id: 12, level: 1, amount: 6 },
      { id: 13, level: 1, amount: 7 },
      { id: 14, level: 2, amount: 8 },
      { id: 15, level: 1, amount: 9 },
      { id: 16, level: 1, amount: 6 }];
    var teams = [[1, 2, 3, 4]];
    var teamIndex = 0;
    var boxs = [
      { id: 1, boxId: 4, time: 3400000, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      { id: 3, boxId: 2, time: 0, status: 'lock' },
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var playerModel = {
      characters: characters,
      boxs: boxs,
      teams: teams,
      teamIndex: teamIndex,
      coin: 1000000,
      gem: 1000000,
      exp: 2222,
      lv: 11,
      lastStageId: 102002
    };
    var res = {
      playerModel: playerModel,
      boxId: 1,
      cup: 20,
      coin: 30
    };
    var response = new BattleResultResponse(res);
    return Promise.resolve(response);
  };
  GameService._instance;
  GameService.instance = function() {
    GameService._instance = GameService._instance || new GameService();
    return GameService._instance;
  };
  return GameService;
})();