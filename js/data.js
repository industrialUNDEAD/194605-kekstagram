'use strict';

(function () {

  var QUANTITY_ELEMENTS = 25;

  var usersComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var usersName = ['Акакий', 'Зигмунд', 'Апполинарий', 'Дормидонт', 'Сигизмунд', 'Феофан'];

  // Создаём объект с данными для комментариев

  var getComments = function (count) {
    var comments = [];

    for (var i = 0; i < count; i++) {
      var comment = {
        avatar: 'img/avatar-' + window.random.getRandomInt(1, 6) + '.svg',
        message: window.random.getRandomElement(usersComments),
        name: window.random.getRandomElement(usersName)
      };
      comments.push(comment);
    }
    return comments;
  };

  // Создаем массив объектов с даннми описывающими фото

  var data = [];

  var getObjects = function (quantity) {
    for (var i = 1; i < quantity + 1; i++) {
      var object = {
        url: 'photos/' + i + '.jpg',
        like: window.random.getRandomInt(15, 200),
        comments: getComments(6),
        description: 'Тестим новую камеру!'
      };

      data.push(object);
    }
  };

  getObjects(QUANTITY_ELEMENTS);
  window.data = data;
})();
