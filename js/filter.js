'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var filteredData = function (data) {
    var filteredPins = data.filter(function (it) {
      if (housingType.value !== 'any') {
        return it.offer.type === housingType.value;
      }
      return it.offer.type !== housingType.value;
    });
    return filteredPins;
  };

  window.filter = filteredData;
})();

