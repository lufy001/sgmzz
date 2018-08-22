var SettingDialogController = (function(){
    function SettingDialogController(request){
        var _this = this;
        var properties = {
            title:{
                type:"Label",
                parent:"layer",
                properties:{
                    x:200,
                    y:10,
                    text:"Setting",
                    size:24,
                    textAlign:"center"
                }
            },
            musicView:{
                type:"CheckboxView",
                parent:"layer",
                properties:{
                    x:150,
                    y:70
                }
            },
            sfxView:{
                type:"CheckboxView",
                parent:"layer",
                properties:{
                    x:150,
                    y:120
                }
            }
        };
		LExtends (_this, DialogController, [request, properties]);
    }
    SettingDialogController.prototype.onLoad = function(request){
        var _this = this;
        _this.musicView.title.text = "Music";
        _this.sfxView.title.text = "Sfx";
    };
    
    return SettingDialogController;
})();