var SelectCardView = (function(){
    function SelectCardView(){
        var _this = this;
        var properties = {
            background:{
                type:"TranslucentMask",
                properties:{
                    alpha:0.01
                }
            }
        };
        LExtends (_this, BaseView, [properties]);
        _this.init();
    }
    SelectCardView.prototype.init = function(data){
        var _this = this;
        _this.background.addEventListener(LMouseEvent.MOUSE_UP, _this.hide, _this);
    };
    SelectCardView.prototype.show = function(model){
        var _this = this;
        _this.visible = true;
        _this.setCard(model);
    };
    SelectCardView.prototype.hide = function(){
        var _this = this;
        _this.visible = false;
        CommonEvent.dispatchEvent(CommonEvent.CARD_USE_CANCEL);
    };
    SelectCardView.prototype.setCard = function(model){
        var _this = this;
        if(_this.cardView){
        	_this.cardView.updateView(model);
        }else{
        	_this.cardView = new CardView(model);
        	_this.cardView.x = (LGlobal.width-_this.cardView.getWidth())*0.5;
        	_this.addChild(_this.cardView);
        }
        
    };
    return SelectCardView;
})();