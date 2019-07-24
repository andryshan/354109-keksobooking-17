'use strict';
(function () {
  var MAP_PIN_MAIN_HEIGHT = 81; // Высота главной метки с острием
  var FIELDS_DISABLE = true;
  var FIELDS_ACTIVE = false;
  var MAX_NUMBER_OF_ROOMS = 100;
  var MIN_NUMBER_OF_CAPACITY = 0;
  var MAP_FILTERS_ACTIVE = true;

  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFields = form.querySelectorAll('fieldset');
  var addressField = form.querySelector('#address');
  var resetButton = form.querySelector('.ad-form__reset');

  var setStateToForm = function (disable) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = disable;
    }
  };

  setStateToForm(FIELDS_DISABLE); // Отключаем филдсеты в неактивном состоянии (по дефолту)

  var activateForm = function () {
    setStateToForm(FIELDS_ACTIVE);
    form.classList.remove('ad-form--disabled');
    resetButton.addEventListener('click', onResetButtonClick);
  };

  var deactivateForm = function () {
    setStateToForm(FIELDS_DISABLE);
    form.classList.add('ad-form--disabled');
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

    Array.from(capacityField.options).forEach(function (option) {
      option.disabled = !availableCapacity.includes(String(option.value));
    });
  };

  numberOfRoomsField.addEventListener('change', onRoomsFieldChange);

  var onCapacityFieldChange = function () {
    if (capacityMap[numberOfRoomsField.value].includes(capacityField.value)) {
      capacityField.setCustomValidity('');
    } else {
      capacityField.setCustomValidity('Введите другое количество мест');
    }
  };

  capacityField.addEventListener('change', onCapacityFieldChange);

  var doResetPage = function () {
    form.reset();
    window.map.resetFilters();
    deactivateForm();
    window.mainPin.reset();

    setСoordinatesToAddress();

    window.map.disable();
    window.map.clear();
    window.card.remove();
    window.map.setStateFilter(MAP_FILTERS_ACTIVE);
  };

  var doSuccessLoad = function () {
    window.successLoad();
    doResetPage();
  };

  var onResetButtonClick = function () {
    doResetPage();
    resetButton.removeEventListener('click', onResetButtonClick);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), doSuccessLoad, window.errorLoad);
  };

  form.addEventListener('submit', onFormSubmit);

  window.form = {
    activate: activateForm,
    setСoordinates: setСoordinatesToAddress
  };
})();

