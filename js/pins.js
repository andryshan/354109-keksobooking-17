'use strict';
(function () {
  var PIN_WIDTH_HALF = 50 / 2;
  var PIN_HEIGHT = 70;
  var MAX_COUNT_PINS = 5;

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
    housingType.addEventListener('change', onFilterTypeChange);
  };

  var pinsCopy = [];
  var currentValue;

  var filteredType = function () {
    addPinsToMapPinList(pinsCopy.filter(function (it) {
      return it.offer.type === currentValue;
    }));
  };

  var housingType = document.querySelector('#housing-type');

  var onFilterTypeChange = function (evt) {
    currentValue = housingType.value;
    removePins();
    if (evt.target.value === 'any') {
      addPinsToMapPinList(pinsCopy.slice(0, MAX_COUNT_PINS));
    }
    filteredType();
  };

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    housingType.removeEventListener('change', onFilterTypeChange);
  };

  var updatePins = function () {
    addPinsToMapPinList(pinsCopy.slice(0, MAX_COUNT_PINS));
  };

  var downloadData = function (data) {
    pinsCopy = data;
    updatePins();
  };

  var renderPins = function () {
    window.backend.load(downloadData, window.errorLoad);
  };

  window.pins = {
    render: renderPins
  };
})();

