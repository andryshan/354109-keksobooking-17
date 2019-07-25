'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__filters input[name=features]');

  var housingPricesMap = {
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

  var doCheckHousingType = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  var doCheckHousingPrice = function (ad) {
    return housingPrice.value === 'any' || ad.offer.price >= housingPricesMap[housingPrice.value].min && ad.offer.price <= housingPricesMap[housingPrice.value].max;
  };

  var doCheckHousingRooms = function (ad) {
    return housingRooms.value === 'any' || ad.offer.rooms === Number(housingRooms.value);
  };

  var doCheckHousingGuests = function (ad) {
    return housingGuests.value === 'any' || ad.offer.guests === Number(housingGuests.value);
  };

  var doCheckFeatures = function (ad, selectedFeatures) {
    return selectedFeatures.every(function (feature) {
      return ad.offer.features.includes(feature);
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

