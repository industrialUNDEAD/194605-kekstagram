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
var imagePreview = document.querySelector('.img-upload__preview > img'); // найти блок с загруженным изображением
var keyboardToggle = document.querySelectorAll('.effects__item'); // найти элементы переключения эффектов фотографий с клавиатуры
var hashtagsInput = document.querySelector('.text__hashtags'); // найти поле для ввода хештегов

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
  // effectToggle.addEventListener('keydown', function (evt) { // вариант переключения эффектов на нажатию пробела
  //   if (evt.keyCode === 32) {
  //     toggleEffect(effectToggle);
  //   } else {
  //     return;
  //   }
  // });
};

for (var i = 0; i < keyboardToggle.length; i++) { // цикл создающий замыкание для переключения эффектов
  onEffectToggle(keyboardToggle[i]);
}

// var userHashtags = hashtagsInput.value.split(' '); // разбиение ввёденых хештегов на массив строк
// console.log(userHashtags);

// hashtagsInput.addEventListener('input', function () {
//   if (hashtagsInput.value.indexOf('#') === -1) {
//     hashtagsInput.setCustomValidity('Хештег должен начинаться с символа решетки #');
//   } else {
//     hashtagsInput.setCustomValidity('');
//   }
// });

// Вариант валидации хештегов

var QUANTITY_HASH_TAG = 5; // допустимое количество хештегов
var HASH_TAG_LENGTH = 20; // допустимая длинна одного хештега

var getCountHashTag = function (text) { // функция считает количество хеш-тегов
  var count = 0; // счетчик считающий количество хештегов
  var post = text.indexOf('#'); // переменная, которая ищет символы решетки для хештегов

  while (post !== -1) { // условие проверяющее налачие символа решетки
    count++; // увеличение счетчика хештегов
    post = text.indexOf('#', post + 1); // назначение поиска следующего символа
  }
  return count; // возращение количества хештегов из функции
};

var removeSameElement = function (elements) { // функция проверяет есть ли одинаковые хештеги
  var obj = {}; // создание объекта для записи хештегов в свойства этого объекта
  for (var i = 0; i < elements.length; i++) { // создания цикла для записи каждого хештега в свойства объекта
    var element = elements[i]; // создания переменной хранаящей текущий хештег
    obj[element] = true; // запомнить строку в виде свойства объекта
  }
  return Object.keys(obj); // возвращение ключей свойств объекта., если у объекта будут 2 одинаковых свойства, то одно просто перезапишет другое, 2 одинаковых быть не сможет
};

hashtagsInput.addEventListener('input', function () { // обработчик проводящий валидацию поля хештегов
  var hashTagText = hashtagsInput.value.trim(); // запись текста хештегов в отдельную переменную
  var hashTags = hashTagText.toLowerCase().split(' '); // запись в отдельную переменную массива хештегов
  var errorMessage = ''; // переменная для вывода сообщения с ошибкой валидации пользователя
  if (getCountHashTag(hashTagText) > QUANTITY_HASH_TAG) { // проверка на соответсвтие количества хештегов
    errorMessage = 'Нельзя указать больше пяти хэш-тегов'; // сообщение о неверном количестве хештегов
  }

  if (removeSameElement(hashTags).length < hashTags.length) { // проверка на наличие одинаковых хештегов
    errorMessage = 'Один и тот же хэш-тег не может быть использован дважды'; // сообщение о недопустимости повторения хештегов
  }

  for (var i = 0; i < hashTags.length; i++) { // цикл проводящий валидацию полученных хештегов
    var hashTag = hashTags[i]; // создание переменной хранящей отдельно взятый хештег
    if (hashTag[0] !== '#') { // проверка на наличие решетки на начале хештега
      errorMessage = 'Хэш-тег должен начинаться с решетки #'; // вывода сообщения об отсутствии решетки в названии хештега
    } else if (hashTag.length === 1) { // проверка на наличие символов, кроме решетки
      errorMessage = 'Хеш-тег не может состоять только из одной решётки'; // вывода сообщения об отсутствии остальных символов
    } else if (hashTag.length > HASH_TAG_LENGTH) { // проверка на длинну отдельного хештега
      errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку'; // вывод сообщения об превешении макисальной длинны хештега
    } else if (hashTag.indexOf('#', 1) > 1) { // проверка на наличие пробелов между хештегами
      errorMessage = 'Хэштеги должны разделяться пробелами'; // вывод сообщения об отсутсвии пробелов
    }
  }
  if (hashTag === '') { // проверка на отсутсвтие хештегов
    errorMessage = ''; // в таком случае ошибок нет
  }
  hashtagsInput.setCustomValidity(errorMessage); // вывод сообщения о провале валидации формы
});

