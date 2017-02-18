const gr = require('grimoirejs').default;
const $$ = gr('#canvas');
const fp = $$('.fusion');
const { fadeIn, fadeOut } = require('./fade');
const { Color4 } = require('grimoirejs-math').default;

let tweenable = null;
let tweenable2 = null;
fp.on('build',function(i){
  switch(i) {
    case 1:
      tweenable = fadeIn('.fusion .gr-logo', () => {
        tweenable = null;
      }, (progress) => {
        $$('.fusion .fusion-shader').setAttribute('progress', progress);
      });
      break;
    case 2:
      if (tweenable) {
        tweenable.stop();
        tweenable = null;
      }
      if (tweenable2) {
        tweenable2.stop();
        tweenable2 = null;
      }
      tweenable2 = fadeOut('.fusion .gr-side', () => {
        tweenable2 = null;
      });
      tweenable = fadeIn('.fusion .gr-arrow', () => {
        tweenable = null;
      });
      break;
  }
});

fp.on('hide', () => {
  if (tweenable) {
    tweenable.stop();
    tweenable = null;
  }
  if (tweenable2) {
    tweenable2.stop();
    tweenable2 = null;
  }
  $$('.fusion .fusion-shader').setAttribute('progress', 0);
  $$('.fusion .gr-logo').setAttribute('color', new Color4(1, 1, 1, 0));
  $$('.fusion .gr-arrow').setAttribute('color', new Color4(1, 1, 1, 0));
  $$('.fusion .gr-side').setAttribute('color', new Color4(1, 1, 1, 1));
});
