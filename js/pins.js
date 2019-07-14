'use strict';
(function () {
  var PIN_WIDTH_HALF = 50 / 2;
  var PIN_HEIGHT = 70;

  var mapPinList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin['author'].avatar;
    pinElement.querySelector('img').alt = pin['offer'].title;
    pinElement.style = 'left: ' + (pin['location'].x - PIN_WIDTH_HALF) + 'px;' + 'top: ' + (pin['location'].y - PIN_HEIGHT) + 'px;';
    return pinElement;
  };

  var addPinsToMapPinList = function (pins) {
    var takeNumber = pins.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPinList.appendChild(fragment);
  };

  var activeStateToPin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var deactivateStateToPins = function (pins) {
    pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  window.pins = {
    add: addPinsToMapPinList,
    activate: activeStateToPin,
    deactivate: deactivateStateToPins
  };
})();

