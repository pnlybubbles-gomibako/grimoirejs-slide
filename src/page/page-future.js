const gr = require('grimoirejs').default;
const $$ = gr('#canvas');
const { fadeIn } = require('./fade');
const { Color4 } = require('grimoirejs-math').default;

let tweenable = null;
$$('.future').on('build', (i) => {
  switch (i) {
    case 1:
      tweenable = fadeIn('.future .future-image1', () => {
        tweenable = null;
      });
      break;
    case 2:
      if (tweenable) {
        tweenable.stop();
        tweenable = null;
      }
      tweenable = fadeIn('.future .future-image2', () => {
        tweenable = null;
      });
      break;
  }
});

$$('.future').on('hide', () => {
  if (tweenable) {
    tweenable.stop();
    tweenable = null;
  }
  $$('.future .future-image1').setAttribute('color', new Color4(1, 1, 1, 0));
  $$('.future .future-image2').setAttribute('color', new Color4(1, 1, 1, 0));
});
