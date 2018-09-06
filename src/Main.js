var VERSION = '1.0.0';
var loadingLayer;
var dataList;
var rootLayer;
var footerView;
var headerView;
var dialogLayer;

window.setting = window.setting || {};
var loadFristData = [
  { type: 'js', path: 'src/Util/LPlugin.js' },
  { type: 'js', path: 'src/Util/MasterClient.js' },
  { type: 'js', path: 'src/Model/CharacterModel.js' },
  { type: 'js', path: 'src/Model/PlayerModel.js' },
  { type: 'js', path: 'src/Model/BoxModel.js' },
  { type: 'js', path: 'src/Model/Response/MastersResponse.js' },
  { type: 'js', path: 'src/Manager/PlayerManager.js' },
  { type: 'js', path: 'src/Service/BaseService.js' },
  { type: 'js', path: 'src/Service/UserService.js' },
  { type: 'js', path: 'src/Service/AnalyticService.js' },
  { type: 'js', path: 'src/Service/MasterService.js' }
];
var loadData = [
  { name: 'title_frame01', path: 'resources/images/ui/title_frame01.png' },
  { name: 'top_background', path: 'resources/images/ui/top_background.jpg' },
  { name: 'hp_background', path: 'resources/images/ui/hp_background.png' },
  { name: 'hp_bar', path: 'resources/images/ui/hp_bar.png' },
  { name: 'btn_single_attack', path: 'resources/images/ui/btn_single_attack.png' },
  { name: 'btn_multi_attack', path: 'resources/images/ui/btn_multi_attack.png' },
  { name: 'btn_gray', path: 'resources/images/ui/btn_gray.png' },
  { name: 'btn_gree', path: 'resources/images/ui/btn_gree.png' },
  { name: 'btn_gree_64', path: 'resources/images/ui/btn_gree_64.png' },
  { name: 'btn_gray_64', path: 'resources/images/ui/btn_gray_64.png' },
  { name: 'btn_blue_48', path: 'resources/images/ui/btn_blue_48.png' },
  { name: 'btn01', path: 'resources/images/ui/btn01.png' },
  { name: 'btn02', path: 'resources/images/ui/btn02.png' },
  { name: 'btn03', path: 'resources/images/ui/btn03.png' },
  { name: 'btn04', path: 'resources/images/ui/btn04.png' },
  { name: 'btn05', path: 'resources/images/ui/btn05.png' },
  { name: 'btn06', path: 'resources/images/ui/btn06.png' },
  { name: 'btn_on', path: 'resources/images/ui/btn_on.png' },
  { name: 'btn_off', path: 'resources/images/ui/btn_off.png' },
  { name: 'frame01', path: 'resources/images/ui/frame01.png' },
  { name: 'frame02', path: 'resources/images/ui/frame02.png' },
  { name: 'frame03', path: 'resources/images/ui/frame03.png' },
  { name: 'frame04', path: 'resources/images/ui/frame04.png' },
  { name: 'frame05', path: 'resources/images/ui/frame05.png' },
  { name: 'frame06', path: 'resources/images/ui/frame06.png' },
  { name: 'frame07', path: 'resources/images/ui/frame07.png' },
  { name: 'frame08', path: 'resources/images/ui/frame08.png' },
  { name: 'translucent', path: 'resources/images/ui/translucent.png' },
  { name: 'card_background', path: 'resources/images/ui/card_background.png' },
  { name: 'card_background_r', path: 'resources/images/ui/card_background_r.png' },
  { name: 'card_c', path: 'resources/images/ui/card_c.png' },
  { name: 'card_r', path: 'resources/images/ui/card_r.png' },
  { name: 'card_sr', path: 'resources/images/ui/card_sr.png' },
  { name: 'card_ssr', path: 'resources/images/ui/card_ssr.png' },
  { name: 'team', path: 'resources/images/ui/team.png' },
  { name: 'skill_bar_bg', path: 'resources/images/ui/skill_bar_bg.png' },
  { name: 'skill_bar_front', path: 'resources/images/ui/skill_bar_front.png' },
  { name: 'amount_bg', path: 'resources/images/ui/amount_bg.png' },
  { name: 'amount_front', path: 'resources/images/ui/amount_front.png' },
  { name: 'amount_front_green', path: 'resources/images/ui/amount_front_green.png' },
  { name: 'icon_quit', path: 'resources/images/icons/quit.png' },
  { name: 'icon_attack', path: 'resources/images/icons/attack.png' },
  { name: 'icon_hp', path: 'resources/images/icons/hp.png' },
  { name: 'icon_speed', path: 'resources/images/icons/speed.png' },
  { name: 'icon_time', path: 'resources/images/icons/time.png' },
  { name: 'icon_coin', path: 'resources/images/icons/coin.png' },
  { name: 'icon_gem', path: 'resources/images/icons/gem.png' },
  { name: 'icon_dollar', path: 'resources/images/icons/dollar.png' },
  { name: 'icon_lock', path: 'resources/images/icons/lock.png' },
  { name: 'icon_cup', path: 'resources/images/icons/cup.png' },
  { name: 'icon_setting', path: 'resources/images/icons/setting.png' },
  { name: 'icon_level', path: 'resources/images/icons/level.png' },
  { name: 'icon_shop', path: 'resources/images/icons/shop.png' },
  { name: 'icon_home', path: 'resources/images/icons/home.png' },
  { name: 'icon_group', path: 'resources/images/icons/group.png' },
  { name: 'icon_events', path: 'resources/images/icons/events.png' },
  { name: 'icon_cards', path: 'resources/images/icons/cards.png' },
  { name: 'icon_ranking', path: 'resources/images/icons/ranking.png' },
  { name: 'icon_news', path: 'resources/images/icons/news.png' },
  { name: 'icon_game_menu', path: 'resources/images/icons/game_menu.png' },
  { name: 'icon_ok', path: 'resources/images/icons/ok.png' },
  { name: 'icon_exclamation', path: 'resources/images/icons/exclamation.png' },
  { name: 'icon_search', path: 'resources/images/icons/search.png' },
  { name: 'icon_video', path: 'resources/images/icons/video.png' },

  { name: 'buffer_phy_def_down', path: 'resources/images/status/buffer_phy_def_down.png' },
  { name: 'buffer_phy_def_up', path: 'resources/images/status/buffer_phy_def_up.png' },
  { name: 'buffer_mac_def_down', path: 'resources/images/status/buffer_mac_def_down.png' },
  { name: 'buffer_mac_def_up', path: 'resources/images/status/buffer_mac_def_up.png' },
  { name: 'buffer_atk_down', path: 'resources/images/status/buffer_phy_atk_down.png' },
  { name: 'buffer_atk_up', path: 'resources/images/status/buffer_phy_atk_up.png' },
  { name: 'buffer_poison', path: 'resources/images/status/buffer_poison.png' },
  { name: 'buffer_sleep', path: 'resources/images/status/buffer_sleep.png' },
  
  { name: 'chapter-title', path: 'resources/images/chapter/chapter-title.png' },
  { name: 'area-background', path: 'resources/images/chapter/area-background.png' },
  { name: 'stage-background', path: 'resources/images/chapter/stage-background.png' },

  { name: 'arrow-question', path: 'resources/images/game/arrow-question.png' },
  { name: 'arrow-down', path: 'resources/images/game/arrow-down.png' },
  { name: 'arrow-up', path: 'resources/images/game/arrow-up.png' },
  { name: 'arrow-left', path: 'resources/images/game/arrow-left.png' },
  { name: 'arrow-right', path: 'resources/images/game/arrow-right.png' },
  { name: 'dark-arrow-down', path: 'resources/images/game/dark-arrow-down.png' },
  { name: 'dark-arrow-up', path: 'resources/images/game/dark-arrow-up.png' },
  { name: 'dark-arrow-left', path: 'resources/images/game/dark-arrow-left.png' },
  { name: 'dark-arrow-right', path: 'resources/images/game/dark-arrow-right.png' },
  { name: 'button-down', path: 'resources/images/game/button-down.png' },
  { name: 'button-up', path: 'resources/images/game/button-up.png' },
  { name: 'button-left', path: 'resources/images/game/button-left.png' },
  { name: 'button-right', path: 'resources/images/game/button-right.png' },
  { name: 'button-ok', path: 'resources/images/game/button-ok.png' },
  { name: 'button-plus', path: 'resources/images/game/button-plus.png' },
  { name: 'arrow_board', path: 'resources/images/game/arrow_board.png' },
  { name: 'arrow-select', path: 'resources/images/game/arrow-select.png' },
  { name: 'hp_back', path: 'resources/images/game/hp_back.png' },
  { name: 'hp_front', path: 'resources/images/game/hp_front.png' },
  { name: 'hp_back_mini', path: 'resources/images/game/hp_back_mini.png' },
  { name: 'hp_front_mini', path: 'resources/images/game/hp_front_mini.png' },

  { type: 'js', path: 'src/Config/CharacterConfig.js' },
  { type: 'js', path: 'src/Config/GameConfig.js' },
  { type: 'js', path: 'src/Manager/GameManager.js' },
  { type: 'js', path: 'src/Manager/CharacterManager.js' },
  { type: 'js', path: 'src/Manager/EffectManager.js' },
  { type: 'js', path: 'src/Manager/SkillManager.js' },
  { type: 'js', path: 'src/Manager/LevelManager.js' },
  { type: 'js', path: 'src/Manager/BoxManager.js' },

  { type: 'js', path: 'src/Service/RankingService.js' },
  { type: 'js', path: 'src/Service/GameService.js' },
  { type: 'js', path: 'src/Service/CardService.js' },
  { type: 'js', path: 'src/Service/ShopService.js' },

  { type: 'js', path: 'src/Core/AutoDisplayObject.js' },
  { type: 'js', path: 'src/Controller/BaseController.js' },
  { type: 'js', path: 'src/Controller/CardsController.js' },
  { type: 'js', path: 'src/Controller/HomeController.js' },
  { type: 'js', path: 'src/Controller/GameController.js' },
  { type: 'js', path: 'src/Controller/GroupController.js' },
  { type: 'js', path: 'src/Controller/ShopController.js' },
  { type: 'js', path: 'src/Controller/EventsController.js' },
  { type: 'js', path: 'src/Controller/ChapterMapController.js' },
  { type: 'js', path: 'src/Controller/Dialog/DialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/CardDetailDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/ConfirmGoldDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/HomeBoxsDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/BoxDetailDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/ShopBoxDetailDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/ShopItemDetailDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/SettingDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/ContentsGetDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/NewsDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/RankingDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/ProfileDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/MatchDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/AlertDialogController.js' },
  { type: 'js', path: 'src/Model/Master/CharacterMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/ChapterMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/StageMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/EffectMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/SkillMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/BoxMasterModel.js' },
  { type: 'js', path: 'src/Model/Response/RankingResponse.js' },
  { type: 'js', path: 'src/Model/Response/OpenBoxResponse.js' },
  { type: 'js', path: 'src/Model/Response/BattleResultResponse.js' },
  { type: 'js', path: 'src/Model/Response/BuyResponse.js' },
  { type: 'js', path: 'src/Model/Response/PlayerResponse.js' },
  { type: 'js', path: 'src/Model/Response/UnlockBoxResponse.js' },
  { type: 'js', path: 'src/Model/RankingPlayerModel.js' },
  { type: 'js', path: 'src/Model/SkillModel.js' },
  { type: 'js', path: 'src/Model/EffectModel.js' },
  { type: 'js', path: 'src/Model/ContentsModel.js' },
  { type: 'js', path: 'src/Model/EnemyModel.js' },
  { type: 'js', path: 'src/Model/OpponentModel.js' },
  { type: 'js', path: 'src/View/Common/BaseView.js' },
  { type: 'js', path: 'src/View/Common/SkillIconView.js' },
  { type: 'js', path: 'src/View/Common/BoxIconView.js' },
  { type: 'js', path: 'src/View/Common/CardBackgroundView.js' },
  { type: 'js', path: 'src/View/Common/CardView.js' },
  { type: 'js', path: 'src/View/Common/ContentCardView.js' },
  { type: 'js', path: 'src/View/Common/TimeCountDownView.js' },
  { type: 'js', path: 'src/View/Common/ProgressView.js' },
  { type: 'js', path: 'src/View/Common/HeaderView.js' },
  { type: 'js', path: 'src/View/Common/IconStatusView.js' },
  { type: 'js', path: 'src/View/Common/CheckboxView.js' },
  { type: 'js', path: 'src/View/Home/HomeBoxView.js' },
  { type: 'js', path: 'src/View/Home/HomeCupView.js' },
  { type: 'js', path: 'src/View/Home/HomePlayerView.js' },
  { type: 'js', path: 'src/View/Home/NewsChildView.js' },
  { type: 'js', path: 'src/View/Home/RankingChildView.js' },
  { type: 'js', path: 'src/View/Footer/FooterView.js' },
  { type: 'js', path: 'src/View/Footer/FooterButtonView.js' },
  { type: 'js', path: 'src/View/Cards/TeamView.js' },
  { type: 'js', path: 'src/View/Cards/PlayerTeamView.js' },
  { type: 'js', path: 'src/View/Cards/CardChildView.js' },
  { type: 'js', path: 'src/View/Cards/CardButtonsView.js' },
  { type: 'js', path: 'src/View/Cards/SelectCardView.js' },
  { type: 'js', path: 'src/View/Cards/CardStatusView.js' },
  { type: 'js', path: 'src/Util/PseudoRandom.js' },
  { type: 'js', path: 'src/Util/Common.js' },
  { type: 'js', path: 'src/Util/CommonEvent.js' },
  
  { type: 'js', path: 'src/View/ChapterMap/ChapterMapChildView.js' },
  { type: 'js', path: 'src/View/ChapterMap/StageChildView.js' },

  { type: 'js', path: 'src/View/Game/BattleView.js' },
  { type: 'js', path: 'src/View/Game/BattleCharacterView.js' },
  { type: 'js', path: 'src/View/Game/CharacterView.js' },
  { type: 'js', path: 'src/View/Game/CtrlView.js' },
  { type: 'js', path: 'src/View/Game/GameMapView.js' },
  { type: 'js', path: 'src/View/Game/GameMenuView.js' },
  { type: 'js', path: 'src/View/Game/BaseTeamView.js' },
  { type: 'js', path: 'src/View/Game/GameTeamView.js' },
  { type: 'js', path: 'src/View/Game/EnemyTeamView.js' },
  { type: 'js', path: 'src/View/Game/OpponentTeamView.js' },
  { type: 'js', path: 'src/View/Game/EnemyView.js' },
  { type: 'js', path: 'src/View/Game/OpponentCharacterView.js' },
  { type: 'js', path: 'src/View/Game/ArrowView.js' },
  { type: 'js', path: 'src/View/Game/ArrowBoardView.js' },
  { type: 'js', path: 'src/View/Game/ArrowListView.js' },
  { type: 'js', path: 'src/View/Game/CharacterArrowListView.js' },
  { type: 'js', path: 'src/View/Game/BattleSkillIconView.js' },
  { type: 'js', path: 'src/View/Game/BattleResultView.js' },
  { type: 'js', path: 'src/View/Game/ResultParamView.js' },

  { type: 'js', path: 'src/View/Shop/ShopTitleView.js' },
  { type: 'js', path: 'src/View/Shop/ShopItemView.js' }
];
LGlobal.aspectRatio = PORTRAIT;
var width = 480;
var height = window.innerHeight * width / window.innerWidth;
LInit(1000 / 30, 'legend', width, height, main);
function main() {
  LGlobal.setDebug(true);
  if (LGlobal.mobile) {
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LSystem.screen(LStage.FULL_SCREEN);
  }
  if (window.setting.isLocal) {
    loadingLayer = new LoadingSample4();
    addChild(loadingLayer);
    FBInstant.setLoadingDisplay(loadingLayer);
  }
  LPlatform.initializeAsync()
    .then(function() {
      LLoadManage.load(loadFristData, function(progress) {
        LPlatform.setLoadingProgress(progress * 0.1);
      }, dataFristLoadComplete);
    });
}
function dataFristLoadComplete(data) {
  var playerId = LPlatform.player().getID();
  var playerName = LPlatform.player().getName();
  AnalyticService.instance().setUserId(playerId);
  AnalyticService.instance().setUserProperties('version', VERSION, false);
  
  UserService.instance().login(playerId, playerName)
    .then(function(playerModel) {
      PlayerManager.playerModel = playerModel;
      LPlatform.setLoadingProgress(15);
      return MasterService.instance().getList(playerModel.versions());
    })
    .then(function(response) {
      dataLoad();
    });
}
function dataLoad() {
  LLoadManage.load(loadData, function(progress) {
    LPlatform.setLoadingProgress(20 + progress * 0.8);
  }, dataLoadComplete);
}
function dataLoadComplete(data) {
  var master = MasterService.instance().masters;
  CharacterManager.setMasters(master.masterCharacters());
  SkillManager.setMasters(master.masterSkills());
  BoxManager.setMasters(master.masterBoxs());
  LevelManager.setMasters(master.masterLevel());
  dataList = data;
  onGameStart();
}

