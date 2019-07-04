'use strict';
(function () {
  var removePinsFromMap = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  window.map = {
    removePins: removePinsFromMap
  };
})();

