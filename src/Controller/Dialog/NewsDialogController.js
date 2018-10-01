var NewsDialogController = (function() {
  function NewsDialogController(request) {
    var _this = this;
    var properties = {
      titleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: Localization.get('InBox'),
          size: 26,
          textAlign: 'center',
          x: request.width * 0.5,
          y: 10
        }
      },
      listView: {
        type: 'LListView',
        width: request.width - 40,
        height: request.height - 70,
        parent: 'layer',
        properties: {
          maxPerLine: 1,
          cellWidth: request.width - 40,
          cellHeight: 50,
          arrangement: LListView.Direction.Horizontal,
          x: 20,
          y: 50
        }
      },
      messageLayer: {
        type: 'LSprite',
        parent: 'layer',
        properties: {
          visible: false,
          x: 20,
          y: 50
        }
      },
      messageLabel: {
        type: 'Label',
        parent: 'messageLayer',
        properties: {
          text: ''
        }
      },
      buttonReturn: {
        type: 'CommonButton',
        parent: 'messageLayer',
        label: 'Return',
        onClick: '_showListView',
        properties: {
          x: 130,
          y: request.height - 110
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  NewsDialogController.prototype.onLoad = function(request) {
    var _this = this;
    var news = MasterService.instance().masters.masterNews();
    var items = [];
    var contentX = 0;
    var contentY = 20;
    for (var index = 0; index < news.length; index++) {
      var child = new NewsChildView(news[index], index % 2 === 0);
      items.push(child);
            
    }
    _this.listView.updateList(items);
    CommonEvent.addEventListener(CommonEvent.SHOW_NEWS_MESSAGE, _this._showMessage, _this);
  };
  NewsDialogController.prototype.die = function() {
    CommonEvent.removeEventListener(CommonEvent.SHOW_NEWS_MESSAGE, this._showMessage, this);
  };
  NewsDialogController.prototype._showMessage = function(event) {
    var _this = this;
    _this.messageLabel.text = event.model.message;
    _this.listView.visible = false;
    _this.messageLayer.visible = true;
  };
  NewsDialogController.prototype._showListView = function(event) {
    this.listView.visible = true;
    this.messageLayer.visible = false;
  };
  return NewsDialogController;
})();