var FBInstant = (function(){
    function FBInstant(){
    	this.player = {
        	getID:function(){
        		return "000";
        	}
        };
    }
    
    FBInstant.prototype.initializeAsync = function(){
        return Promise.resolve();
    };
    FBInstant.prototype.startGameAsync = function(){
        return Promise.resolve();
    };
    FBInstant.prototype.setLoadingProgress = function(progress){
        
    };

    return new FBInstant();
})();