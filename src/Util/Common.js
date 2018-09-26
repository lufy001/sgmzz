var Common = (function() {
  function Common() {
  }
  Common.FooterList = ['Shop', 'Cards', 'Home', 'Group', 'Events'];
  Common.getStrokeLabel = function(params) {
    var label = new LTextField();
    if (params.type === 'htmlText') {
      label.htmlText = params.text;
    } else {
      label.text = params.text;
    }
    label.size = params.size || 20;
    label.color = params.color || '#ffffff';
    label.lineColor = params.lineColor || '#000000';
    label.stroke = typeof params.stroke !== UNDEFINED ? params.stroke : true;
    label.lineWidth = params.lineWidth || 2;
    label.heightMode = LTextField.HEIGHT_MODE_BASELINE;
    if (params.type === 'bitmap') {
      label.cacheAsBitmap(true);
    }
    return label;
  };
  Common.getTranslucentMask = function(width, height) {
    var layer = new LSprite();
    var windowBackgrond = Common.getTranslucentBitmap(width, height);
    layer.addChild(windowBackgrond);
    layer.addEventListener(LMouseEvent.MOUSE_DOWN, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_UP, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_MOVE, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_OVER, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_OUT, function() {});
    return layer;
  };
  Common.getTranslucentBitmap = function(width, height) {
    var backgroundData = new LBitmapData(dataList['translucent']);
    var background = new LBitmap(backgroundData);
    width = width || LGlobal.width;
    height = height || LGlobal.height;
    background.scaleX = width / backgroundData.width;
    background.scaleY = height / backgroundData.height;
    return background;
  };
  Common.getButton = function(text, params) {
    var img = 'btn01';
    var offsetY = 0;
    var offsetX = 0;
    var size = 18;
    if (params) {
      img = params.img || img;
      offsetX = params.offsetX || offsetX;
      offsetY = params.offsetY || offsetY;
      size = params.size || size;
    }
    var buttonLayer = new LSprite();
    var btnBitmap = new LBitmap(new LBitmapData(dataList[img]));
    buttonLayer.addChild(btnBitmap);
    var textLabel = Common.getStrokeLabel({ text: text, size: size });
    textLabel.name = 'label';
    textLabel.x = (btnBitmap.getWidth() - textLabel.getWidth()) * 0.5 + offsetX;
    textLabel.y = (btnBitmap.getHeight() - textLabel.getHeight()) * 0.5 + offsetY;
    buttonLayer.addChild(textLabel);
    if (params && params.icon) {
      var icon = new LBitmap(new LBitmapData(dataList[params.icon]));
      if (params.iconWidth) {
        icon.scaleX = params.iconWidth / icon.getWidth();
      }
      if (params.iconHeight) {
        icon.scaleY = params.iconHeight / icon.getHeight();
      }
      textLabel.x = (btnBitmap.getWidth() - textLabel.getWidth() - icon.getWidth()) * 0.5;
      icon.x = textLabel.x + textLabel.getWidth() + 5 + offsetX;
      icon.y = (btnBitmap.getHeight() - icon.getHeight()) * 0.5 + offsetY;
      buttonLayer.addChild(icon);
    }
    buttonLayer.cacheAsBitmap(true);
    var button = new LButton(buttonLayer);
    button.bitmap = btnBitmap;
    return button;
  };
  Common.changeButtonLabel = function(button, label) {
    var buttonLayer = button.getChildAt(0);
    var textLabel = buttonLayer.getChildByName('label');
    textLabel.text = label;
    buttonLayer.cacheAsBitmap(false);
    buttonLayer.cacheAsBitmap(true);
  };
  Common.changeScene = function(className, request) {
    var _this = this;
    var controller = rootLayer.getChildByName(className);
    if (!controller) {
      controller = new window[className](request || {});
      rootLayer.addChild(controller);
    }
    if (Common.currentController && Common.currentController.objectIndex === controller.objectIndex) {
      //return;
    }
    controller.changeScene(request || {});
  };
  Common.getFormatTime = function(time) {
    var hours = time / 3600 >>> 0;
    var minutes = time % 3600 / 60 >>> 0;
    var sceonds = time % 60;
    return Common.getNumber(hours) + ':' + Common.getNumber(minutes) + ':' + Common.getNumber(sceonds);
  };
  Common.getNumber = function(value) {
    return value < 10 ? '0' + value : value;
  };
  Common.delay = function(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, time);
    });
  };
  Common.getAssociative = function(array, keyName) {
    var associative = {};
    for (var i = 0; i < array.length; i++) {
      var child = array[i];
      associative[child[keyName]()] = child;
    }
    return associative;
  };
  return Common;
})();

