'use strict';
var PIN_Y_START = 130;
var PIN_Y_END = 630;
var PIN_WIDTH_HALF = 50 / 2;
var PIN_HEIGHT = 70;
var PIN_NUMBERS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PICTURE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLE_IMAGE = 'заголовок объявления';
var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth; // 1200

var mapBlock = document.querySelector('.map');
var mapPinList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var enableMapBlock = function () {
  mapBlock.classList.remove('map--faded');
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumberFromTo = function (numberFrom, numberTo) {
  var randomNumber = numberFrom + Math.random() * (numberTo + 1 - numberFrom);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

var generateArrayLinkAvatars = function (array) {
  var imageAdresses = [];
  for (var i = 0; i < array.length; i++) {
    imageAdresses[i] = 'img/avatars/user' + 0 + array[i] + '.png';
  }
  return imageAdresses;
};

var createPins = function (quantity) {
  var pins = [];
  for (var i = 0; i < quantity; i++) {
    pins[i] = {
      'author': {
        avatar: generateArrayLinkAvatars(PICTURE_NUMBERS)[i]
      },
      'offer': {
        type: getRandomItem(TYPES)
      },
      'location': {
        x: getRandomNumberFromTo(0, MAP_WIDTH) - PIN_WIDTH_HALF,
        y: getRandomNumberFromTo(PIN_Y_START, PIN_Y_END) - PIN_HEIGHT
      }
    };
  }
  return pins;
};

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin['author'].avatar;
  pinElement.querySelector('img').alt = TITLE_IMAGE;
  pinElement.style = 'left: ' + pin['location'].x + 'px;' + 'top: ' + pin['location'].y + 'px;';
  return pinElement;
};

var addPinsToMapPinList = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPinList.appendChild(fragment);
};

addPinsToMapPinList(createPins(PIN_NUMBERS));

enableMapBlock();

