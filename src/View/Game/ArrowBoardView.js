var ArrowBoardView = (function(){
    function ArrowBoardView(){
        var _this = this;
        var properties = {
            background:{
                type:"LBitmap",
                data:"arrow_board"
            },
            layer:{
                type:"LSprite",
                properties:{
                	y:10
                }
            },
            inputArrowList:{
                type:"ArrowListView",
                properties:{
                    x:15,
                    y:200
                }
            },
            /*skillArrowList:{
                type:"ArrowListView",
                properties:{
                    x:10,
                    y:250,
                    scaleX:0.8,
                    scaleY:0.8
                }
            }*/
            skillProgress:{
                type:"ProgressView",
                params:{progress: 0, sum:50,background:"hp_back", foreground:"hp_front", labelVisible:false},
                properties:{
                    x:10,
                    y:260,
                }
            }
        };
        LExtends (_this, BaseView, [properties]);
        _this.init();
    }
    ArrowBoardView.prototype.init = function(){
        var _this = this;
        _this.layer.mask = new LSprite();
        _this.layer.mask.graphics.drawRect(0, "#ff0000", [20, 15, 600, 160]);
        CommonEvent.addEventListener(CommonEvent.GAME_START, _this._onGameStart, _this);
        CommonEvent.addEventListener(CommonEvent.ARROW_CLICK, _this._arrowClick, _this);
        CommonEvent.addEventListener(CommonEvent.ADD_SKILL_POWER, _this._onAddSkillPower, _this);
        //CommonEvent.addEventListener(CommonEvent.ARROW_WAIT, _this._arrowWait, _this);
    };
    ArrowBoardView.prototype._onGameStart = function(event){
        var _this = this;
        _this.layer.removeAllChild();
        UserService.instance().playerModel.team().forEach(function(child){
        	_this._addArrowList(child);
        });
        _this.skillProgress.updateView({progress: 0, sum:_this.skillProgress.sum});
    };
    ArrowBoardView.prototype._addArrowList = function(model){
        var _this = this;
        var arrowList = new CharacterArrowListView(model);
        arrowList.y = _this.layer.numChildren * 40;
        _this.layer.addChild(arrowList);
    };
    ArrowBoardView.prototype._onAddSkillPower = function(event){
        var _this = this;
        var progress = _this.skillProgress.progress + event.value;
        if(progress < 0){
            progress = 0;
        }else if(progress >= _this.skillProgress.sum){
            progress = _this.skillProgress.sum;
            CommonEvent.dispatchEvent(CommonEvent.SKILL_READY);
        }
        _this.skillProgress.updateView({progress: progress, sum:_this.skillProgress.sum});
    };
    /*
    ArrowBoardView.prototype._arrowWait = function(event){
        var _this = this;
        if(event.waitIndex !== _this.skillArrowList.numChildren){
            return;
        }
        event.directions.forEach(function(direction){
        	_this.skillArrowList.add(direction);
        });
    };*/
    ArrowBoardView.prototype._arrowClick = function(event){
        var _this = this;
        
        var e;
        if(event.input === 'ok'/* || event.input === 'plus'*/){
            e = new LEvent(CommonEvent.ARROW_CHECK);
            e.type = event.input;
            //e.waitIndex = _this.skillArrowList.numChildren;
            e.arrowLength = _this.inputArrowList.numChildren;
            _this.inputArrowList.clear();
        }else{
        	_this.inputArrowList.add(event.input);
            e = new LEvent(CommonEvent.ARROW_DRAW);
            e.inputChildList = _this.inputArrowList.childList;
        }
        CommonEvent.dispatchEvent(e);
    };
    return ArrowBoardView;
})();