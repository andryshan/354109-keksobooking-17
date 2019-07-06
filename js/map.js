'use strict';
(function () {
  var MAX_COUNT_PINS = 5;

  var downloadData = function (data) {
    window.pins.add(data.slice(0, MAX_COUNT_PINS));
    window.filter(data);
  };

  var clearMapFromPins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  var appendFiltredPinsToMap = function (filtredPins) {
    window.pins.add(filtredPins.slice(0, MAX_COUNT_PINS));
  };

  window.map = {
    clearMap: clearMapFromPins,
    download: downloadData,
    append: appendFiltredPinsToMap
  };
})();

