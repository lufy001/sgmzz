var CardButtonsView = (function(){
    function CardButtonsView(){
        var _this = this;
        var properties = {
            background:{
                type:"TranslucentMask",
                properties:{
                    alpha:0.01
                }
            },
            buttonLayer:{
                type:"LSprite"
            },
            buttonDetail:{
                type:"CommonButton",
                parent:"buttonLayer",
                label:"detail"
            },
            buttonUse:{
                type:"CommonButton",
                parent:"buttonLayer",
                label:"use",
                properties:{
                    y:40
                }
            }
        };
        LExtends (_this, BaseView, [properties]);
        _this.init();
    }
    CardButtonsView.prototype.init = function(){
        var _this = this;
        _this.background.addEventListener(LMouseEvent.MOUSE_DOWN, _this.hide, _this);
        _this.buttonDetail.addEventListener(LMouseEvent.MOUSE_UP, _this._detailClick, _this);
    	_this.buttonUse.addEventListener(LMouseEvent.MOUSE_UP, _this._useClick, _this);
    };
    CardButtonsView.prototype.show = function(x, y, isTeamCard){
        var _this = this;
        _this.visible = true;
        _this.buttonLayer.x = x;
        _this.buttonLayer.y = y;
        _this.buttonUse.visible = !isTeamCard;
    };
    CardButtonsView.prototype.hide = function(){
        var _this = this;
        _this.visible = false;
    };
    CardButtonsView.prototype._detailClick = function(){
        var _this = this;
        CommonEvent.dispatchEvent(CommonEvent.CARD_DETAIL_CLICK);
        _this.hide();
    };
    CardButtonsView.prototype._useClick = function(){
        var _this = this;
        CommonEvent.dispatchEvent(CommonEvent.CARD_USE_CLICK);
        _this.hide();
    };
    return CardButtonsView;
})();