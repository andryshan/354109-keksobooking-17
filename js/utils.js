'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {

    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomNumberFromTo: function (numberFrom, numberTo) {
      var randomNumber = numberFrom + Math.random() * (numberTo + 1 - numberFrom);
      randomNumber = Math.floor(randomNumber);
      return randomNumber;
    },

    onEscPress: function (evt, callback) {
      if (evt.keyCode === ESC_KEYCODE) {
        callback();
      }
    },

    onEnterPress: function (evt, callback) {
      if (evt.keyCode === ENTER_KEYCODE) {
        callback();
      }
    }
  };
})();

