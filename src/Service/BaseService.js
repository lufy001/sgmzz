var BaseService = (function() {
  function BaseService() {
    var _this = this;
    _this.url = 'https://sgj.mweit.com/mz/m/ajax.aspx';
    LExtends(_this, LObject, []);
  }
  BaseService.prototype.send = function(action, request) {
    var _this = this;
    request['platform'] = window.setting.platform;
    request['fbId'] = LPlatform.player().getID();
    var url = _this.url + '?class=' + action.class + '&action=' + action.method;
    console.log('url=', url);
    if (BaseService.ssid) {
      request.ssid = BaseService.ssid;
    }
    return new Promise(function(resolve, reject) {
      var error;
      LAjax.responseType = LAjax.JSON;
      LAjax.post(url, request, function(response) {
        console.log('response=', response);
        if (response.ret) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }, function(err) {
        reject(err);
      });
    })
      .catch(function(event) {
        AnalyticService.instance().trackEvent('SERVICE_ERROR', event);
        _this.showErrorDialog(event);
        throw event;
      });
  };
  BaseService.prototype.showErrorDialog = function(event) {
    var params = { width: 360, height: 200, hideClose: true };
    var messagekey = SERVICE_MESSAGES[event.msgCode] || SERVICE_DEFAULT_MESSAGE;
    //TODO:translation
    params.message = messagekey;
    if (event.quit) {
      params.okEvent = function() {
        //game restart 
      };
    }
    var dialog = new AlertDialogController(params);
    dialogLayer.addChild(dialog);
  };
  return BaseService;
})();