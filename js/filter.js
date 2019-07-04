'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var housingType = document.querySelector('#housing-type');

  var filteredData = function (data) {
    var onChangeType = function (evt) {
      window.map.removePins();
      var filteredPins = data.filter(function (it) {
        if (evt.target.value !== 'any') {
          return it.offer.type === evt.target.value;
        }
        return it.offer.type !== evt.target.value;
      });
      window.pins.add(filteredPins.slice(0, MAX_COUNT_PINS));
    };

    housingType.addEventListener('change', onChangeType);
    window.pins.add(data.slice(0, MAX_COUNT_PINS));
  };

  window.filter = filteredData;
})();

