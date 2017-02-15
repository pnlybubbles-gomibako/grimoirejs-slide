const Tweenable = require('shifty');
const $$ = gr('#canvas');
const op = $$('.opening');

let tweenable = null;

op.on('build',function(i){
  const cameraOrigin = $$('.opening > .camera-origin');
  switch(i){
    case 1:
      tweenable = (new Tweenable()).tween({
        from: {
          rotation: 0,
        },
        to: {
          rotation: 180,
        },
        duration: 1000,
        easing: 'easeInOutQuad',
        step: (state) => {
          cameraOrigin.setAttribute('rotation', `y(${state.rotation})`);
        },
        finish() {
          tweenable = null;
        },
      });
      break;
    case 2:
      if (tweenable) {
        tweenable.stop();
        cameraOrigin.setAttribute('rotation', 'y(180)');
      }
      tweenable = (new Tweenable).tween({
        from: {
          rotation: 180,
        },
        to: {
          rotation: 360,
        },
        duration: 1000,
        easing: 'easeInOutQuad',
        step: (state) => {
          cameraOrigin.setAttribute('rotation', `y(${state.rotation})`);
        },
      });
      break;
  }
});

op.on('hide',function(){
  if (tweenable) {
    tweenable.stop();
    tweenable = null;
  }
  $$('.opening > .camera-origin').setAttribute('rotation','y(0d)');
});
