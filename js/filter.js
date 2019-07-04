'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var filteredData = function (data) {
    var onChangeType = function (evt) {
      window.map.clearMap();
      var filteredPins = data.filter(function (it) {
        if (evt.target.value !== 'any') {
          return it.offer.type === evt.target.value;
        }
        return it.offer.type !== evt.target.value;
      });
      window.pins.append(filteredPins);
    };
    housingType.addEventListener('change', onChangeType);
  };

  window.filter = filteredData;
})();

