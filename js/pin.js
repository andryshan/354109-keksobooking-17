'use strict';
(function () {
  var PIN_Y_START = 130;
  var PIN_Y_END = 630;
  var PIN_X_START = 0;
  var PIN_X_END = 1200;
  var PIN_MAIN_WIDTH = 65;
  var MAP_ACTIVE_STATE = true;

  var mapBlock = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

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
        window.form.setСoordinatesToAddress();
      } else {
        window.form.setСoordinatesToAddress(MAP_ACTIVE_STATE);
      }
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.activatePage();
      window.form.setСoordinatesToAddress(MAP_ACTIVE_STATE);
      mapBlock.removeEventListener('mousemove', onPinMainMove);
      mapBlock.removeEventListener('mouseup', onPinMainMouseUp);
    };

    var onActivePinMouseUp = function () {
      if (mapBlock.classList.contains('map--faded')) {
        window.renderPins();
      }
      mapPinMain.removeEventListener('mouseup', onActivePinMouseUp);
    };

    mapPinMain.addEventListener('mouseup', onActivePinMouseUp);
    mapBlock.addEventListener('mousemove', onPinMainMove);
    mapBlock.addEventListener('mouseup', onPinMainMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onPinMainClick);
})();
