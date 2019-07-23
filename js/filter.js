'use strict';
(function () {
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


  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var housingFeatures = document.querySelectorAll('.map__filters input[type="checkbox"]:checked');

  var foo1 = function (it) {
    return housingType.value === 'any' || it.offer.type === housingType.value;
  };

  var foo2 = function (it) {
    return housingPrice.value === 'any' || it.offer.price >= pricesMap[housingPrice.value].min && it.offer.price <= pricesMap[housingPrice.value].max;
  };

  var foo3 = function (it) {
    return housingRooms.value === 'any' || it.offer.rooms === Number(housingRooms.value);
  };

  var foo4 = function (it) {
    return housingGuests.value === 'any' || it.offer.guests === Number(housingGuests.value);
  };

  var doFilteringData = function (data) {
    var filteredPins = data.filter(function (it) {

      return foo1(it) && foo2(it) && foo3(it) && foo4(it);
      // return housingType.value === 'any' || it.offer.type === housingType.value;

      // return housingPrice.value === 'any' || it.offer.price >= pricesMap[housingPrice.value].min && it.offer.price <= pricesMap[housingPrice.value].max;

      // return housingRooms.value === 'any' || it.offer.rooms === Number(housingRooms.value);

      // return housingGuests.value === 'any' || it.offer.guests === Number(housingGuests.value);
    });
    return filteredPins;
  };

  window.filter = doFilteringData;
})();

