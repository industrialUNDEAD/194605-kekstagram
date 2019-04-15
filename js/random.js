'use strict';

(function () {

  // Функция получающая случайнное число в заданном интервале

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  };

  // Функция получающая случайный элемент массива

  var getRandomElement = function (array) {
    var element = window.random.getRandomInt(0, array.length);
    return array[element];
  };

  window.random = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement
  };
})();
