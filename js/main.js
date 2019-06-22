'use strict';
var PIN_Y_START = 130;
var PIN_Y_END = 630;
var PIN_X_START = 0;
var PIN_X_END = 1200;
var PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 81; // Высота главной метки с острием

var PIN_WIDTH_HALF = 50 / 2;
var PIN_HEIGHT = 70;
var PIN_NUMBERS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TITLE_IMAGE = 'заголовок объявления';
var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth; // 1200
var FIELDS_DISABLE = true;
var MAP_ACTIVE_STATE = true;

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

var renderPins = function () {
  addPinsToMapPinList(createPins(PIN_NUMBERS));
};

var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var formFields = form.querySelectorAll('fieldset');
var addressField = form.querySelector('#address');

var setStateToForm = function (disable) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = disable;
  }
};

setStateToForm(FIELDS_DISABLE); // Отключаем филдсеты в неактивном состоянии (по дефолту)

var activatePage = function () {
  setStateToForm();
  form.classList.remove('ad-form--disabled');
  enableMapBlock();
};

var setСoordinatesToAddress = function (isActive) {
  var leftCoord = mapPinMain.offsetLeft + Math.round(mapPinMain.offsetWidth / 2);
  var topCoord = mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT;
  if (!isActive) { // Если состояние неактивное, то коорд по y будет другая, т.к. нет острия
    topCoord = mapPinMain.offsetTop + Math.round(mapPinMain.offsetHeight / 2);
  }
  addressField.value = leftCoord + ', ' + topCoord;
  return addressField.value;
};

setСoordinatesToAdress(); // Выставляем координаты главного пина в адрес инпута при неактивном состоянии (по середине, без учета острия)

var minPricesOfTypes = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalo: 0
};

var typeOfHousing = form.querySelector('#type');
var priceField = form.querySelector('#price');

var onTypeOfHousingChange = function () {
  var minValue = typeOfHousing.value;
  priceField.placeholder = minPricesOfTypes[minValue];
  priceField.min = minPricesOfTypes[minValue];
};

typeOfHousing.addEventListener('change', onTypeOfHousingChange);

var timeInField = form.querySelector('#timein');
var timeOutField = form.querySelector('#timeout');

var onTimeInFieldChange = function () {
  timeOutField.value = timeInField.value;
};

var onTimeOutFieldChange = function () {
  timeInField.value = timeOutField.value;
};

timeInField.addEventListener('change', onTimeInFieldChange);

timeOutField.addEventListener('change', onTimeOutFieldChange);

var onPinMainClick = function (evt) {
  evt.preventDefault();

  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onPinMainMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var currentCoordinateX = mapPinMain.offsetLeft - shift.x;
    var currentCoordinateY = mapPinMain.offsetTop - shift.y;

    if (currentCoordinateX >= PIN_X_START && currentCoordinateX <= PIN_X_END - PIN_MAIN_WIDTH) {
      mapPinMain.style.left = currentCoordinateX + 'px';
    }

    if (currentCoordinateY >= PIN_Y_START && currentCoordinateY <= PIN_Y_END) {
      mapPinMain.style.top = currentCoordinateY + 'px';
    }

    if (mapBlock.classList.contains('map--faded')) {
      setСoordinatesToAdress();
    } else {
      setСoordinatesToAdress(MAP_ACTIVE_STATE);
    }
  };

  var onPinMainMouseUp = function (upEvt) {
    upEvt.preventDefault();
    activatePage();
    setСoordinatesToAdress(MAP_ACTIVE_STATE);
    mapBlock.removeEventListener('mousemove', onPinMainMove);
    mapBlock.removeEventListener('mouseup', onPinMainMouseUp);
  };

  var onActivePinMouseUp = function () {
    if (mapBlock.classList.contains('map--faded')) {
      renderPins();
    }
    mapPinMain.removeEventListener('mouseup', onActivePinMouseUp);
  };

  mapPinMain.addEventListener('mouseup', onActivePinMouseUp);
  mapBlock.addEventListener('mousemove', onPinMainMove);
  mapBlock.addEventListener('mouseup', onPinMainMouseUp);
};

mapPinMain.addEventListener('mousedown', onPinMainClick);

