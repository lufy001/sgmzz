var CardService = (function() {
  function CardService() {
    var _this = this;
    LExtends(_this, BaseService, []);
  }
  CardService.prototype.levelUp = function(id) {
    console.log('CardService.prototype.levelUp');
    var _this = this;
    var action = {
      'class': 'card',
      'method': 'levelUp'
    };
    var request = { 'id': id };
    if (!window.setting.isLocal) {
      return _this.send(action, request);
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
      null,
      { id: 4, boxId: 1, time: 0, status: 'lock' }
    ];
    var res = {
        characters: characters,
        boxs: boxs,
        teams: teams,
        teamIndex: teamIndex,
        coin: 100,
        gem: 100,
        exp: 2222,
        lv: 11
      };
    var response = new PlayerModel(res);
    return Promise.resolve(response);
  };
  
  CardService._instance;
  CardService.instance = function() {
    CardService._instance = CardService._instance || new CardService();
    return CardService._instance;
  };
  return CardService;
})();