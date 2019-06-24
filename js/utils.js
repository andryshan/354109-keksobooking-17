'use strict';
(function () {
  window.utils = {
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomNumberFromTo: function (numberFrom, numberTo) {
      var randomNumber = numberFrom + Math.random() * (numberTo + 1 - numberFrom);
      randomNumber = Math.floor(randomNumber);
      return randomNumber;
    }
  };
})();

