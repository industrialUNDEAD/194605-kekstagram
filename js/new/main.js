'use strict';

var mockTemplate = document.querySelector("#picture").content;
var mockDataComments = document.querySelector(".pictures");
var overlayPhoto = document.querySelector(".big-picture");
console.log(overlayPhoto);

var COMMENTS_TEXT = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё."
];

var COMMENTS_AUTHORS = [
  "Егор",
  "Антон"
];

var fullComments = [];

var createRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


var createDescriptionArr = function (count, arr) {
  var numberIndex= 1;
  for(var i = 0; i < count; i++) {
    var arrItem;
    arrItem = createDescObject("CommentData" + i, numberIndex);
    numberIndex++;
    arr.unshift(arrItem);
  }
};

var addMockComment = function (count, textComment, nameComment) {
  for(var i = 0; i < count; i++) {
    var name = nameComment + i;
    name = {
      UserComment: textComment
    };
    var commentObjects = [];
    commentObjects.unshift(name);
  }
  return commentObjects;
};

var createDescObject = function (objectName, numeration) {
  var commentsData = addMockComment(createRandomNumber(1, 2), COMMENTS_TEXT[createRandomNumber(1, 2)], COMMENTS_AUTHORS[createRandomNumber(1, 2)]);
  var objectName = {
    url: "photos/" + numeration + ".jpg",
    avatar: "img/avatar-" + createRandomNumber(1, 6) + ".svg",
    message: commentsData,
    name: COMMENTS_AUTHORS[createRandomNumber(0, 2)],
    likes: createRandomNumber(15, 200)
  };
  return objectName;
};

createDescriptionArr(25, fullComments);

var createPhotoNode = function (data) {
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < data.length; i++) {
    var newNode = mockTemplate.cloneNode(true);
    newNode.querySelector(".picture__img").src = data[i].url;
    newNode.querySelector(".picture__likes").textContent = data[i].likes;
    newNode.querySelector(".picture__comments").textContent = data[i].message.length;
    fragment.appendChild(newNode);
  }
  return fragment;
}

var addMockData = function () {
  mockDataComments.appendChild(createPhotoNode(fullComments));
};

addMockData();

var openOverlay = function () {
  overlayPhoto.classList.remove("hidden");
  overlayPhoto.querySelector(".big-picture__img").src = fullComments[0].url;
  overlayPhoto.querySelector(".likes-count").textContent = fullComments[0].likes;
  overlayPhoto.querySelector(".comments-count").textContent = fullComments[0].message.length;
  overlayPhoto.querySelector(".social__picture").src = fullComments[0].avatar;
  overlayPhoto.querySelector(".social__comment-count").classList.add("visually-hidden");
  overlayPhoto.querySelector(".comments-loader").classList.add("visually-hidden");
};

var downloadNode = document.querySelector("#upload-file");
var editPhotoPanel = document.querySelector(".img-upload__overlay");
var buttonCloseEdit = document.querySelector(".img-upload__cancel");
var editPhoto = document.querySelector(".img-upload__preview").children[0];

downloadNode.addEventListener("change", function () {
  editPhotoPanel.classList.remove("hidden");
});

buttonCloseEdit.addEventListener("click", function () {
  editPhotoPanel.classList.add("hidden");
});

// openOverlay();

console.log(editPhoto);
