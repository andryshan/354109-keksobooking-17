'use strict';
(function () {
  // var housingType = document.querySelector('#housing-type');

  var filteredData = function (data, evt) {
    var filteredPins = data.filter(function (it) {
      if (evt.target.value !== 'any') {
        return it.offer.type === evt.target.value;
      }
      return it.offer.type !== evt.target.value;
    });
    return filteredPins;
  };

  window.filter = filteredData;
})();

