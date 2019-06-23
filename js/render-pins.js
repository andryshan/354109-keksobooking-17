'use strict';
(function () {
  var PIN_NUMBERS = 8;
  var TITLE_IMAGE = 'заголовок объявления';

  var mapPinList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin['author'].avatar;
    pinElement.querySelector('img').alt = TITLE_IMAGE;
    pinElement.style = 'left: ' + pin['location'].x + 'px;' + 'top: ' + pin['location'].y + 'px;';
    return pinElement;
  };

  var addPinsToMapPinList = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPinList.appendChild(fragment);
  };

  window.renderPins = function () {
    addPinsToMapPinList(window.createPins(PIN_NUMBERS));
  };
})();

