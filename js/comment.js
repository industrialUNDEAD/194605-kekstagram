'use strict';

(function () {

  // Создаём элементы для комментариев

  var commentListItems = document.querySelector('.social__comments');

  var createCommentElement = function (number) {

    var fragment = document.createDocumentFragment();
    var liForComment = document.querySelector('.social__comment');

    for (var i = 0; i < number; i++) {
      var commentElement = liForComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = window.data[0].comments[i].avatar;
      commentElement.querySelector('.social__text').textContent = window.data[0].comments[i].message;

      fragment.appendChild(commentElement);
    }
    commentListItems.appendChild(fragment);
  };
  window.createCommentElement = createCommentElement;
})();
