'use strict';
var PIN_Y_START = 130;
var PIN_Y_END = 630;
var PIN_WIDTH_HALF = 50 / 2;
var PIN_HEIGHT = 70;
var PIN_NUMBERS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

var createPins = function (quantity) {
  var pins = [];
  for (var i = 0; i < quantity; i++) {
    pins[i] = {
      'author': {
        avatar: 'img/avatars/user' + 0 + (i + 1) + '.png'
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

var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var formFields = form.querySelectorAll('fieldset');
var formAdress = form.querySelector('#address');

var disableFields = function () {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].setAttribute('disabled', '');
  }
};

disableFields(); // Отключаем филдсеты в неактивном состоянии (по дефолту)

var activatePage = function () {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled');
  }
  form.classList.remove('ad-form--disabled');
  enableMapBlock();
  addPinsToMapPinList(createPins(PIN_NUMBERS));
  mapPinMain.removeEventListener('click', onPinMainClick); // Удаляем обработчик, чтобы при новом клике не добавлялись новые пины
};

var onPinMainClick = function () {
  activatePage();
};

mapPinMain.addEventListener('click', onPinMainClick);

var setCoordsToAdress = function (isActive) {
  var leftCoord = mapPinMain.offsetLeft + Math.round(mapPinMain.offsetWidth / 2);
  var topCoord = mapPinMain.offsetTop - mapPinMain.offsetHeight;
  if (!isActive) { // Если состояние неактивное
    topCoord = mapPinMain.offsetTop - Math.round(mapPinMain.offsetHeight / 2);
  }
  formAdress.placeholder = leftCoord + ' ' + topCoord;
  return formAdress.placeholder;
};

setCoordsToAdress(false); // Выставляем координаты главного пина в адрес инпута при неактивном состоянии (по середине, без учета острия)

var onPinMainMouseup = function () {
  setCoordsToAdress(true); // Выставляем координаты с учетом где находится острие
};

mapPinMain.addEventListener('mouseup', onPinMainMouseup);

