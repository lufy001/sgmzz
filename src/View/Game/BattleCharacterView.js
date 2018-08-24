var DEFAULT_BUFFER_TIME = 10;
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
        _this.addEventListener(LEvent.ENTER_FRAME, _this._onFrame, _this);
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
    BattleCharacterView.prototype.addBuffer = function(key, value, time) {
        var _this = this;
        var buffer = _this.model.getBuffer(key);
        var bufferChild = _this.bufferLayer.getChildByName(key);
        if(buffer && typeof buffer === "number"){
            _this.model.deleteBuffer(key);
            if(buffer * value < 0){
                bufferChild.visible = false;
                _this._resetBufferPosition();
                return;
            }
        }
        _this.model.addBuffer(key, value, time);

        var img = "buffer_"+key;
        if(typeof value === "number"){
            img = value > 1 ? "_up" : "_down";
        }

        if(bufferChild){
            bufferChild.bitmapData = new LBitmapData(dataList[img]);
            bufferChild.visible = true;
            _this._resetBufferPosition();
            return;
        }
        bufferChild = new LBitmap(new LBitmapData(dataList[img]));
        bufferChild.name = key;
        bufferChild.y = 64 - bufferChild.getHeight();
        _this.bufferLayer.addChild(bufferChild);
        _this._resetBufferPosition();
    };
    BattleCharacterView.prototype._deleteBufferFrame = function() {
        var _this = this;
        var keys = _this.model.autoBufferDelete();
        keys.forEach(function(key){
            var bufferChild = _this.bufferLayer.getChildByName(key);
            bufferChild.visible = false;
        });
        if(keys.length > 0){
            _this._resetBufferPosition();
        }
    };
    BattleCharacterView.prototype._onFrame = function(event) {
        var _this = this;
        _this._deleteBufferFrame();
    };
    BattleCharacterView.prototype._resetBufferPosition = function(value) {
        var _this = this;
        var position = 0;
        _this.bufferLayer.childList.forEach(function(child){
            if(child.visible){
                child.x = position;
                position += child.getWidth();
            }
        });
    };
    BattleCharacterView.prototype.addHp = function(value) {
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
        var directionCount = event.directionCount;
        var value = skill.value()[directionCount - 3];
        var skillType = skill.type();
        switch(skillType){
        	case "heal":
        		_this.addHp(value*event.hert>>0);
        		break;
        	case "dbl_atk":
        		break;
        	case "atk":
        	case "phy_def":
        	case "mag_def":
                _this.addBuffer(skillType, value, DEFAULT_BUFFER_TIME);
                break;
        	case "sleep":
        	case "poison":
        		_this.addBuffer(skillType, true, value);
        		break;
            case "all_def":
                _this.addBuffer("phy_def", value, DEFAULT_BUFFER_TIME);
                _this.addBuffer("mag_def", value, DEFAULT_BUFFER_TIME);
                break;
        }
    };
    return BattleCharacterView;
})();