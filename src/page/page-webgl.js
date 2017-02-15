const $$ = gr('#canvas');
const { swifter } = require('./easing');

const $ = require('jquery');
$('.webgl-caption-container').hide();

$$('.webgl-start').on('show', () => {
  $('.webgl-caption-container').stop(false, true).fadeIn(1000, swifter);
});

$$('.webgl-start').on('hide', (_, delta) => {
  if (delta <= 0) {
    $('.webgl-caption-container').stop(false, true).removeAttr('style');
  }
});

$$('.webgl-end').on('build', (i) => {
  switch (i) {
    case 1:
      $('.webgl-caption-container').stop(false, true).fadeOut(500, swifter).promise().then(() => {
        $$('.webgl-end').single().getComponent('PageScene').operate(1);
      });
      break;
  }
});

$$('.webgl-end').on('show', (_, delta) => {
  if (delta <= 0) {
    $('.webgl-caption-container').show();
  }
});

$$('.webgl-end').on('hide', (_, delta) => {
  if (delta > 0) {
    $('.webgl-caption-container').stop(false, true).removeAttr('style');
  }
});
