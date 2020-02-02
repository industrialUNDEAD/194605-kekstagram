'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var hashTagsInput = document.querySelector('.text__hashtags');

  window.util = {
    hashTagsInput: hashTagsInput,
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  };
})();
