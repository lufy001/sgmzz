var ShopTitleView = (function() {
  function ShopTitleView(text) {
    var _this = this;
    var properties = {
      background: {
        type: 'LBitmap',
        data: 'chapter-title',
        properties: {
          x: (LGlobal.width - dataList['chapter-title'].width) * 0.5
        }
      },
      title: {
        type: 'Label',
        properties: {
          text: text,
          textAlign: 'center',
          textBaseline: 'middle',
          size: 30,
          x: 240,
          y: dataList['chapter-title'].height * 0.5
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
  }
  return ShopTitleView;
})();