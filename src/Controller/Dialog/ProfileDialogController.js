var ProfileDialogController = (function() {
  function ProfileDialogController(request) {
    var _this = this;
    var properties = {
      titleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: 'Player Profile',
          size: 32,
          textAlign: 'center',
          x: request.width * 0.5,
          y: 10
        }
      },
      levelBackground: {
        type: 'LBitmap',
        data: 'icon_level',
        parent: 'layer',
        properties: {
          x: 10,
          y: 60
        }
      },
      levelLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: '11',
          size: 20,
          textAlign: 'center',
          x: 25,
          y: 66
        }
      },
      nameLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: '',
          size: 30,
          x: 60,
          y: 60
        }
      },
      bitmapCup: {
        type: 'LBitmap',
        data: 'icon_cup',
        parent: 'layer',
        properties: {
          x: 10,
          y: 120
        }
      },
      cupBackground: {
        type: 'LBitmap',
        data: 'amount_bg',
        parent: 'layer',
        properties: {
          x: 80,
          y: 148
        }
      },
      cupTitleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: 'cup',
          size: 18,
          x: 90,
          y: 124
        }
      },
      cupLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: '',
          x: 90,
          y: 150
        }
      },
      bitmapMaxCup: {
        type: 'LBitmap',
        data: 'icon_cup',
        parent: 'layer',
        properties: {
          x: 210,
          y: 120
        }
      },
      maxCupBackground: {
        type: 'LBitmap',
        data: 'amount_bg',
        parent: 'layer',
        properties: {
          x: 280,
          y: 148
        }
      },
      maxCupTitleLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: 'best cup',
          size: 18,
          x: 290,
          y: 124
        }
      },
      maxCupLabel: {
        type: 'Label',
        parent: 'layer',
        properties: {
          text: '',
          x: 290,
          y: 150
        }
      },
      teamLayer: {
        type: 'LSprite',
        parent: 'layer',
        properties: {
          x: 10,
          y: 380
        }
      },
      teamBack: {
        type: 'LBitmap',
        parent: 'teamLayer',
        data: 'title_frame01'
      },
      teamView: {
        type: 'TeamView',
        parent: 'teamLayer',
        properties: {
          x: -10
        }
      }
    };
    request.background = { image: 'frame08', x1: 15, x2: 25, y1: 50, y2: 52 };
    LExtends(_this, DialogController, [request, properties]);
  }
  ProfileDialogController.prototype.onLoad = function(request) {
    var _this = this;
    UserService.instance().getPlayer()
      .then(function(response) {
        _this.teamView.updateView(response.team()); 
        _this.nameLabel.text = response.name();
        _this.levelLabel.text = response.lv();
        _this.cupLabel.text = response.cup();
        _this.maxCupLabel.text = response.maxCup();
      });
  };
    
  ProfileDialogController.prototype._showProfile = function(event) {
    var _this = this;
        
  };
  ProfileDialogController.prototype._showListView = function(players) {
    var _this = this;
    var items = [];
    var contentX = 0;
    var contentY = 20;
    for (var index = 0; index < players.length; index++) {
      var child = new RankingChildView(players[index], index % 2 === 0);
      items.push(child);
    }
    _this.listView.updateList(items);
  };
  return ProfileDialogController;
})();