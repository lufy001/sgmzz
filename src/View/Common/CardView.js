var CardView = (function(){
    function CardView(model){
        var _this = this;
        var properties = {
            layer:{
                type:"LSprite"
            },
            background:{
                type:"CardBackgroundView",
                parent:"layer"
            },
            amountProgress:{
                type:"ProgressView",
                params:{background:"amount_bg",foreground:"amount_front"},
                properties:{
                    y:118
                }
            },
            levelLabel:{
                type:"Label",
                properties:{
                    text:"0",
                    size:16,
                    textAlign:"center",
                    x:50,
                    y:90
                }
            }
        };
        LExtends (_this, BaseView, [properties]);
        _this.updateView(model);
    }
    CardView.prototype._updateBackground = function(){
        var _this = this;
        var model = _this.characterModel;
        var rarity = model.rarity && model.rarity() ? model.rarity() : "c";
        _this.background.updateView(rarity, !model.id);
    };
    CardView.prototype._updateAmount = function(){
        var _this = this;
        var levelData = LevelManager.getMaster(_this.characterModel.level());
        var params = {progress: _this.characterModel.amount(), sum:levelData.amount};
        params.background = "amount_bg";
        params.foreground = _this.characterModel.amount() < levelData.amount ? "amount_front" : "amount_front_green";
        _this.amountProgress.updateView(params);
    };
    CardView.prototype.load = function(){
        var _this = this;
        if(!_this.characterModel.id){
            return;
        }
        dataList.character = dataList.character || {};
        if(dataList.character[_this.characterModel.id()]){
            _this.init(dataList.character[_this.characterModel.id()]);
            return;
        }
        var imgs = [
            {name : "character",path : "resources/images/characters/"+_this.characterModel.id()+".png"}
            ];
        LLoadManage.load(imgs, function(progress) {
            
        }, function(data){
            dataList.character[_this.characterModel.id()] = data;
            _this.init(data);
        });
    };
    CardView.prototype._updateLevel = function(){
        var _this = this;
        _this.levelLabel.text = "level " + _this.characterModel.level();
    };
    CardView.prototype.init = function(data){
        var _this = this;
        if(_this.anime){
            _this.anime.remove();
        }
        var bitmapData = new LBitmapData(data["character"]);
        _this.anime = new LAnimationTimeline(bitmapData, CharacterManager.getAnimationData());
        _this.anime.x = 18;
        _this.anime.y = 18;
        CharacterManager.setAnimationLabel(_this.anime);
        _this.layer.addChild(_this.anime);
        var label = CharacterAction.STAND + "-" + CharacterDirection.DOWN;
        _this.anime.gotoAndPlay(label);
        
        setTimeout(function(){
        	_this.dispatchEvent(LEvent.COMPLETE);
        });
    };
    CardView.prototype.updateView = function(model){
    	var _this = this;
        _this.characterModel = model;
        _this._updateBackground();
        if(_this.characterModel.id){
            _this._updateAmount();
            _this._updateLevel();
            _this.load();
        }else{
            _this.amountProgress.visible = false;
            _this.levelLabel.visible = false;
        }
    };
    return CardView;
})();