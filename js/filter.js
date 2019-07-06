'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var copyPinsData;
  var filteredData = function (data) {
    copyPinsData = data;
    var filteredPins = copyPinsData.filter(function (it) {
      if (housingType.value !== 'any') {
        return it.offer.type === housingType.value;
      }
      return it.offer.type !== housingType.value;
    });
    return filteredPins;
  };

  var onSelectFilterChange = function () {
    window.map.clearMap();
    window.map.append(filteredData(copyPinsData));
  };

  housingType.addEventListener('change', onSelectFilterChange);

  window.filter = filteredData;
})();

