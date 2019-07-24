'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__filters input[name=features]');

  var pricesMap = {
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    },
    middle: {
      min: 10000,
      max: 50000
    }
  };

  var doCheckHousingType = function (it) {
    return housingType.value === 'any' || it.offer.type === housingType.value;
  };

  var doCheckHousingPrice = function (it) {
    return housingPrice.value === 'any' || it.offer.price >= pricesMap[housingPrice.value].min && it.offer.price <= pricesMap[housingPrice.value].max;
  };

  var doCheckHousingRooms = function (it) {
    return housingRooms.value === 'any' || it.offer.rooms === Number(housingRooms.value);
  };

  var doCheckHousingGuests = function (it) {
    return housingGuests.value === 'any' || it.offer.guests === Number(housingGuests.value);
  };

  var doCheckFeatures = function (it, selectedFeatures) {
    return selectedFeatures.every(function (feature) {
      return it.offer.features.includes(feature);
    });
  };

  var getSelectedFeatures = function () {
    return Array.from(housingFeatures).filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });
  };

  var doFilteringData = function (data) {
    var filteredPins = data.filter(function (it) {
      var filteredFeatures = getSelectedFeatures();
      return doCheckHousingType(it) &&
        doCheckHousingPrice(it) &&
        doCheckHousingRooms(it) &&
        doCheckHousingGuests(it) &&
        doCheckFeatures(it, filteredFeatures);
    });
    return filteredPins;
  };

  window.filter = doFilteringData;
})();

