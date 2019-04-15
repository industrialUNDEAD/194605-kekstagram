'use strict';

(function () {
  // прячем блоки счётчика комментариев и загрузки новых комментариев

  var commentCount = document.querySelector('.social__comment-count');
  var commentLoad = document.querySelector('.comments-loader');

  commentCount.classList.add('visually-hidden');
  commentLoad.classList.add('visually-hidden');
})();
