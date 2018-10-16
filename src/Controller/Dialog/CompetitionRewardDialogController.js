var CompetitionRewardDialogController = (function() {
  function CompetitionRewardDialogController(request) {
    var _this = this;
    _this.closeEvent = request.closeEvent;
    var competitionReward = PlayerManager.playerModel.competitionReward();
    var properties = {
      title: {
        type: 'Label',
        parent: 'layer',
        properties: {
          x: request.width * 0.5,
          y: 30,
          text: Localization.get('赛季奖励'),
          size: 30,
          textAlign: 'center'
        }
      },
      boxView: {
        type: 'BoxIconView',
        parent: 'layer',
        params: competitionReward.box(),
        properties: {
          x: 130,
          y: 70
        }
      },
      messageLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: '赛季排名:' + competitionReward.rank(),
          textAlign: 'center',
          size: 20,
          x: 180,
          y: 180
        }
      },
      button: {
        type: 'CommonButton',
        onClick: '_onClose',
        label: 'OK',
        params: { img: 'btn03' },
        parent: 'layer',
        properties: {
          text: '',
          size: 28,
          x: 100,
          y: 210
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  CompetitionRewardDialogController.prototype.onLoad = function(request) {
    var _this = this;
    _this.boxView.labelLevel.visible = false;
  };
  CompetitionRewardDialogController.prototype.onClose = function() {
    var _this = this;
    this.closeEvent();
    var competitionReward = PlayerManager.playerModel.competitionReward();
    var event = new LEvent(CommonEvent.OPEN_BOX);
    event.model = _this.model;
    event.contents = competitionReward.contents();
    CommonEvent.dispatchEvent(event);
  };
  return CompetitionRewardDialogController;
})();