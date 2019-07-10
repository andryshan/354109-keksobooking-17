'use strict';
(function () {
  var sizePhoto = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var mapBlock = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  var typeOfHousing = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var removeChildrenFromParent = function (parentElement) {
    var children = Array.prototype.slice.call(parentElement.children);
    children.forEach(function (item) {
      item.remove();
    });
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card['author'].avatar;
    cardElement.querySelector('.popup__title').textContent = card['offer'].title;
    cardElement.querySelector('.popup__text--address').textContent = card['offer'].address;
    cardElement.querySelector('.popup__text--price').textContent = card['offer'].price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeOfHousing[card['offer'].type];
    cardElement.querySelector('.popup__text--capacity').textContent = card['offer'].rooms + ' комнаты для ' + card['offer'].guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card['offer'].checkin + ' выезд до ' + card['offer'].checkout;
    cardElement.querySelector('.popup__description').textContent = card['offer'].description;

    var featuresList = cardElement.querySelector('.popup__features');
    removeChildrenFromParent(featuresList);

    if (card['offer'].features.length === 0) {
      featuresList.style.display = 'none';
    }


    var createFeatureElement = function (featuresArray) {
      featuresArray.forEach(function (featureItem) {
        var featuresListElement = document.createElement('li');
        featuresListElement.classList.add('popup__feature');
        featuresListElement.classList.add('popup__feature--' + featureItem + '');
        featuresList.appendChild(featuresListElement);
      });
    };
    createFeatureElement(card['offer'].features);


    var photosList = cardElement.querySelector('.popup__photos');
    removeChildrenFromParent(photosList);

    var createPhotoElement = function (photosArray) {
      photosArray.forEach(function (photo) {
        var photoElement = document.createElement('img');
        photoElement.classList.add('popup__photo');
        photoElement.style.width = sizePhoto.WIDTH + 'px';
        photoElement.style.height = sizePhoto.HEIGHT + 'px';
        photoElement.alt = 'Фотография жилья';
        photoElement.src = photo;
        photosList.appendChild(photoElement);
      });
    };
    createPhotoElement(card['offer'].photos);

    return cardElement;
  };


  var addCardToMap = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 1; i++) { // Отображение первой карточки
      fragment.appendChild(renderCard(cards[i]));
    }
    filtersContainer.insertAdjacentHTML('afterbegin', fragment);
    mapBlock.insertBefore(fragment, filtersContainer);
  };

  window.card = {
    add: addCardToMap
  };
})();