function onGameStart() {
  if (loadingLayer) {
    loadingLayer.remove();
    loadingLayer = null;
  }
  addCommonBackground();
  rootLayer = new LSprite();
  addChild(rootLayer);
  
  footerView = new FooterView();
  addChild(footerView);

  headerView = new HeaderView();
  addChild(headerView);

  dialogLayer = new LSprite();
  addChild(dialogLayer);

  Common.changeScene('HomeController', { });

  LPlatform.startGameAsync()
    .then(function() {
      return LPlatform.getDataAsync('player_data');
    })
    .then(function(data) {
      PlayerManager.playerData = data || {};
      if (typeof PlayerManager.playerData.isNew === UNDEFINED) {
        PlayerManager.playerData.isNew = true;
      } else {
        PlayerManager.playerData.isNew = false;
        LPlatform.choose();
      }
      return LPlatform.setDataAsync('player_data', PlayerManager.playerData);
    });
}
function addCommonBackground() {
  var imgBackground = new LBitmapData(dataList['top_background']);
  var scale = 1;
  if (imgBackground.width / imgBackground.height > LGlobal.width / LGlobal.height) {
    scale = LGlobal.height / imgBackground.height;
  } else {
    scale = LGlobal.width / imgBackground.width;
  }
  var bitmap = new LBitmap(imgBackground);
  bitmap.scaleX = bitmap.scaleY = scale;
  addChild(bitmap);
}