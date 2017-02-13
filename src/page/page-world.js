const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');

const $$ = gr('#canvas');

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
  $('body').css({
    backgroundColor: '#f9efd5',
  });
});

$$('.world').on('build', (i) => {
  switch (i) {
    case 1:
      $('#background .container').animate({
        top: '-30%',
      }, 500, swifter);
      $('#world-container').delay(200).fadeIn(500, swifter);
      break;
    case 2:
      $('#world-container .wrap').animate({
        left: '-100%',
      });
  }
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  $('#world-container').hide().removeAttr('style');
  $('#world-container .wrap').removeAttr('style');
  $('#background .container').removeAttr('style');
  $('body').removeAttr('style');
});
