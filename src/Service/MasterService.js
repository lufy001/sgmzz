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
      
      var request = { 'keys': '' };
      var keys = [];
      for (var key in versions) {
        if (saveVersions[key] && saveVersions[key] === versions[key]) {
          continue;
        }
        keys.push(key);
      }
      if (keys.length === 0) {
        var response = new MastersResponse(saveMaster);
        _this.masters = response;
        return Promise.resolve(response);
      }
      request.keys = JSON.stringify(keys);
      return _this.send(action, request)
        .then(function(data) {
          for (var key in data) {
            if (data[key] && data[key].length > 0) {
              saveMaster[key] = data[key];
            }
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
    var configs = [{ name: 'master_characters', type: 'text', path: 'resources/configs/characters.json' },
      { name: 'master_shop', type: 'text', path: 'resources/configs/shop.json' },
      { name: 'master_purchase', type: 'text', path: 'resources/configs/purchase.json' },
      { name: 'master_skills', type: 'text', path: 'resources/configs/skills.json' },
      { name: 'master_boxs', type: 'text', path: 'resources/configs/boxs.json' },
      { name: 'master_loginbonus', type: 'text', path: 'resources/configs/loginbonus.json' },
      { name: 'master_chapters', type: 'text', path: 'resources/configs/chapter.json' },
      { name: 'master_level', type: 'text', path: 'resources/configs/level.json' },
      { name: 'master_user_level', type: 'text', path: 'resources/configs/user_level.json' }];
    return new Promise(function(resolve, reject) {
      LLoadManage.load(configs, function(progress) {
      }, function(data) {
        data.master_news = news;
        data.master_chapters = JSON.parse(data.master_chapters);
        data.master_characters = JSON.parse(data.master_characters);
        data.master_skills = JSON.parse(data.master_skills);
        data.master_boxs = JSON.parse(data.master_boxs);
        data.master_level = JSON.parse(data.master_level);
        data.master_user_level = JSON.parse(data.master_user_level);
        data.master_shop = JSON.parse(data.master_shop);
        data.master_purchase = JSON.parse(data.master_purchase);
        data.master_loginbonus = JSON.parse(data.master_loginbonus);
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