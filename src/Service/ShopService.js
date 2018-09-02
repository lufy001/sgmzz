var ShopService = (function() {
  function ShopService() {
    var _this = this;
    LExtends(_this, BaseService, []);
  }
  ShopService.prototype.buy = function(id) {
    var _this = this;
    var action = {
      'class': 'shop',
      'method': 'buy'
    };
    var request = { 'id': id };
    if (!window.setting.isLocal) {
      return _this.send(action, request)
        .then(function(data) {
          var response = new BuyResponse(data);
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
    var response = new BuyResponse(res);
    return Promise.resolve(response);
  };
  
  ShopService._instance;
  ShopService.instance = function() {
    ShopService._instance = ShopService._instance || new ShopService();
    return ShopService._instance;
  };
  return ShopService;
})();