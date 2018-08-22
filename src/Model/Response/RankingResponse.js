var RankingResponse = (function(){
    function RankingResponse(data){
        var _this = this;
        _this.data = data;
    }
    RankingResponse.prototype.players = function(){
        var _this = this;
        if(!_this.data._players){
            _this.data._players = [];
            for(var i=0;i<_this.data.players.length;i++){
                var rankingPlayer = new RankingPlayerModel(_this.data.players[i]);
                _this.data._players.push(rankingPlayer);
            }
        }
        return _this.data._players;
    };
    
    
    return RankingResponse;
})();