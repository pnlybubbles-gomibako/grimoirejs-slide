const Tweenable = require('shifty');
const $$ = gr('#canvas');
const fp = $$('.fusion-page');
const { Color4 } = require('grimoirejs-math').default;

let tweenable = null
fp.on('build',function(i){
  const fusionShader = $$('mesh.fusion-shader');
  const grLogo = $$('mesh.gr-logo');
  switch(i){
    case 1:
      tweenable = (new Tweenable()).tween({
        from: {
          progress: 0,
        },
        to: {
          progress: 1,
        },
        duration: 1000,
        easing: 'swifter',
        step: (state) => {
          fusionShader.setAttribute('progress', state.progress);
          grLogo.setAttribute('color', new Color4(1, 1, 1, state.progress));
        },
      });
  }
});

fp.on('hide', () => {
  if (tweenable) {
    tweenable.stop();
    tweenable = null;
  }
  $$('mesh.fusion-shader').setAttribute('progress', '0');
  $$('mesh.gr-logo').setAttribute('color', 'rgba(255,255,255,0)');
});
