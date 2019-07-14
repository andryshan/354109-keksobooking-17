'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var mapBlock = document.querySelector('.map');

  var housingType = document.querySelector('#housing-type');

  var downloadRequestData = function (data) {
    window.pins.add(data.slice(0, MAX_COUNT_PINS));
    window.card.add(data);
    var onFilterSelectChange = function () {
      var filtredPins = window.filter(data);
      clearMapFromPins();
      window.pins.add(filtredPins.slice(0, MAX_COUNT_PINS));
      window.card.add(filtredPins.slice(0, MAX_COUNT_PINS));
    };
    housingType.addEventListener('change', onFilterSelectChange);
  };

  var clearMapFromPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (element) {
      element.remove();
    });
  };

  var enableMapBlock = function () {
    mapBlock.classList.remove('map--faded');
  };

  var fillMapWidthAds = function () {
    window.backend.load(downloadRequestData, window.errorLoad);
  };

  window.map = {
    enable: enableMapBlock,
    fill: fillMapWidthAds
  };
})();

