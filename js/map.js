'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var mapBlock = document.querySelector('.map');

  var housingType = document.querySelector('#housing-type');

  var downloadRequestData = function (data) {
    window.pins.add(data.slice(0, MAX_COUNT_PINS));

    var onFilterSelectChange = function () {
      var filtredPins = window.filter(data);
      clearMapFromPins();
      window.pins.add(filtredPins.slice(0, MAX_COUNT_PINS));
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

  var disableMapBlock = function () {
    mapBlock.classList.add('map--faded');
  };

  var fillMapWidthAds = function () {
    window.backend.load(downloadRequestData, window.errorLoad);
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter, .map__features');

  var deactivateMapFilters = function () {
    mapFilters.forEach(function (filter) {
      filter.disabled = true;
    });
  };

  deactivateMapFilters();

  var activateMapFilters = function () {
    mapFilters.forEach(function (filter) {
      filter.disabled = false;
    });
  };

  var doResetMapFilters = function () {
    mapFiltersForm.reset();
  };

  window.map = {
    enable: enableMapBlock,
    disable: disableMapBlock,
    fill: fillMapWidthAds,
    clear: clearMapFromPins,
    activateFilters: activateMapFilters,
    deactivateFilters: deactivateMapFilters,
    resetFilters: doResetMapFilters
  };
})();

