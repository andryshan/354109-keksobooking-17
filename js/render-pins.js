'use strict';
(function () {
  var PIN_NUMBERS = 8;

  var mapPinList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin['author'].avatar;
    pinElement.querySelector('img').alt = pin['offer'].title;
    pinElement.style = 'left: ' + pin['location'].x + 'px;' + 'top: ' + pin['location'].y + 'px;';
    return pinElement;
  };

  var addPinsToMapPinList = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PIN_NUMBERS; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPinList.appendChild(fragment);
  };

  var renderPins = function () {
    window.backend.load(addPinsToMapPinList, window.errorLoad);
  };

  window.renderPins = renderPins;
})();

