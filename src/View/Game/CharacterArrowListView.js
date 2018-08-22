var CharacterArrowListView = (function(){
    function CharacterArrowListView(model){
        var _this = this;
        _this._width = 640;
        LExtends (_this, ArrowListView, [[]]);
        _this.model = model;
        _this._addEvent();
        
    }
    CharacterArrowListView.SPEED = 2;
    CharacterArrowListView.directions = ['left', 'up', 'right', 'down', 'question'];
    CharacterArrowListView.prototype._addEvent = function(){
        var _this = this;
        _this.addEventListener(LEvent.ENTER_FRAME, _this._onFrame, _this);
        CommonEvent.addEventListener(CommonEvent.ARROW_DRAW, _this._checkDraw, _this);
        CommonEvent.addEventListener(CommonEvent.ARROW_CHECK, _this._checkGo, _this);
    };
    CharacterArrowListView.prototype._onFrame = function(event){
        var _this = this;
        if (_this.numChildren === 0 || _this.x <= -_this.getWidth()) {
            _this.init();
            return;
        }
        _this.x -= CharacterArrowListView.SPEED;
    };
    CharacterArrowListView.prototype.init = function(){
        var _this = this;
        _this.x = _this._width;
        _this.clear();
        var directions = CharacterArrowListView.directions;
        var num = (Math.random()*4 >>> 0) +2;
        for (var i = 0;i < num;i++) {
            var direction = directions[directions.length * Math.random() >>> 0];
            _this.add(direction);
        }
    };
    CharacterArrowListView.prototype._isReady = function() {
        return this.childList.findIndex(function(child){
            return !child.isDark;
        }) < 0;
    }
    CharacterArrowListView.prototype._checkGo = function(event){
        var _this = this;
        if(!_this._isReady()){
            _this._arrowsInit();
            return;
        }
        if(event.type === 'plus'){
            if(_this.numChildren !== event.arrowLength){
                _this._arrowsInit();
                return;
            }
        }
        //var e = new LEvent(event.type === 'ok' ? CommonEvent.ARROW_ATTACK:CommonEvent.ARROW_WAIT);
        var e = new LEvent(CommonEvent.ARROW_ATTACK);
        e.characterId = _this.model.id();
        //e.waitIndex = event.waitIndex;
        e.directions = [];
        var skill = _this.model.skill();
        var skillArrows = !!skill ? skill.arrows() : null;
        var skillEnabled = !!skill && _this.childList.length >= 3;
        var skillPower = 0;
        for(var i=0;i<_this.childList.length;i++){
            var child = _this.childList[i];
            if(child.direction === Direction.ALL){
                skillPower++;
            }
            var currentDirection = child.currentDirection;
            e.directions.push(currentDirection);
            if(skillEnabled && skillArrows[i] !== currentDirection){
                skillEnabled = false;
            }
        }
        /*_this.childList.forEach(function(child){
            e.directions.push(child.currentDirection);
        });*/
        if(skillEnabled){
            e.skill = skill;
        }
        CommonEvent.dispatchEvent(e);
        if(skillPower > 0){
            e = new LEvent(CommonEvent.ADD_SKILL_POWER);
            e.value = skillPower;
            CommonEvent.dispatchEvent(e);
        }
        _this.init();
    };
    CharacterArrowListView.prototype._arrowsInit = function(){
        this.childList.forEach(function(child){
            child.init();
        });
    };
    CharacterArrowListView.prototype._checkDraw = function(event){
        var _this = this;
        var inputChildList = event.inputChildList;
        _this._arrowsInit();
        var length = Math.min(inputChildList.length, _this.numChildren);
        for (var i = 0;i < length;i++) {
            var direction = inputChildList[i].direction;
            if (_this.childList[i].isAll()) {
                _this.childList[i].setState(direction, true);
            }else if (_this.childList[i].direction !== direction) {
                _this._arrowsInit();
                break;
            }
            _this.childList[i].setState(direction, true);
        }
    };
    return CharacterArrowListView;
})();