const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');

const $$ = gr('#slide');

const editorConfig = [
  {
    id: 'component-editor',
    mode: 'javascript',
    text: 'hello js',
  },
  {
    id: 'rotate-editor',
    mode: 'xml',
    text: 'hello xml',
  },
];
const editors = require('./editor-settings')(editorConfig);

{
  const mesh = $$('.world mesh');
  let phi = 0;
  const rotate = () => {
    mesh.setAttribute('rotation', `0,${phi},${phi}`);
    phi += 1;
    requestAnimationFrame(rotate);
  }
  rotate();
}

$$('.world').on('show', () => {
});

$$('.world').on('build', (i) => {
  switch (i) {
    case 1:
      $('#background .container').stop(false, true).animate({
        top: '-30%',
      }, 500, swifter);
      $('#world-container').delay(200).stop(false, true).fadeIn(500, swifter);
      break;
    case 2:
      $('#world-container .wrap').stop(false, true).animate({
        left: '-100%',
      });
    case 3:
      $('#background .container').stop(false, true).animate({
        top: 0,
      }, 500, swifter);
      $('#world-container').stop(false, true).fadeOut(500, swifter)
      $$('.editor').single().getComponent('PageScene').operate(1);
      break;
  }
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  $('#world-container').hide().removeAttr('style');
  $('#world-container .wrap').removeAttr('style');
  $('#background .container').removeAttr('style');
});
