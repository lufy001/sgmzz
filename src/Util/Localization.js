var Localization = (function() {
  function Localization() {
  }
  Localization.prototype.get = function(name) {
    return this._values[name] || name;
  };
  Localization.prototype.load = function() {
    var _this = this;
    var settingData = LPlugin.GetData('setting_data', {});
    var language = settingData.language;
    var languageList = [{ name: 'language', type: 'text', path: 'resources/languages/' + language + '.json' }];
    return new Promise(function(resolve, reject) {
      LLoadManage.load(languageList, null, function(data) {
        _this._values = JSON.parse(data.language);
        resolve();
      });
    });
  };
  return new Localization();
})();