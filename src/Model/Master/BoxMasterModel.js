var BoxMasterModel = (function(){
    function BoxMasterModel(data){
        var _this = this;
        _this.data = data;
    }
    BoxMasterModel.prototype.id = function(){
        return this.data.id;
    };
    BoxMasterModel.prototype.name = function(){
        return this.data.name;
    };
    BoxMasterModel.prototype.img = function(){
        return this.data.img;
    };
    BoxMasterModel.prototype.coin = function(){
        return this.data.coin;
    };
    BoxMasterModel.prototype.allTime = function(){
        return this.data.time;
    };
    BoxMasterModel.prototype.cards = function(){
        return this.data.cards;
    };
    BoxMasterModel.prototype.introduction = function(){
        return this.data.introduction || " ";
    };
    
    return BoxMasterModel;
})();