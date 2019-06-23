'use strict';
(function () {
  var PIN_Y_START = 130;
  var PIN_Y_END = 630;
  var PIN_WIDTH_HALF = 50 / 2;
  var PIN_HEIGHT = 70;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth; // 1200

  var createPins = function (quantity) {
    var pins = [];
    for (var i = 0; i < quantity; i++) {
      pins[i] = {
        'author': {
          avatar: 'img/avatars/user' + 0 + (i + 1) + '.png'
        },
        'offer': {
          type: window.utils.getRandomItem(TYPES)
        },
        'location': {
          x: window.utils.getRandomNumberFromTo(0, MAP_WIDTH) - PIN_WIDTH_HALF,
          y: window.utils.getRandomNumberFromTo(PIN_Y_START, PIN_Y_END) - PIN_HEIGHT
        }
      };
    }
    return pins;
  };

  window.createPins = createPins;
})();

