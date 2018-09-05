var MasterService = (function() {
  function MasterService() {
    var _this = this;
    LExtends(_this, BaseService, []);
  }
  MasterService.prototype.getList = function(versions) {
    var _this = this;
    var action = {
      'class': 'master',
      'method': 'getList'
    };
    if (!window.setting.isLocal) {
      var saveVersions = LPlugin.GetData('sgmzz_versions', {});
      var saveMaster = LPlugin.GetData('sgmzz_master', {});
      
      var request ={"keys":""};
      var keyCount = 0;
      for (var key in versions) {
        if (saveVersions[key] && saveVersions[key] === versions[key]) {
          continue;
        }
        request.keys += ",\"" + key + "\"";
        keyCount++;
      }
      if (keyCount === 0) {
        var response = new MastersResponse(saveMaster);
        _this.masters = response;
        return Promise.resolve(response);
      } else {
        request.keys = "["+ request.keys.substr(1) + "]";
      }

      return _this.send(action, request)
        .then(function(data) {
          for (var key in data) {
            saveMaster[key] = data[key];
          }
          LPlugin.SetData('sgmzz_master', saveMaster);
          LPlugin.SetData('sgmzz_versions', versions);
          
          var response = new MastersResponse(saveMaster);
          _this.masters = response;
          return Promise.resolve(response);
        });
    }

    var news = [
      { id: 1, title: '111', message: '0110test' }, 
      { id: 2, title: '222', message: '22220test' },  
      { id: 3, title: '333', message: '33333test' }, 
      { id: 4, title: '444', message: '4499test' }, 
      { id: 5, title: '555', message: '55555test' },
      { id: 6, title: '111', message: '0110test' }, 
      { id: 7, title: '222', message: '22220test' },  
      { id: 8, title: '333', message: '33333test' }, 
      { id: 9, title: '444', message: '4499test' }, 
      { id: 10, title: '555', message: '55555test' }];
    var chapters = [
      { id: 100, title: 'huang jin zhi luan', stages: [
        { id: 100001, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 100002, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 100003, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 100004, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] }
      ] },
      { id: 101, title: 'huang jin zhi luan', stages: [
        { id: 101001, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 101002, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 101003, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 101004, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] }
      ] },
      { id: 102, title: 'huang jin zhi luan', stages: [
        { id: 102001, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 102002, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 102003, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 102004, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] }
      ] },
      { id: 103, title: 'huang jin zhi luan', stages: [
        { id: 103001, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 103002, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 103003, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] },
        { id: 103004, title: 'ying chuan zhi zhan', map: 1,
          enemys: [
            [{ id: 1, level: 5 }, { id: 2, level: 5, isBoss: 1 }, { id: 3, level: 5 }],
            [{ id: 2, level: 5 }, { id: 3, level: 5, isBoss: 1 }, { id: 1, level: 5 }]
          ] }
      ] }
    ];
    var res = {
      news: news,
      chapters: chapters
    };
    var configs = [{ name: 'master_characters', type: 'text', path: 'resources/configs/characters.json' },
      { name: 'master_shop', type: 'text', path: 'resources/configs/shop.json' },
      { name: 'master_purchase', type: 'text', path: 'resources/configs/purchase.json' },
      { name: 'master_skills', type: 'text', path: 'resources/configs/skills.json' },
      { name: 'master_boxs', type: 'text', path: 'resources/configs/boxs.json' },
      { name: 'master_level', type: 'text', path: 'resources/configs/level.json' }];
    return new Promise(function(resolve, reject) {
      LLoadManage.load(configs, function(progress) {
      }, function(data) {
        data.news = news;
        data.chapters = chapters;
        data.master_characters = JSON.parse(data.master_characters);
        data.master_skills = JSON.parse(data.master_skills);
        data.master_boxs = JSON.parse(data.master_boxs);
        data.master_level = JSON.parse(data.master_level);
        data.master_shop = JSON.parse(data.master_shop);
        data.master_purchase = JSON.parse(data.master_purchase);
        var response = new MastersResponse(data);
        _this.masters = response;
        resolve();
      });
    });
  };
  MasterService._instance;
  MasterService.instance = function() {
    MasterService._instance = MasterService._instance || new MasterService();
    return MasterService._instance;
  };
  return MasterService;
})();