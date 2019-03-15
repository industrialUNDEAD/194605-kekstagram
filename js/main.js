'use strict';
// массив с вариантами комментариев фотографий
var USERS_COMMENTS_TEXT = [ // сделать константой
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// массив авторов комментария
var USERS_NAME_ARRAY = [
  'Артем',
  'Антон',
  'Егор',
  'Ирина',
  'Иван',
  'Наталья'
];

// функция создающая случайное число
var randomNumber = function (minValue, maxValue) {
  var numberBox = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return numberBox;
};

// фнкция создающая ссылку на фотографию
var getPictureLink = function (countLink) {
  var pictureAdress = 0;
  for (var i = 1; i <= countLink; i++) {
    pictureAdress = 'photos/' + i + '.jpg';
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
var getRandomArrayValue = function (arrayName) {
  var getValue = arrayName[randomNumber(0, arrayName.length - 1)]; // должна считать случайное число
  return getValue;
};

// функция создания случайного текста комментария
var getUserCommentText = function () {
  var userCommentText = getRandomArrayValue(USERS_COMMENTS_TEXT);
  return userCommentText;
};

// функция создания случайного имени автора комментария
var getUserName = function () {
  var userNameBox = getRandomArrayValue(USERS_NAME_ARRAY);
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
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var fragment = document.createDocumentFragment();

// функция создания DOM-элемента фотографий
var createHtmlNode = function (data) {
  for (var i = 0; i < data.length; i++) {
    var newNode = pictureTemplate.cloneNode(true);
    newNode.querySelector('.picture__img').src = data[i].url;
    newNode.querySelector('.picture__likes').textContent = data[i].likes;
    newNode.querySelector('.picture__comments').textContent = data[i].comments.message;
    fragment.appendChild(newNode);
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
  bigPicture.querySelector('.comments-count').textContent = 1; // как я понял, здесь нужно просто вставить своё кол-во комментов
  bigPicture.querySelector('.social__picture').src = 'img/avatar-' +
  randomNumber(1, 6) + '.svg';
  bigPicture.querySelector('.social__text').textContent = commentsArray[0].comments.message;
  bigPicture.querySelector('.social__caption').textContent = 'Описание фотографии'; // как я понял, описание фотографии потом будет приходить с сервера., а пока подсказали так сделать.
};
// showBigPicture();  временно убираю вызов отрисовки оверлея для 4-го задания

// ------------------------5-я часть задания-----------------------------

var hiddenDomElements = function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

hiddenDomElements();

// ------------------------4-Й МОДУЛЬ-------------------------------------

var uploadControl = document.querySelector('#upload-file'); // найти поле загрузки файлов
var editingForm = document.querySelector('.img-upload__overlay'); // найти форму редактирования фотографий
var buttonUploadCancel = document.querySelector('#upload-cancel'); // найти кнопку закрытия формы редактирования
var effectLevelPin = document.querySelector('.effect-level__pin'); // найти пин слайдера
var effectLevelLine = document.querySelector('.effect-level__line'); // найти шкалу применяемого эффекта
var imagePreview = document.querySelector('.img-upload__preview > img'); // найти блок с загруженным изображением
var effectToggles = document.querySelectorAll('.effects__preview'); // найти переключатели эффектов
var keyboardToggle = document.querySelectorAll('.effects__item'); // найти элементы переключения эффектов фотографий с клавиатуры

uploadControl.addEventListener('change', function () { // обработчик события изменения поля загрузки файлов
  editingForm.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) { // обработчик закритя редактора по нажитию esc
    if (evt.keyCode === 27) {
      closeUploadModal();
      uploadControl.value = ''; // сброс значения поля формы при закрытие клавишей, иначе одну и ту же фотографию не открыть
    }
  });
});

var closeUploadModal = function () { // функция закрытия формы редактирования фотограий
  editingForm.classList.add('hidden');
};

var toggleEffect = function (toggle) { // функция добавления и удаления эффектов при нажатии или клике
  if (toggle.children[1].children[0].classList.contains('effects__preview--none')) {
    imagePreview.classList = '';
  } else if (toggle.children[1].children[0].classList.contains('effects__preview--chrome')) {
    imagePreview.classList = '';
    imagePreview.classList.add('effects__preview--chrome');
  } else if (toggle.children[1].children[0].classList.contains('effects__preview--sepia')) {
    imagePreview.classList = '';
    imagePreview.classList.add('effects__preview--sepia');
  } else if (toggle.children[1].children[0].classList.contains('effects__preview--marvin')) {
    imagePreview.classList = '';
    imagePreview.classList.add('effects__preview--marvin');
  } else if (toggle.children[1].children[0].classList.contains('effects__preview--phobos')) {
    imagePreview.classList = '';
    imagePreview.classList.add('effects__preview--phobos');
  } else if (toggle.children[1].children[0].classList.contains('effects__preview--heat')) {
    imagePreview.classList = '';
    imagePreview.classList.add('effects__preview--heat');
  }
};


var onEffectToggle = function (effectToggle) { // функция переключающая эффекты наложения по клику и по нажатию клавиши
  effectToggle.addEventListener('click', function () {
    toggleEffect(effectToggle);
    return;
  });
  effectToggle.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 32) {
      toggleEffect(effectToggle);
    } else {
      return;
    }
  });
};

for (var i = 0; i < effectToggles.length; i++) { // цикл создающий замыкание для переключения эффектов
  onEffectToggle(keyboardToggle[i]);
}

effectLevelPin.addEventListener('mouseup', function () { // обработчик события отпускания ползунка
  var mouseClick = effectLevelLine.getBoundingClientRect().x; // метод возвращающий координаты
  console.log(mouseClick);
  return mouseClick;
});

buttonUploadCancel.addEventListener('click', closeUploadModal); // обработчик закрытия редактора по клику
  console.log(effectToggles);
