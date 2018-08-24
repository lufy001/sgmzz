var CardStatusView = (function() {
  function CardStatusView(params) {
    var _this = this;
    var properties = {
      background: {
        type: 'LPanel',
        data: params.background,
        width: 180,
        height: 50
      },
      icon: {
        type: 'LBitmap',
        data: params.icon,
        properties: {
        }
      },
      title: {
        type: 'Label',
        properties: {
          text: params.label,
          color: '#000000',
          size: 16,
          stroke: false,
          x: 50,
          y: 5
        }
      },
      value: {
        type: 'Label',
        properties: {
          text: params.value,
          x: 50,
          y: 25
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
  }
  return CardStatusView;
})();