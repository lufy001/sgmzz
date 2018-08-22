var RankingChildView = (function(){
    function RankingChildView(model, iss){
        var _this = this;
        var properties = {
            layer:{
                type:"LPanel",
                data:iss?"frame04":"frame05",
                width:360,
                height:50
            },  
            rankLabel:{
                type:"Label",
                properties:{
                	text:model.rank(),
                	x:10,
                	y:10
                }
            },
            playerIcon:{
                type:"LBitmap",
                data:"btn06",
                properties:{
                	x:70,
                	y:10
                }
            }, 
            nameLabel:{
                type:"Label",
                properties:{
                	text:model.name(),
                	x:150,
                	y:10
                }
            },  
            scoreLabel:{
                type:"Label",
                properties:{
                	text:model.score(),
                	x:250,
                	y:10
                }
            }
        };
        LExtends (_this, LListChildView, []);
        LExtends (_this, BaseView, [properties])
        _this.model = model;
    }
    RankingChildView.prototype.onClick = function(event){
        var _this = this;
    	var e = new LEvent(CommonEvent.SHOW_PLAYER_PROFILE);
    	e.model = _this.model;
    	CommonEvent.dispatchEvent(e);
    };
    return RankingChildView;
})();