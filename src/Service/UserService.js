var UserService = (function() {
  function UserService() {
    var _this = this;
    LExtends(_this, BaseService, []);
  }
  UserService.prototype.openBox = function(id) {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'openBox'
    };
    var request = { 'id': id };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new OpenBoxResponse(data);
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
      { id: 1, boxId: 4, time: 3400, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      null,
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var res = {
      playerModel: {
        characters: characters,
        boxs: boxs,
        teams: teams,
        teamIndex: teamIndex,
        coin: 100,
        gem: 100,
        exp: 2222,
        lv: 11
      },
      contents: {
        gem: 2,
        coin: 300,
        cards: [
          { id: 1, amount: 22 }, 
          { id: 2, amount: 2 }, 
          { id: 3, amount: 10 },
          { id: 4, amount: 1 },
          { id: 5, amount: 0 },
        ]
      }
    };
    var response = new OpenBoxResponse(res);
    return Promise.resolve(response);
  };
  UserService.prototype.openMultiBox = function() {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'openMultiBox'
    };
    var request = { };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new OpenBoxResponse(data);
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
      { id: 1, boxId: 4, time: 3400, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      null,
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var res = {
      playerModel: {
        characters: characters,
        boxs: boxs,
        teams: teams,
        teamIndex: teamIndex,
        coin: 100,
        gem: 100,
        exp: 2222,
        lv: 11
      },
      contents: {
        gem: 2,
        coin: 300,
        cards: [
          { id: 1, amount: 22 }, 
          { id: 2, amount: 2 }, 
          { id: 3, amount: 10 },
          { id: 4, amount: 1 },
          { id: 5, amount: 0 },
        ]
      }
    };
    var response = new OpenBoxResponse(res);
    return Promise.resolve(response);
  };
  UserService.prototype.getPlayer = function(id) {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'getPlayer'
    };
    var request = { 'id': id };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new PlayerResponse(data);
          return Promise.resolve(response);
        });
    }
    var res = {
      id: 1,
      name: 'lufy',
      team: [
        { id: 1, level: 1 },
        { id: 2, level: 2 },
        { id: 4, level: 4 },
        { id: 6, level: 2 }
      ],
      cup: 300,
      maxCup: 4000,
      lv: 11
    };
    var response = new PlayerResponse(res);
    return Promise.resolve(response);
  };
  UserService.prototype.unlockBox = function(id) {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'unlockBox'
    };
    var request = { 'id': id };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new UnlockBoxResponse(data);
          return Promise.resolve(response);
        });
    }
    var res = { boxs: [
      { id: 1, boxId: 4, time: 3400, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      null,
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ] };
    var response = new UnlockBoxResponse(res);
    return Promise.resolve(response);
  };
  UserService.prototype.adUnlockBox = function(id) {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'adUnlockBox'
    };
    var request = { 'id': id };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new UnlockBoxResponse(data);
          return Promise.resolve(response);
        });
    }
    var res = { boxs: [
      { id: 1, boxId: 4, time: 3400, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      null,
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ] };
    var response = new UnlockBoxResponse(res);
    return Promise.resolve(response);
  };
  UserService.prototype.setTeams = function(teams, teamIndex) {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'setTeams'
    };
    var request = { 'teams': JSON.stringify(teams), 'teamIndex': teamIndex };
    if (!window.setting.isLocal) {
      return _this.send(action, request);
    }
    return Promise.resolve();
  };
  UserService.prototype.getLoginBonus = function() {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'getLoginBonus'
    };
    var request = { };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new OpenBoxResponse(data);
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
      { id: 1, boxId: 4, time: 3400, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      null,
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var res = {
      playerModel: {
        characters: characters,
        boxs: boxs,
        teams: teams,
        teamIndex: teamIndex,
        coin: 100,
        gem: 100,
        exp: 2222,
        lv: 11,
        lastStageId: 113005
      },
      contents: {
        //gem: 2,
        coin: 300,
        /*cards: [
          { id: 1, amount: 22 }, 
          { id: 2, amount: 2 }, 
          { id: 3, amount: 10 },
          { id: 4, amount: 1 },
          { id: 5, amount: 0 },
        ]*/
      }
    };
    var response = new OpenBoxResponse(res);
    return Promise.resolve(response);
  };
  UserService.prototype.login = function(id, name) {
    var _this = this;
    var action = {
      'class': 'user',
      'method': 'login'
    };
    var request = { name: name };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          //BaseService.ssid = data.ssid;
          var response = new PlayerModel(data);
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
      { id: 1, boxId: 4, time: 3400, status: 'unlock' },
      { id: 2, boxId: 3, time: 0, status: 'unlock' },
      { id: 3, boxId: 2, time: 0, status: 'lock' },
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var res = {
      characters: characters,
      boxs: boxs,
      teams: teams,
      teamIndex: teamIndex,
      coin: 1000000,
      gem: 1000000,
      exp: 2222,
      lv: 11,
      loginBonusCalled: 1,
      lastStageId: 102002
    };
    var response = new PlayerModel(res);
    return Promise.resolve(response);
  };
  UserService._instance;
  UserService.instance = function() {
    UserService._instance = UserService._instance || new UserService();
    return UserService._instance;
  };
  return UserService;
})();
