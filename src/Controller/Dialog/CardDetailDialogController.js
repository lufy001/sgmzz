var CardDetailDialogController = (function() {
  function CardDetailDialogController(request) {
    var _this = this;
    var model = request.model;
    var skill = model.skill();
    var levelData = LevelManager.getMaster(model.level());
    var properties = {
      background: {
        type: 'LPanel',
        parent: 'layer',
        data: 'frame02',
        width: request.width - 20,
        height: request.height - 80,
        properties: {
          x: 10,
          y: 60
        }
      },
      typeBackground: {
        type: 'LPanel',
        parent: 'layer',
        data: 'frame03',
        width: 260,
        height: 50,
        properties: {
          x: 130,
          y: 70
        }
      },
      cardView: {
        type: 'CardView',
        parent: 'layer',
        params: request.model,
        properties: {
          x: 20,
          y: 70
        }
      },
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: request.width * 0.5,
          y: 10,
          text: request.model.name(),
          size: 24,
          textAlign: 'center'
        }
      },
      labelType: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 260,
          y: 80,
          text: Localization.get('rarity') + ' : ' + request.model.rarity(),
          size: 24,
          textAlign: 'center'
        }
      },
      labelIntroduction: {
        type: 'Label',
        parent: 'layer',
        wordWrap: true,
        lineHeight: 20,
        properties: {
          x: 130,
          y: 130,
          width: 260,
          text: request.model.introduction(),
          size: 14
        }
      },
      statusHert: {
        type: 'CardStatusView',
        parent: 'layer',
        params: { label: 'hert', value: model.hert(), background: 'frame04', icon: 'icon_attack' },
        properties: {
          x: 30,
          y: 260
        }
      },
      statusHp: {
        type: 'CardStatusView',
        parent: 'layer',
        params: { label: 'hp', value: model.hp(), background: 'frame04', icon: 'icon_hp' },
        properties: {
          x: 230,
          y: 260
        }
      },
      statusSpeed: {
        type: 'CardStatusView',
        parent: 'layer',
        params: { 
          label: 'speed', 
          value: Localization.get(model.attackSpeed()), 
          background: 'frame05', icon: 'icon_speed' },
        properties: {
          x: 30,
          y: 320
        }
      },
      statusAttackType: {
        type: 'CardStatusView',
        parent: 'layer',
        params: { 
          label: 'attackType', 
          value: Localization.get(model.attackType()), 
          background: 'frame05', icon: 'icon_speed' },
        properties: {
          x: 230,
          y: 320
        }
      },
      skillIcon: {
        type: 'SkillIconView',
        parent: 'layer',
        params: skill,
        properties: {
          x: 30,
          y: 390
        }
      },
      skillName: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: 100,
          y: 390,
          text: skill.name(),
          size: 24
        }
      },
      skilIntroduction: {
        type: 'Label',
        parent: 'layer',
        wordWrap: true,
        lineHeight: 18,
        properties: {
          x: 100,
          y: 420,
          width: 300,
          text: skill.introduction(),
          size: 16
        }
      },
      buttonLevelUp: {
        type: 'CommonButton',
        parent: 'layer',
        label: levelData.coin,
        params: { img: 'btn03' },
        properties: {
          x: (request.width - 160) * 0.5,
          y: request.height - 90
        }
      },
      buttonDisabled: {
        type: 'CommonButton',
        parent: 'layer',
        label: levelData.coin,
        params: { img: 'btn04' },
        properties: {
          x: (request.width - 160) * 0.5,
          y: request.height - 90
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  CardDetailDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.model = request.model;

    _this.buttonLevelUp.addEventListener(LMouseEvent.MOUSE_UP, _this._levelUpClick, _this);
    _this.updateView();
  };
  CardDetailDialogController.prototype.updateView = function() {
    var _this = this;
    var levelData = LevelManager.getMaster(_this.model.level());
    var canUp = _this.model.amount() >= levelData.amount && PlayerManager.playerModel.coin() >= levelData.coin;
    _this.buttonLevelUp.visible = canUp;
    _this.buttonDisabled.visible = !canUp;
  };
  CardDetailDialogController.prototype._levelUpClick = function(event) {
    var _this = this;
    CardService.instance().levelUp(_this.model.id())
      .then(function(playerModel) {
        PlayerManager.playerModel = playerModel;
        CommonEvent.dispatchEvent(CommonEvent.CARD_LIST_UPDATE);
        var model = PlayerManager.playerModel.getCharacter(_this.model.id());
        _this.remove();
        var dialog = new CardDetailDialogController({ width: 440, height: 560, model: model });
        dialogLayer.addChild(dialog);
      });
  };
  return CardDetailDialogController;
})();