const $ = require('jquery');
const gr = require('grimoirejs').default;
const $$ = gr('#slide');
const {swifter} = require('./easing');

module.exports = (container, page) => {
  return {
    build: (i) => {
      switch (i) {
        case 1:
          $('#background .container').stop(false, true).animate({
            top: '-32%',
          }, 500, swifter);
          $(container).delay(200).stop(false, true).fadeIn(500, swifter);
          $$(`${page} text`).setAttribute('enabled', false);
          break;
        case 2:
          $(`${container} .wrap`).stop(false, true).animate({
            left: '-100%',
          });
          break;
        case 3:
          $('#background .container').stop(false, true).animate({
            top: 0,
          }, 500, swifter);
          $(container).stop(false, true).fadeOut(500, swifter)
          $$(page).single().getComponent('PageScene').operate(1);
          break;
      }
    },
    reset: () => {
      $(container).hide().removeAttr('style');
      $(`${container} .wrap`).removeAttr('style');
      $('#background .container').removeAttr('style');
    },
  };
};
