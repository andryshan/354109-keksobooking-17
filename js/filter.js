'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var housingType = document.querySelector('#housing-type');

  var pins = [];
  var currentValue;

  var filteredType = function () {
    window.pins.add(pins.filter(function (it) {
      return it.offer.type === currentValue;
    }));
  };

  var onFilterTypeChange = function (evt) {
    currentValue = housingType.value;
    removePins();
    if (evt.target.value === 'any') {
      window.pins.add(pins.slice(0, MAX_COUNT_PINS));
    }
    filteredType();
  };

  housingType.addEventListener('change', onFilterTypeChange);

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element, index) {
      if (index !== 0) {
        element.remove();
      }
    });
  };

  var updatePins = function () {
    window.pins.add(pins.slice(0, MAX_COUNT_PINS));
  };

  var downloadDataForFilter = function (data) {
    pins = data;
    updatePins();
  };

  window.filter = {
    downloadData: downloadDataForFilter
  };
})();
