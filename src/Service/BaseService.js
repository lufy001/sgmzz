var BaseService = (function() {
  function BaseService() {
    var _this = this;
    _this.url = 'https://lufylegend.com/ssl/sgmzz/index.php';
    LExtends(_this, LObject, []);
  }
  BaseService.prototype.send = function(action, request) {
    var _this = this;
    request['pt'] = window.setting.platform;
    var url = _this.url + '?class=' + action.class + '&method=' + action.method;
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