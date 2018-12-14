'use strict';
// функция создающая случайное число
var randomNumber = function (minValue, maxValue) {
  var numberBox = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return numberBox;
};

// фнкция создающая ссылку на фотографию
var getPictureLink = function (countLink) {
  var pictureNumber = 0;
  var pictureAdress = 0;
  for (var i = 1; countLink >= i; i++) {
    pictureNumber = i;
    pictureAdress = 'photos/' + pictureNumber + '.jpg';
  }
  return pictureAdress;
};

// функция создающая количество лайков
var getLikesNumber = function () {
  var likesBox = randomNumber(15, 200);
  return likesBox;
};

// функция создания случайного аватара пользователя
var getUserAvatar = function () {
  var avatarLink = 'img/avatar-' + randomNumber(1, 6) + '.svg';
  return avatarLink;
};

// функция которая перебирает массив данных и возвращает случайное значение
var getRandomArrayValue = function (arrayName, indexArrayElement) {
  var getValue = arrayName[indexArrayElement];
  return getValue;
};

// массив с вариантами комментариев фотографий
var usersCommentsText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// функция создания случайного текста комментария
var getUserCommentText = function () {
  var userCommentText = getRandomArrayValue(usersCommentsText, randomNumber(0, 5));
  return userCommentText;
};

// массив авторов комментария
var usersNameArray = [
  'Артем',
  'Антон',
  'Егор',
  'Ирина',
  'Иван',
  'Наталья'
];

// функция создания случайного имени автора комментария
var getUserName = function () {
  var userNameBox = getRandomArrayValue(usersNameArray, randomNumber(0, 5));
  return userNameBox;
};

// функция создания полного блока комментария пользователя
var createUserComment = function () {
  var randomComment = {
    avatar: getUserAvatar(),
    message: getUserCommentText(),
    name: getUserName()
  };
  return randomComment;
};

// функция создания объекта описания фотографий
var getPhotoDescription = function (countLink1) {
  var userPhotoDescription = {
    url: getPictureLink(countLink1),
    likes: getLikesNumber(),
    comments: createUserComment()
  };
  return userPhotoDescription;
};

// функция создания массива объектов описания фотографий
var createCommentsArray = function () {
  var usersComments = [];
  for (var i = 0; i < 25; i++) {
    usersComments[i] = getPhotoDescription(i + 1);
  }
  return usersComments;
};

// -------------2-я часть задания--------------------

var commentsArray = createCommentsArray();
var pictureTemplate = document.querySelector('#picture');

var fragment = document.createDocumentFragment();

// функция создания DOM-элемента фотографий
var createHtmlNode = function (arrayData) {
  for (var i = 0; i < arrayData.length; i++) {
    var newNode = document.createElement('div');
    newNode = pictureTemplate.cloneNode(true);
    newNode.content.querySelector('.picture__img').src = arrayData[i].url;
    newNode.content.querySelector('.picture__likes').textContent = arrayData[i].likes;
    newNode.content.querySelector('.picture__comments').textContent = arrayData[i].comments.message;
    fragment.appendChild(newNode.content);
  }
  return fragment;
};
var insertElements = createHtmlNode(commentsArray);

// -----------------------3-я часть задания-----------------------------

var photoCommentContainer = document.querySelector('.pictures');
photoCommentContainer.appendChild(insertElements);

// ----------------------4-я часть задания------------------------------

var showBigPicture = function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').src = commentsArray[0].url;
  bigPicture.querySelector('.likes-count').textContent = commentsArray[0].likes;
  bigPicture.querySelector('.comments-count').textContent = 1; // как я понял, здесь нужно просто встявить своё кол-во комментов
  bigPicture.querySelector('.social__picture').src = 'img/avatar-' +
  randomNumber(1, 6) + '.svg';
  bigPicture.querySelector('.social__text').textContent = commentsArray[0].comments.message;
  bigPicture.querySelector('.social__caption').textContent = 'Описание фотографии'; // как я понял, описание фотографии потом будет приходить с сервера., а пока подсказали так сделать.
};
showBigPicture();

// ------------------------5-я часть задания-----------------------------

var hiddenDomElements = function () {
  var hiddenElement = document.querySelector('.social__comment-count').classList.add('visually-hidden');
  hiddenElement = document.querySelector('.comments-loader').classList.add('visually-hidden');
  return hiddenElement;
};

hiddenDomElements();
