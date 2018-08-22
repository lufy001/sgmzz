var BattleCardView = (function(){
    function BattleCardView(model, index){
        var _this = this;
        LExtends (_this, CardView, [model]);
        _this._index = index;
        _this._battleInit();
    }
    
    BattleCardView.prototype._battleInit = function(){
    	var _this = this;
        _this.amountProgress.visible = false;
        var bitmapData = new LBitmapData(data["character"]);
        _this.anime = new LAnimationTimeline(bitmapData, CharacterManager.getAnimationData());
        CharacterManager.setAnimationLabel(_this.anime);
        _this.anime.speed = 2;
        _this.layer.addChild(_this.anime);
        _this.anime.setFrameSpeedAt(13,0,2);
        _this.setActionDirection(CharacterAction.MOVE, _this.defaultDirection);

        
        CommonEvent.addEventListener(CommonEvent.ARROW_ATTACK, _this._checkAttack, _this);
    };
    BattleCardView.prototype.characterInit = function(){
        var _this = this;
        _this.callParent("characterInit", arguments);
        _this.character.scaleX = _this.character.scaleY = 1.5;
        _this.character.x = 3;
        _this.character.y = 3;
    };
    BattleCardView.prototype._checkAttack = function(event){
        var _this = this;
        if(_this._index !== event.index){
            return;
        }
        var directions = event.directions;
        var hert = 50;
        LTweenLite.to(_this, 0.1, { y: -15, onComplete: function() {
            let event = new LEvent(CommonEvent.ENEMY_HERT);
            event.hertValue = hert;
            CommonEvent.dispatchEvent(event);
        } }).to(_this, 0.1, { y: 0, delay: 0.1, onComplete: function() {} });
    };
    return BattleCardView;
})();