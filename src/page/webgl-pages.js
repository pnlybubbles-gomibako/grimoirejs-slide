const $$ = gr('#canvas');
const { swifter } = require('./easing');

const $ = require('jquery');
$('.webgl-caption-container').hide();

$$('.webgl-start').on('show', () => {
  $('.webgl-caption-container').fadeIn(1000, swifter);
});

$$('.webgl-start').on('hide', (_, delta) => {
  if (delta <= 0) {
    $('.webgl-caption-container').removeAttr('style');
  }
});

$$('.webgl-end').on('build', (i) => {
  switch (i) {
    case 1:
      $('.webgl-caption-container').fadeOut(500, swifter).promise().then(() => {
        $$('.webgl-end').single().getComponent('PageScene').operate(1);
      });
      break;
  }
});

$$('.webgl-end').on('hide', () => {
  $('.webgl-caption-container').removeAttr('style');
});
