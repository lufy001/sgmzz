var RankingPlayerModel = (function(){
    function RankingPlayerModel(data){
        var _this = this;
        _this.data = data;
    }
    RankingPlayerModel.prototype.id = function(){
    	return this.data.id;
    };
    RankingPlayerModel.prototype.name = function(){
    	return this.data.name;
    };
    RankingPlayerModel.prototype.rank = function(){
    	return this.data.rank;
    };
    RankingPlayerModel.prototype.score = function(){
    	return this.data.score;
    };
    return RankingPlayerModel;
})();