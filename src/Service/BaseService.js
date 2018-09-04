var BaseService = (function() {
  function BaseService() {
    var _this = this;
    _this.url = 'https://sgj.mweit.com/mz/m/ajax.aspx';
    LExtends(_this, LObject, []);
  }
  BaseService.prototype.send = function(action, request) {
    var _this = this;
    request['platform'] = window.setting.platform;
    var url = _this.url + '?class=' + action.class + '&action=' + action.method;
    console.log('url=', url);
    if (BaseService.ssid) {
      request.ssid = BaseService.ssid;
    }
    return new Promise(function(resolve, reject) {
      LAjax.responseType = LAjax.JSON;
      LAjax.post(url, request, function(data) {
        console.log('data=', data);
        resolve(data);
      }, function(err) {
        reject(err);
      });
    });
        
  };
  return BaseService;
})();