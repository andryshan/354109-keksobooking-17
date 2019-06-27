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
    buttonError.addEventListener('click', closeErrorAlert);
    document.addEventListener('click', closeErrorAlert);
    document.addEventListener('keydown', onErrorAlertLoadEscPress);
  };

  var closeErrorAlert = function () {
    main.removeChild(errorTemplate);
    document.removeEventListener('click', closeErrorAlert);
    document.removeEventListener('keydown', onErrorAlertLoadEscPress);
  };

  window.errorLoad = renderErrorLoad;
})();

