var BattleCharacterView = (function(){
    function BattleCharacterView(model, properties){
        var _this = this;
        properties = properties || {};
        var baseProperties = {
            layer:{
                type:"LSprite"
            },
            bufferLayer:{
                type:"LSprite"
            }
        };
        for(var key in properties){
            baseProperties[key] = properties[key];
        }
        LExtends (_this, BaseView, [baseProperties]);
        _this.model = model;
    }
    BattleCharacterView.prototype.load = function(){
        var _this = this;
        dataList.character = dataList.character || {};
        if(dataList.character[_this.model.id()]){
            _this.init(dataList.character[_this.model.id()]);
            return;
        }
        var imgs = [
            {name : "character",path : "resources/images/characters/"+_this.model.id()+".png"}
            ];
        LLoadManage.load(imgs, function(progress) {
            
        }, function(data){
            dataList.character[_this.model.id()] = data;
            _this.init(data);
        });
    };
    BattleCharacterView.prototype.init = function(data){
        var _this = this;

        var bitmapData = new LBitmapData(data["character"]);
        _this.character = new LAnimationTimeline(bitmapData, CharacterManager.getAnimationData());
        _this.character.scaleX = _this.character.scaleY = 1.4;
        CharacterManager.setAnimationLabel(_this.character);
        _this.character.speed = 3;
        _this.layer.addChild(_this.character);
        _this.character.setFrameSpeedAt(13,0,2);
    };
    BattleCharacterView.prototype.setActionDirection = function(action, direction) {
        var _this = this;
        if (_this.action == action && _this.direction == direction) {
            return;
        }
        var label = action + "-" + direction;
        _this.character.gotoAndPlay(label);
        
        _this.action = action;
        _this.direction = direction;
    };
    BattleCharacterView.prototype.addBuffer = function(key, value, state) {
        var _this = this;
        _this.model.addBuffer(key, value);
        var bufferChild = _this.bufferLayer.getChildByName(key);
        if(bufferChild){
            bufferChild.visible = true;
            return;
        }
        var img = "buffer_"+key + "_" + state;
        bufferChild = new LBitmap(new LBitmapData(dataList[img]));
        bufferChild.name = key;
        bufferChild.y = 64 - bufferChild.getHeight();
        _this.bufferLayer.addChild(bufferChild);
    };
    BattleCharacterView.prototype._onSkillStart = function(event) {
        var _this = this;
        var skill = event.skill;
        var model = event.model;
        var sameBelong = model.belong() === _this.model.belong();
        if((skill.target() === "self") ^ sameBelong){
        	return;
        }
        if(!event.isToAll && model.id() !== _this.model.id()){
        	return;
        }
        switch(skill.type()){
        	case "heal":
        	break;
        	case "atk":
        	break;
        	case "dbl_atk":
        	break;
        	case "phy_def":
        	break;
        	case "mag_def":
        	break;
        	case "all_def":
        	break;
        	case "ice":
        	break;
        	case "poison":
        	break;
        }
    };
    return BattleCharacterView;
})();