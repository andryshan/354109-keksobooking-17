'use strict';
(function () {
  var PIN_WIDTH_HALF = 50 / 2;
  var PIN_HEIGHT = 70;
  var MAX_COUNT_PINS = 5;

  var mapPinList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin['author'].avatar;
    pinElement.querySelector('img').alt = pin['offer'].title;
    pinElement.style = 'left: ' + (pin['location'].x - PIN_WIDTH_HALF) + 'px;' + 'top: ' + (pin['location'].y - PIN_HEIGHT) + 'px;';
    return pinElement;
  };

  var addPinsToMapPinList = function (pins) {
    var takeNumber = pins.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPinList.appendChild(fragment);
  };

  var downloadData = function (data) {
    var pinsCopy = [];
    pinsCopy = data;
    addPinsToMapPinList(pinsCopy.slice(0, MAX_COUNT_PINS));
    window.filter(pinsCopy);
  };

  var appendFiltredPins = function (filtredPins) {
    addPinsToMapPinList(filtredPins.slice(0, MAX_COUNT_PINS));
  };

  var renderPins = function () {
    window.backend.load(downloadData, window.errorLoad);
  };

  window.pins = {
    render: renderPins,
    append: appendFiltredPins
  };
})();

