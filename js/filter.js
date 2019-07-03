'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var housingType = document.querySelector('#housing-type');

  var filteredData = function (data) {
    var onChangeType = function (evt) {
      var filteredPins = data.filter(function (it) {
        removePins();
        if (evt.target.value === 'any') {
          window.pins.add(data.slice(0, MAX_COUNT_PINS));
        }
        return it.offer.type === evt.target.value;
      });
      window.pins.add(filteredPins);
    };

    housingType.addEventListener('change', onChangeType);
    window.pins.add(data.slice(0, MAX_COUNT_PINS));
  };

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  window.filter = filteredData;
})();

