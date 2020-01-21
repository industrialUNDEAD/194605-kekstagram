'use strict';

var photoTemplate = document.querySelector('#picture');
var picturesContainer = document.querySelector('.pictures');
var overlayPhoto = document.querySelector('.big-picture');

var COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

var AUTHORS_NAMES = [
  'Егор',
  'Марина'
];

var OVERLAY_COMMENT_LIMIT = 5;

var getRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

var createMockComments = function (count) {
  var commentsMass = [];
  for (var i = 0; i < count; i++) {
    var randomCommet = {
      avatar: 'img/avatar-' + getRandomValue(1, 6) + '.svg',
      message: COMMENT_TEXT[getRandomValue(0, 1)],
      name: AUTHORS_NAMES[getRandomValue(0, 1)]
    };
    commentsMass.push(randomCommet);
  };
  return commentsMass;
};

var createMockPosts = function (quantity) {
  var photoMass = [];
  var photoNumeration = 1;
  for (var i = 0; i < quantity; i++) {
    var photoDescription = {
      url: 'photos/' + photoNumeration + '.jpg',
      likes: getRandomValue(15, 200),
      comments: createMockComments(getRandomValue(5, 8))
    };
    photoNumeration++;
    photoMass.push(photoDescription);
  };
  return photoMass;
};

var photoMockData = createMockPosts(25);
// console.log(photoMockData);

var createPostElements = function (postData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < postData.length; i++) {
    var embeddedContent = photoTemplate.content.querySelector('.picture').cloneNode(true);
    embeddedContent.querySelector('.picture__img').src = postData[i].url;
    embeddedContent.querySelector('.picture__likes').textContent = postData[i].likes;
    embeddedContent.querySelector('.picture__comments').textContent = postData[i].comments.length;
    fragment.appendChild(embeddedContent);
    embeddedContent = null;
  };
  return fragment;
};

picturesContainer.appendChild(createPostElements(photoMockData)); // Отрисовка моковых данных на странице


// overlayPhoto.classList.remove('hidden');
var overlayImage = overlayPhoto.querySelector('img');
var overlayLikes = overlayPhoto.querySelector('.likes-count');
var overlayComments = overlayPhoto.querySelector('.comments-count');
var overlayDescription = overlayPhoto.querySelector('.social__caption');
overlayImage.src = photoMockData[0].url;
overlayLikes.textContent = photoMockData[0].likes;
overlayComments.textContent = photoMockData[0].comments.length;
overlayDescription.textContent = 'Клёвый пляж=D';

var commentsList = document.querySelector('.social__comments');


var commentsReplace = function (commentsMass) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OVERLAY_COMMENT_LIMIT; i++) {
    var overlayMockComment = commentsList.querySelector('.social__comment').cloneNode(true);
    var avatarAuthor = overlayMockComment.querySelector('.social__picture');
    avatarAuthor.src = commentsMass[i].avatar;
    var commentContent = overlayMockComment.querySelector('.social__text');
    commentContent.textContent = commentsMass[i].message;
    fragment.appendChild(overlayMockComment);
  };
  removeChildNodes(commentsList.children.length, commentsList);
  return fragment;
};

var removeChildNodes = function (count, parent) {
  for (var i = 0; i < count; i++) {
    parent.children[0].remove();
  };
};

var hiddeElements = function (node) {
  node.classList.add('visually-hidden');
};

var commentCounter = overlayPhoto.querySelector('.social__comment-count');
var loaderComments = overlayPhoto.querySelector('.comments-loader');
hiddeElements(commentCounter);
hiddeElements(loaderComments);

commentsList.appendChild(commentsReplace(photoMockData[0].comments));


/////////////////////////// Модуль Обработки событий  ///////////////////////////////////////////////

var uploadButton = document.querySelector('#upload-file');
var editorPhoto = document.querySelector('.img-upload__overlay');
var editorButtonClose = document.querySelector('#upload-cancel');
var overlayButtonClose = document.querySelector('#picture-cancel');

var openEditorPhoto = function () {
  editorPhoto.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closeEditorPhoto();
    }
  });
};

var closeEditorPhoto = function () {
  editorPhoto.classList.add('hidden');
  uploadButton.value = '';
};

uploadButton.addEventListener('change', openEditorPhoto);

editorButtonClose.addEventListener('click', closeEditorPhoto);

var picturesPosition = document.querySelectorAll('.picture'); // гнезда для показа пользовательиских фотографий


var closeOverlay = function () {
  overlayPhoto.classList.add('hidden');
};

var showPhotoOverlay = function (overlayContent) { // функция-метод отрисовки оверлея
  overlayPhoto.classList.remove('hidden');
  overlayImage.src = overlayContent.url;
  overlayLikes.textContent = overlayContent.likes;
  overlayComments.textContent = overlayContent.comments.length;
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closeOverlay();
    }
  });
};

overlayButtonClose.addEventListener('click', function () {
  closeOverlay();
});

var addClickListener = function (renderNode, dataObject) {
  renderNode.addEventListener('click', function () {
    showPhotoOverlay(dataObject);
  });
};

var addOverlayOpen = function (clickElement, dataInsert) {
  for (var i = 0; i < clickElement.length; i++) {
    addClickListener(clickElement[i], dataInsert[i]);
  }
};

addOverlayOpen(picturesPosition, photoMockData); // добавление функции открытия оверлея для каждой фотографии

var photoViewer = document.querySelector('.img-upload__preview');
// var effectPhotoNames = [];
// var effectToggles = document.querySelectorAll('.effects__radio');
// for (var i = 0; i < effectToggles.length; i++) {
//   effectPhotoNames.push(effectToggles[i].value);
// }

var effectPhotoButtons = document.querySelectorAll('.effects__radio');
var effectPhotoNames = [];
var effectDescriptions = document.querySelectorAll('.effects__preview');
var createEffectsList = function () {
  for (var i = 0; i < effectDescriptions.length; i++) {
    var currentClassName;
    currentClassName = effectDescriptions[i].classList[1];
    effectPhotoNames.push(currentClassName);
  }
  return effectPhotoNames;
};

var effectsNamesList = createEffectsList();

var cleaningEffectFilter = function (effectsList) {
  for (var i = 0; i < effectsList.length; i++) {
    if (photoViewer.classList.contains(effectsList[i])) {
      photoViewer.classList.remove(effectsList[i]);
    }
  }
};

var addEffectToggles = function (nodes) {
  for (var i = 0; i < nodes.length; i++) {
    eddedToggle(nodes[i], i);
  }
};

var eddedToggle = function (nodeListener, elementIndex) {
  nodeListener.addEventListener('click', function () {
    cleaningEffectFilter(effectsNamesList);
    photoViewer.classList.add(effectsNamesList[elementIndex]);
  });
};

addEffectToggles(effectPhotoButtons);

console.log(effectsNamesList);
