const $ = require('jquery');
const gr = require('grimoirejs').default;
const { Color4 } = require('grimoirejs-math').default;
const $$ = gr('#canvas');
const { swifter } = require('./easing');

module.exports = (container, page, slideCount) => {
  return {
    build: (i) => {
      switch (i) {
        case 1:
          $('#background .container').stop(true, true).animate({
            top: '-32%',
          }, 500, swifter);
          $(container).stop(true, true).delay(200).fadeIn(500, swifter);
          const color = $$(`${page} text`).getAttribute('color');
          $$(`${page} text`).setAttribute('color', new Color4(color.R, color.G, color.B, 0));
          break;
        case slideCount + 2:
          $('#background .container').stop(true, true).animate({
            top: 0,
          }, 500, swifter);
          $(container).stop(true, true).fadeOut(500, swifter)
          $$(page).single().getComponent('PageScene').operate(1);
          break;
        default:
          $(`${container} .wrap`).stop(true, true).animate({
            left: `-${100 * (i - 1)}%`,
          });
          break;
      }
    },
    reset: () => {
      $(container).stop(true, true).removeAttr('style');
      $(`${container} .wrap`).stop(true, true).removeAttr('style');
      $('#background .container').stop(true, true).removeAttr('style');
      const color = $$(`${page} text`).getAttribute('color');
      $$(`${page} text`).setAttribute('color', new Color4(color.R, color.G, color.B, 1));
    },
  };
};
