'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var MAP_FILTERS_ACTIVE = true;
  var mapBlock = document.querySelector('.map');
  var mapFiltersList = document.querySelector('.map__filters');

  var downloadRequestData = function (data) {
    window.pins.add(data.slice(0, MAX_COUNT_PINS));

    var onFilterSelectChange = function () {
      var addFiltredPinsToMap = function () {
        var filtredPins = window.filter(data);
        doClearMapFromPins();
        window.pins.add(filtredPins.slice(0, MAX_COUNT_PINS));
      };
      window.debounce(addFiltredPinsToMap);
    };
    mapFiltersList.addEventListener('change', onFilterSelectChange);
  };

  var doClearMapFromPins = function () {
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

  var doFillMapWidthAds = function () {
    window.backend.load(downloadRequestData, window.errorLoad);
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter, .map__features');

  var setStateToMapFilters = function (isActive) {
    mapFilters.forEach(function (filter) {
      filter.disabled = isActive;
    });
  };

  setStateToMapFilters(MAP_FILTERS_ACTIVE);

  var doResetMapFilters = function () {
    mapFiltersForm.reset();
  };

  window.map = {
    enable: enableMapBlock,
    disable: disableMapBlock,
    fill: doFillMapWidthAds,
    clear: doClearMapFromPins,
    setStateFilter: setStateToMapFilters,
    resetFilters: doResetMapFilters
  };
})();

