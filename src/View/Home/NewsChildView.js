var NewsChildView = (function(){
    function NewsChildView(model, iss){
        var _this = this;
        var properties = {
            cupLayer:{
                type:"LPanel",
                data:iss?"frame04":"frame05",
                width:360,
                height:50
            },  
            titleLabel:{
                type:"Label",
                properties:{
                	text:model.title,
                	x:10,
                	y:10
                }
            }    
        };
        LExtends (_this, LListChildView, []);
        LExtends (_this, BaseView, [properties])
        _this.model = model;
    }
    NewsChildView.prototype.onClick = function(event){
        var _this = this;
    	var e = new LEvent(CommonEvent.SHOW_NEWS_MESSAGE);
    	e.model = _this.model;
    	CommonEvent.dispatchEvent(e);
    };
    return NewsChildView;
})();