// Вариант валидации хештегов

// ------------------------5-й модуль----------------------------------------

var sliderEffectLevel = document.querySelector('.effect-level__pin'); // найти пин слайдера
var sliderEffectLine = document.querySelector('.effect-level__line'); // найти шкалу применяемого эффекта
var sliderEffectValue = document.querySelector('.effect-level__value'); //
var sliderEffectDepth = document.querySelector('.effect-level__depth');
var preview = document.querySelector('.img-upload__preview');
var slider = document.querySelector('.effect-level');
var effectsDirectoryFilter;
var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
var currentFilter;
var WIDTH_SCALE = 453; // найти ширину шкалы эффекта
var BORDERS_OF_BRIGHTNESS = 2 + 1;
var BORDERS_OF_BLUR = 3;
var BORDERS_OF_INVERT = 100;
var EFFECT_LEVEL_MAX = 1;
var EFFECT_LEVEL_MIN = 0;
var effectItems = document.querySelectorAll('.effects__radio');

var getNone = function () {
  slider.classList.add('hidden');
  for (var i = 1; i < effectNames.length - 1; i++) {
    effectsDirectory[effectNames[i]](EFFECT_LEVEL_MIN);
  }
};

var getChrome = function (grayScale) {
  preview.style.filter = 'grayscale(' + grayScale + ')';
};

var getSepia = function (sepia) {
  preview.style.filter = 'sepia(' + sepia + ')';
};

var getMarvin = function (invert) {
  preview.style.filter = 'invert(' + invert * BORDERS_OF_INVERT + '%)';
};

var getPhobos = function (blur) {
  preview.style.filter = 'blur(' + blur * BORDERS_OF_BLUR + 'px)';
};

var getHeat = function (brightness) {
  preview.style.filter = 'brightness(' + (brightness * BORDERS_OF_BRIGHTNESS) + ')';
};

// Объект с вызовами фенкций для эффектов

var effectsDirectory = {
  none: getNone,
  chrome: getChrome,
  sepia: getSepia,
  marvin: getMarvin,
  phobos: getPhobos,
  heat: getHeat
};

// Применения эффекта для изображения

var addEffectListClickHandler = function (effects, effectName) {
  effects.addEventListener('click', function () {
    sliderEffectLevel.style.left = 100 + '%';
    sliderEffectDepth.style.width = 100 + '%';
    slider.classList.remove('hidden');
    preview.classList.remove(currentFilter);
    currentFilter = 'effects__preview--' + effectName;
    preview.classList.add(currentFilter);
    effectsDirectoryFilter = effectName;
    if (effectsDirectoryFilter === 'none') {
      getNone();
    } else {
      effectsDirectory[effectsDirectoryFilter](EFFECT_LEVEL_MAX);
    }
  });
};

for (var i = 0; i < effectItems.length; i++) {
  addEffectListClickHandler(effectItems[i], effectNames[i]);
}

// Перетаскивание ползунка
sliderEffectLevel.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var movePin = sliderEffectLevel.offsetLeft - shift.x;
    var coordsPin = movePin + 'px';

    if (movePin >= 0 && movePin <= WIDTH_SCALE) {
      sliderEffectLevel.style.left = coordsPin;
      sliderEffectDepth.style.width = coordsPin;
      var effectLevel = sliderEffectLevel.offsetLeft / sliderEffectLine.offsetWidth;
      effectsDirectory[effectsDirectoryFilter](effectLevel);
      sliderEffectValue.value = effectLevel * 100;
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


// effectLevelLine.addEventListener('click', function () {
//   effectLevelLine.getBoundingClientRect();
//   console.log(effectLevelLine.getBoundingClientRect());
// });

// effectLevelPin.addEventListener('mouseup', function () { // обработчик события отпускания ползунка
//   var mouseClick = effectLevelLine.getBoundingClientRect().x; // метод возвращающий координаты
//   console.log(mouseClick);
//   return mouseClick;
// });

buttonUploadCancel.addEventListener('click', closeUploadModal); // обработчик закрытия редактора по клику
  console.log(hashtagsInput);
