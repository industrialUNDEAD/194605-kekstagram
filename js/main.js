'use strict';
// функция создающая случайное число
var randomNumber = function (minValue, maxValue) {
  var numberBox = Math.floor(Math.random( ) * (maxValue - minValue + 1)) + minValue;
  return numberBox;
}

// фнкция создающая ссылку на фотографию
var getPictureLink = function (countLink) {
  var pictureNumber = 0;
  var pictureAdress = 0;
  for (var i = 1; countLink >= i; i++) {
    pictureNumber = i;
    pictureAdress = 'photos/' + pictureNumber + '.jpg';
  };
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
  for (var i = 0; i < 25 ; i++) {
    usersComments[i] = getPhotoDescription(i + 1);
  };
  return usersComments;
};

debugger;
var test = createCommentsArray();
console.log(test);
