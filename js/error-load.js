'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var buttonError = errorTemplate.querySelector('.error__button');

  var onErrorAlertLoadEscPress = function (evt) {
    window.utils.onEscPress(evt, closeErrorAlert);
  };

  var renderErrorLoad = function () {
    showErrorAlert();
  };

  var showErrorAlert = function () {
    main.appendChild(errorTemplate);
    document.addEventListener('keydown', onErrorAlertLoadEscPress);
  };

  var closeErrorAlert = function () {
    main.removeChild(errorTemplate);
    document.removeEventListener('keydown', onErrorAlertLoadEscPress);
    document.removeEventListener('click', onPopupErrorClick);
  };

  var onButtonErrorClick = function () {
    closeErrorAlert();
  };

  buttonError.addEventListener('click', onButtonErrorClick);

  var onPopupErrorClick = function () {
    closeErrorAlert();
  };

  document.addEventListener('click', onPopupErrorClick);

  window.errorLoad = renderErrorLoad;
})();

