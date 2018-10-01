var LanguageDialogController = (function() {
  function LanguageDialogController(request) {
    var _this = this;
    var properties = {
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 180,
          y: 10,
          text: Localization.get('Language'),
          size: 38,
          textAlign: 'center'
        }
      },
      listView: {
        type: 'LListView',
        width: 160,
        height: 320,
        parent: 'layer',
        properties: {
          maxPerLine: 1,
          cellWidth: 160,
          cellHeight: 80,
          arrangement: LListView.Direction.Horizontal,
          x: 100,
          y: 80
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  LanguageDialogController.prototype.onLoad = function(request) {
    var _this = this;
    var languages = [
      { title: 'English', value: 'en_US' },
      { title: '简体中文', value: 'zh_CN' },
      { title: '日本語', value: 'ja_JP' }
    ];
    var items = [];
    for (var i = 0; i < languages.length; i++) {
      var child = new LanguageChildView(languages[i]);
      items.push(child);
    }
    _this.listView.updateList(items);
  };
    
  return LanguageDialogController;
})();