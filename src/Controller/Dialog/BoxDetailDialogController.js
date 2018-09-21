var BoxDetailDialogController = (function() {
  function BoxDetailDialogController(request) {
    var _this = this;
    var coin = request.model.coin();
    var gem = request.model.gem();
    var properties = {
      boxView: {
        type: 'BoxIconView',
        parent: 'layer',
        params: request.model,
        properties: {
          x: 130,
          y: -50
        }
      },
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: request.width * 0.5,
          y: 50,
          text: request.model.name(),
          size: 30,
          textAlign: 'center'
        }
      },
      coinBackground: {
        type: 'LPanel',
        parent: 'layer',
        data: 'frame04',
        width: request.width - 20,
        height: 60,
        properties: {
          x: 10,
          y: 100
        }
      },
      videoButton: {
        type: 'CommonButton',
        parent: 'layer',
        onClick: '_videoClick',
        label: '0/' + UNLOCK_AD_MAX_TIMES,
        params: { img: 'btn03', icon: 'icon_video', iconWidth: 40, iconHeight: 40 },
        properties: {
          x: 100,
          y: 310
        }
      },
      coinIcon: {
        type: 'LBitmap',
        parent: 'layer',
        data: 'icon_coin',
        properties: {
          x: 20,
          y: 105
        }
      },
      coinLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 80,
          y: 115,
          text: coin[0] + '~' + coin[1],
          size: 24
        }
      },
      gemIcon: {
        type: 'LBitmap',
        parent: 'layer',
        data: 'icon_gem',
        properties: {
          x: 210,
          y: 105
        }
      },
      gemLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 270,
          y: 115,
          text: gem[0] + '~' + gem[1],
          size: 24
        }
      },
      cardLayer: {
        type: 'LSprite',
        parent: 'layer',
        properties: {
          x: 20,
          y: 180
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  BoxDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.model = request.model;
    _this._addCards(request);
    _this._addTime(request);
    _this._addButton(request);
    Common.changeButtonLabel(_this.videoButton, PlayerManager.playerModel.unlockBoxAdTimesWatched() + '/' + UNLOCK_AD_MAX_TIMES);
  };
  BoxDetailDialogController.prototype._addButton = function(request) {
    var _this = this, button;
    if (request.toUnlock && _this.model.status() === 'lock') {
      button = Common.getButton('unlock', { img: 'btn03', offsetY: -2 });
      button.x = request.width * 0.5 + (request.width * 0.5 - button.getWidth()) * 0.5;
      button.addEventListener(LMouseEvent.MOUSE_UP, _this._unlockClick, _this);
    } else if (_this.model.time() === 0 && _this.model.status() === 'unlock') {
      button = Common.getButton('open', { img: 'btn03', offsetY: -2 });
      button.x = (request.width - button.getWidth()) * 0.5;
      button.addEventListener(LMouseEvent.MOUSE_UP, _this._openClick, _this);
    } else {
      var gem = BoxManager.timeToGem(_this.model.time() || _this.model.allTime());
      button = Common.getButton(gem, { img: 'btn03', icon: 'icon_gem', iconWidth: 34, iconHeight: 34, offsetY: -2 });
      button.x = request.width * 0.5 + (request.width * 0.5 - button.getWidth()) * 0.5;
      button.addEventListener(LMouseEvent.MOUSE_UP, _this._openClick, _this);
    }
    button.y = 230;
    _this.layer.addChild(button);
  };
  BoxDetailDialogController.prototype._open = function() {
    var _this = this;
    UserService.instance().openBox(_this.model.id())
      .then(function(response) {
        PlayerManager.playerModel = response.playerModel();
        var event = new LEvent(CommonEvent.OPEN_BOX);
        event.model = _this.model;
        event.contents = response.contents();
        CommonEvent.dispatchEvent(event);
        _this.remove();
      });
  };
  BoxDetailDialogController.prototype._videoClick = function(event) {
    var _this = this;
    LPlatform.showVideoAsync('TEST_AD')
      .then(function() {
        UserService.instance().adUnlockBox(_this.model.id())
          .then(function(response) {
            PlayerManager.playerModel.boxs(response.boxs());
            PlayerManager.playerModel.unlockBoxAdTimesWatched(response.unlockBoxAdTimesWatched());
            CommonEvent.dispatchEvent(CommonEvent.BOXS_UPDATE);
            Common.changeButtonLabel(_this.videoButton, PlayerManager.playerModel.unlockBoxAdTimesWatched() + '/' + UNLOCK_AD_MAX_TIMES);
          });
      })
      .catch(function(error) {

      });
  };
  BoxDetailDialogController.prototype._unlockClick = function(event) {
    var _this = this;
    UserService.instance().unlockBox(_this.model.id())
      .then(function(response) {
        PlayerManager.playerModel.boxs(response.boxs());
        _this.remove();
        CommonEvent.dispatchEvent(CommonEvent.BOXS_UPDATE);
      });
  };
  BoxDetailDialogController.prototype._openClick = function(event) {
    var _this = this;
    if (_this.model.time() === 0 && _this.model.status() === 'unlock') {
      _this._open();
      return;
    }
    var params = { width: 360, height: 300, gold: BoxManager.timeToGem(_this.model.time() || _this.model.allTime()) };
    params.okEvent = function() {
      _this._open();
    };
    params.message = 'open this box?';
      
    var dialog = new ConfirmGoldDialogController(params);
    dialogLayer.addChild(dialog);
  };
  BoxDetailDialogController.prototype._addTime = function(request) {
    var _this = this;
    _this.videoButton.visible = false;
    if (_this.model.time() === 0 && _this.model.status() === 'unlock') {
      return;
    }
    var label;
    if (_this.model.status() === 'unlock') {
      label = new TimeCountDownView(_this.model.time(), true);
      _this.countDown = label;
      _this.videoButton.visible = true;
    } else {
      var time = Common.getFormatTime(_this.model.time() || _this.model.allTime());
      label = Common.getStrokeLabel({ text: time });
      label.textAlign = 'center';
    }
    label.x = 100;
    label.y = 250;
    _this.layer.addChild(label);
  };
  BoxDetailDialogController.prototype._addCards = function(request) {
    var _this = this;
    var cards = _this.model.cards();
    cards.forEach(function(child) {
      _this._addCard(child);
    });
  };
  BoxDetailDialogController.prototype._addCard = function(child) {
    var _this = this;
    var background = new CardBackgroundView();
    background.updateView(child.rarity, false);
    background.scaleX = background.scaleY = 30 / background.getWidth();
    background.x = 80 * (_this.cardLayer.numChildren / 2);
    _this.cardLayer.addChild(background);
    var amountLabel = Common.getStrokeLabel({ text: child.amount });
    amountLabel.x = background.x + 35;
    _this.cardLayer.addChild(amountLabel);
  };
  return BoxDetailDialogController;
})();