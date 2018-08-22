var EnemyView = (function(){
    function EnemyView(model, scale){
        var _this = this;
        _this._scale = scale;
        var properties = {
            hpProgress:{
                type:"ProgressView",
                params:{background:"hp_back_mini",foreground:"hp_front_mini"},
                properties:{
                    y:-5
                }
            },
            selectIcon:{
                type:"LBitmap",
                data:"arrow-select",
                properties:{
                    x:30,
                    y:0,
                    visible:false
                }
            },
        };
        LExtends (_this, BattleCharacterView, [model, properties]);
        _this.updateView(model);
        _this._addEvent();
    }
    
    EnemyView.prototype._characterInit = function(){
    	var _this = this;
    	_this.character.scaleX = _this.character.scaleY = _this._scale;
    	_this.character.x = -_this.character.getWidth()*0.5;
    	_this.character.y = -_this.character.getHeight();
        _this.hpProgress.x = -_this.hpProgress.getWidth()*0.5;
    	_this.selectIcon.x = _this.selectIcon.getWidth();
    	_this.selectIcon.y = _this.character.y + (_this.character.getHeight()-_this.selectIcon.getHeight())*0.5;
    };
    
    EnemyView.prototype.init = function(data){
        var _this = this;
        _this.callParent("init",arguments);
        
        _this.setActionDirection(CharacterAction.MOVE, CharacterDirection.LEFT);
        _this._characterInit();
    };

    EnemyView.prototype.updateView = function(model){
    	var _this = this;
        _this.characterModel = model;
        _this.hpProgress.updateView({progress: _this.characterModel.hp(), sum:_this.characterModel.hp(), fontSize:14});
        _this.load();
    };
    EnemyView.prototype._addEvent = function(){
    	var _this = this;
    	CommonEvent.addEventListener(CommonEvent.SELECT_ENEMY, _this._onSelectEnemy, _this);
    	CommonEvent.addEventListener(CommonEvent.ENEMY_HERT, _this._onEnemyHert, _this);
        _this.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
    };
    EnemyView.prototype.die = function(){
    	CommonEvent.removeEventListener(CommonEvent.SELECT_ENEMY, this._onSelectEnemy, this);
    	CommonEvent.removeEventListener(CommonEvent.ENEMY_HERT, this._onEnemyHert, this);
    	this.callParent("die");
    };
    EnemyView.prototype._onClick = function(event){
    	this.toSelect();
    };
    EnemyView.prototype.toSelect = function(){
    	var _this = this;
    	var e = new LEvent(CommonEvent.SELECT_ENEMY);
    	e.model = _this.characterModel;
        CommonEvent.dispatchEvent(e);
    };
    EnemyView.prototype._onSelectEnemy = function(event){
    	var _this = this;
    	var model = event.model;
    	_this.selectIcon.visible = _this.characterModel.id() === model.id();
    };
    EnemyView.prototype._onEnemyHert = function(event){
    	var _this = this;
    	if(!_this.selectIcon.visible){
    		return;
    	}
        var hert = event.hertValue;
        if(event.attackType === "physice"){
            hert = hert * _this.characterModel.physiceDefense();
        }else{
            hert = hert * _this.characterModel.magicDefense();
        }
    	var hp = _this.hpProgress.progress - hert;
    	_this.hpProgress.updateView({progress: hp>=0?hp:0, fontSize:14});
    	if(hp<=0){
    		_this.remove();
    		CommonEvent.dispatchEvent(CommonEvent.RESULT_CHECK);
    	}
    };
    return EnemyView;
})();