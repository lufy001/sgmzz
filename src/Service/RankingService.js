var RankingService = (function(){
    function RankingService(){
        var _this = this;
        LExtends (_this, BaseService, []);
    }
    RankingService.prototype.getList = function(){
        var _this = this;
        var action = {
        	"class":"master",
        	"method":"getList"
        };
        var request = {"keys":["news"]};
        if(!window.setting.isLocal){
        	return _this.send(action, request);
		}

        var players = [
            {id:"fb1", rank:1,name:"aaa", score:5555}, 
            {id:"fb2", rank:2,name:"bbb", score:5535}, 
            {id:"fb3", rank:3,name:"ccc", score:5525}, 
            {id:"fb4", rank:4,name:"ddd", score:5515}, 
            {id:"fb5", rank:5,name:"eee", score:5455}, 
            {id:"fb6", rank:6,name:"fff", score:5445}, 
            {id:"fb7", rank:7,name:"ggg", score:5435}, 
            {id:"fb8", rank:8,name:"hhh", score:5425}, 
            {id:"fb9", rank:9,name:"iii", score:5415}
        ];
        
        var res = {
            players:players
        };
        var response = new RankingResponse(res);
        _this.players = response;
        return Promise.resolve(response);
    };
    RankingService._instance;
    RankingService.instance = function(){
        RankingService._instance = RankingService._instance || new RankingService();
        return RankingService._instance;
    };
    return RankingService;
})();