var GameTeamView = (function(){
    function GameTeamView(){
        var _this = this;
        var properties = {
            layer:{
                type:"LSprite",
                properties:{
                    x:80
                }
            },
            hpProgress:{
                type:"ProgressView",
                params:{progress: 0, sum:2000,background:"hp_back", foreground:"hp_front"},
                properties:{
                    x:10,
                    y:330,
                    //rotate:-90
                }
            }
        };
        LExtends (_this, BaseView, [properties]);
        _this.init();
    }
    GameTeamView.prototype.init = function(){
        var _this = this;
        CommonEvent.addEventListener(CommonEvent.RESULT_CHECK, _this._onResultCheck, _this);
        CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
    };
    GameTeamView.prototype._onResultCheck = function(){
        var _this = this;
        if(_this.hpProgress.progress > 0){
        	return;
        }
        CommonEvent.dispatchEvent(CommonEvent.RESULT_FAIL);
    };
    GameTeamView.prototype._onGameStart = function(event){
        var _this = this;
        _this.layer.removeAllChild();
    	var team = UserService.instance().playerModel.team();
    	var hp = 0;
    	team.forEach(function(child){
    		hp += child.hp();
        	_this.addCharacter(child);
        });
        _this.hpProgress.updateView({progress: hp, sum:hp, fontSize:22});
    };
    GameTeamView.prototype._onHeal = function(event){
        var _this = this;
        var hp = _this.hpProgress.progress + event.value;
    	if(hp > _this.hpProgress.sum){
    		hp = _this.hpProgress.sum;
    	}
        _this.hpProgress.updateView({progress: hp, sum:_this.hpProgress.sum, fontSize:22});
    };
    GameTeamView.prototype.addCharacter = function(data){
        var _this = this;
        var character = new CharacterView(data, _this.layer.numChildren);
        character.addEventListener("player:heal", _this._onHeal, _this)
        character.y = 76*_this.layer.numChildren;
        _this.layer.addChild(character);
    };
    return GameTeamView;
})();