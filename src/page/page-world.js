const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');

const $$ = gr('#canvas');

const ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/xml');
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
editorConfig.forEach((v) => {
  $(`#${v.id}`).on('keyup', (e) => {
    e.stopPropagation();
  });
});
const editors = editorConfig.map((v) => ace.edit(v.id));
editors.forEach((editor, i) => {
  editor.getSession().setMode(`ace/mode/${editorConfig[i].mode}`);
  editor.renderer.setShowGutter(false);
  editor.setFontSize(30);
  editor.setValue(editorConfig[i].text);
  editor.clearSelection();
});

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
        top: -1 * document.body.clientHeight / 2 + 170,
      });
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
