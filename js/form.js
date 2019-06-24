'use strict';
(function () {
  var MAP_PIN_MAIN_HEIGHT = 81; // Высота главной метки с острием
  var FIELDS_DISABLE = true;
  var mapBlock = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFields = form.querySelectorAll('fieldset');
  var addressField = form.querySelector('#address');

  var enableMapBlock = function () {
    mapBlock.classList.remove('map--faded');
  };

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

  window.form = {
    activatePage: activatePage,
    setСoordinatesToAddress: setСoordinatesToAddress
  };
})();

