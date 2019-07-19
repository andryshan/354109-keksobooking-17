'use strict';
(function () {
  var MAP_PIN_MAIN_HEIGHT = 81; // Высота главной метки с острием
  var FIELDS_DISABLE = true;
  var FIELDS_ACTIVE = false;
  var MAX_NUMBER_OF_ROOMS = 100;
  var MIN_NUMBER_OF_CAPACITY = 0;

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

  var activateForm = function () {
    setStateToForm(FIELDS_ACTIVE);
    form.classList.remove('ad-form--disabled');
  };

  var setСoordinatesToAddress = function (isActive) {
    var leftCoord = mapPinMain.offsetLeft + Math.round(mapPinMain.offsetWidth / 2);
    var topCoord = mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT;
    if (!isActive) { // Если состояние неактивное, то коорд по y будет другая, т.к. нет острия
      topCoord = mapPinMain.offsetTop + Math.round(mapPinMain.offsetHeight / 2);
    }
    addressField.value = leftCoord + ', ' + topCoord;
  };

  setСoordinatesToAddress(); // Выставляем координаты главного пина в адрес инпута при неактивном состоянии (по середине, без учета острия)

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


  var numberOfRoomsField = form.querySelector('#room_number');
  var capacityField = form.querySelector('#capacity');

  var capacityMap = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var onRoomsFieldChange = function () {
    var availableCapacity = capacityMap[numberOfRoomsField.value];
    if (numberOfRoomsField.value === String(MAX_NUMBER_OF_ROOMS)) {
      capacityField.value = MIN_NUMBER_OF_CAPACITY;
    } else {
      capacityField.value = numberOfRoomsField.value;
    }

    Array.prototype.slice.call(capacityField.options).forEach(function (option) {
      if (availableCapacity.includes(option.value)) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });
  };

  numberOfRoomsField.addEventListener('change', onRoomsFieldChange);

  window.form = {
    activate: activateForm,
    setСoordinates: setСoordinatesToAddress
  };
})();

