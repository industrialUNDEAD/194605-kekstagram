'use strict';

(function () {

  // Показываем большое фото

  var userPicture = document.querySelector('.big-picture');

  var getBigPicture = function (item) {

    userPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    userPicture.querySelector('img').src = item.url;
    userPicture.querySelector('.likes-count').textContent = item.like;
    userPicture.querySelector('.comments-count').textContent = item.comments.length;
    userPicture.querySelector('.social__caption').textContent = item.description;
    window.createCommentElement(item.comments.length);
  };

  var pictureItems = document.querySelectorAll('.picture');

  var addPictureClickHandler = function (pictureItem, dataCard) {
    pictureItem.addEventListener('click', function () {
      getBigPicture(dataCard);
    });
  };

  for (var i = 0; i < pictureItems.length; i++) {
    addPictureClickHandler(pictureItems[i], window.data[i]);
  }

  // Закрываем большое фото

  var bigPictureCansel = document.querySelector('#picture-cancel');

  var onBigPictureEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    userPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  bigPictureCansel.addEventListener('click', function () {
    closeBigPicture();
  });
})();
