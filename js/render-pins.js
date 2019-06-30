'use strict';
(function () {
  var PIN_WIDTH_HALF = 50 / 2;
  var PIN_HEIGHT = 70;
  var MAX_COUNT_PINS = 5;

  var mapPinList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var housingType = document.querySelector('#housing-type');

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

  var pins = [];
  var currentValue;

  var filteredType = function () {
    addPinsToMapPinList(pins.filter(function (it) {
      return it.offer.type === currentValue;
    }));
  };

  var onFilterTypeChange = function (evt) {
    currentValue = housingType.value;
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element, index) {
      if (index !== 0) {
        element.remove();
      }
    });
    if (evt.target.value === 'any') {
      addPinsToMapPinList(pins.slice(0, MAX_COUNT_PINS));
    }
    filteredType();
  };

  housingType.addEventListener('change', onFilterTypeChange);

  var updatePins = function () {
    addPinsToMapPinList(pins.slice(0, MAX_COUNT_PINS));
  };

  var successHandler = function (data) {
    pins = data;
    updatePins();
  };

  var renderPins = function () {
    window.backend.load(successHandler, window.errorLoad);
  };

  window.renderPins = renderPins;
})();

