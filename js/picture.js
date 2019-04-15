'use strict';

(function () {

  // Создаем элементы для маленьких фото в разметке

  var pictureListElement = document.querySelector('.pictures');

  var createPictureElement = function (number) {

    var fragment = document.createDocumentFragment();
    var picture = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    for (var i = 0; i < number; i++) {

      var pictureElement = picture.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = window.data[i].url;
      pictureElement.querySelector('.picture__likes').textContent = window.data[i].like;
      pictureElement.querySelector('.picture__comments').textContent = window.data[i].comments.length;

      fragment.appendChild(pictureElement);
    }
    pictureListElement.appendChild(fragment);
  };
  createPictureElement(window.data.length);
})();
