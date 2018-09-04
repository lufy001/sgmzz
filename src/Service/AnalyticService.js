var AnalyticService = (function() {
  function AnalyticService() {
    if (window.amplitude) {
      window.amplitude.getInstance().init(window.setting.amplitudeApiKey);
    }
  }
  AnalyticService.prototype.setUserId = function(userId) {
    if (window.amplitude) {
      window.amplitude.getInstance().setUserId(userId);
    }
  };
  AnalyticService.prototype.setUserProperties = function(key, value, permanent) {
    if (window.amplitude) {
      var identify;
      if (permanent) {
        identify = new window.amplitude.Identify().set(key, value);
      } else {
        identify = new window.amplitude.Identify().setOnce(key, value);
      }
      window.amplitude.getInstance().identify(identify);
    }
  };
  AnalyticService.prototype.trackEvent = function(event, data) {
    if (window.amplitude) {
      window.amplitude.getInstance().logEvent(event, data);
    }
  };
    
  AnalyticService._instance;
  AnalyticService.instance = function() {
    AnalyticService._instance = AnalyticService._instance || new AnalyticService();
    return AnalyticService._instance;
  };
  return AnalyticService;
})();