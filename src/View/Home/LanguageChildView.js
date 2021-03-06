var LanguageChildView = (function() {
  function LanguageChildView(model) {
    var _this = this;
    var properties = {
      inBackground: {
        type: 'LBitmap',
        data: 'btn03'
      }, 
      outBackground: {
        type: 'LBitmap',
        data: 'btn04'
      }, 
      titleLabel: {
        type: 'Label',
        properties: {
          text: model.title,
          x: 80,
          y: 15,
          textAlign: 'center'
        }
      }
    };
    LExtends(_this, LListChildView, []);
    LExtends(_this, BaseView, [properties]);
    _this.model = model;
    _this.init();
  }
  LanguageChildView.prototype.init = function() {
    var _this = this;
    var settingData = LPlugin.GetSetting();
    var currentLanguage = settingData.language;
    _this.inBackground.visible = currentLanguage === _this.model.value;
    _this.outBackground.visible = !_this.inBackground.visible;
  };
  LanguageChildView.prototype.onClick = function(event) {
    var _this = this;

    var params = { width: 360, height: 200, hideClose: true };
    params.message = Localization.get('Language_change');
    params.okEvent = function() {
      var settingData = LPlugin.GetSetting();
      settingData.language = _this.model.value;
      LPlugin.SetSetting(settingData);
      gameRestart();
    };
    var dialog = new ConfirmDialogController(params);
    dialogLayer.addChild(dialog);
  };
  return LanguageChildView;
})();