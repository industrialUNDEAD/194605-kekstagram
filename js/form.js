'use strict';

(function () {

  var WIDTH_SCALE = 450;
  var BORDERS_OF_BRIGHTNESS = 2 + 1;
  var BORDERS_OF_BLUR = 3;
  var BORDERS_OF_INVERT = 100;
  var EFFECT_LEVEL_MAX = 1;
  var EFFECT_LEVEL_MIN = 0;

  // открываем и закрываем форму редактирования изображения

  var textDescription = document.querySelector('.text__description');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadFileClose = uploadOverlay.querySelector('#upload-cancel');

  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  var onUploadPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      if (window.util.hashTagsInput !== document.activeElement) {
        if (textDescription !== document.activeElement) {
          closeUploadPopup();
        }
      }
    }
  };

  var openUploadPopup = function () {
    uploadOverlay.classList.remove('hidden');
    getNone();
    document.addEventListener('keydown', onUploadPopupEscPress);
  };

  var closeUploadPopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadPopupEscPress);
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openUploadPopup();
  });

  uploadFileClose.addEventListener('click', function () {
    closeUploadPopup();
  });

  // Применение эффекта для изображения

  // Функции для эффектов (ползунок)

  var getNone = function () {
    slider.classList.add('hidden');
    for (var j = 1; j < effectNames.length - 1; j++) {
      effectsDirectory[effectNames[j]](EFFECT_LEVEL_MIN);
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

  // Применение эффекта для изображения (иконки)

  var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var preview = document.querySelector('.img-upload__preview');
  var effectItems = document.querySelectorAll('.effects__radio');
  var currentFilter;
  var sliderEffectLevel = document.querySelector('.effect-level__pin');
  var sliderEffectDepth = document.querySelector('.effect-level__depth');
  var sliderEffectValue = document.querySelector('.effect-level__value');
  var sliderEffectLine = document.querySelector('.effect-level__line');
  var slider = document.querySelector('.effect-level');
  var effectsDirectoryFilter;

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

  for (var j = 0; j < effectItems.length; j++) {
    addEffectListClickHandler(effectItems[j], effectNames[j]);
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

  // Изменяем масштаб фото

  var ScaleValue = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var smallerButton = document.querySelector('.scale__control--smaller');
  var biggerButton = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var scalePhoto = function (directionScale) {
    var currentScale = parseInt(scaleControlValue.value, 10);
    currentScale = currentScale + (ScaleValue.STEP * directionScale);
    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleControlValue.value = currentScale + '%';
      preview.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };

  smallerButton.addEventListener('click', function () {
    scalePhoto(-1);
  });

  biggerButton.addEventListener('click', function () {
    scalePhoto(1);
  });
})();
