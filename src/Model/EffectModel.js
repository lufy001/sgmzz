var EffectModel = (function(){
    function EffectModel(data){
        var _this = this;
        _this.data = data;
        _this.init();
    }
    EffectModel.prototype.init = function(){
        var _this = this;
    };
    EffectModel.prototype.id = function(){
        return this.data.id;
    };
    EffectModel.prototype.img = function(){
        return this.data.img;
    };
    EffectModel.prototype.size = function(){
        return this.data.size;
    };
    EffectModel.prototype.coordinate = function(){
        return this.data.coordinate;
    };
    EffectModel.prototype.speed = function(){
        return this.data.speed;
    };
    EffectModel.prototype.offset = function(){
        return this.data.offset;
    };
    EffectModel.prototype.rows = function(){
        return this.data.rows;
    };
    EffectModel.prototype.cols = function(){
        return this.data.cols;
    };
    EffectModel.prototype.isAnime = function(){
        return this.data.rows > 1 || this.data.cols > 1;
    };
    EffectModel.prototype.animationData = function(){
        return LGlobal.divideCoordinate(this.data.size.width, this.data.size.height, this.data.rows, this.data.cols);
    };
    return EffectModel;
})();