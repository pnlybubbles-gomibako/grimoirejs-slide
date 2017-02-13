const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');

const $$ = gr('#canvas');

const ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/xml');
const editorConfig = [
  {
    id: 'xml-editor',
    mode: 'xml',
  },
  {
    id: 'js-editor',
    mode: 'javascript',
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
});

{
  const mesh = $$('.editor mesh');
  let phi = 0;
  const rotate = () => {
    mesh.setAttribute('rotation', `0,${phi},${phi}`);
    phi += 1;
    requestAnimationFrame(rotate);
  }
  rotate();
}

$$('.editor').on('show', () => {
  $('body').css({
    backgroundColor: '#f9efd5',
  });
});
$$('.editor').on('build', (i) => {
  switch (i) {
    case 1:
      $('#background .container').animate({
        top: -1 * document.body.clientHeight / 2 + 170,
      });
      $('#editor-container').delay(200).fadeIn(500, swifter);
      break;
    case 2:
      $$('.editor mesh').setAttribute('diffuse', 'green');
      break;
    case 3:
      $('.wrap').animate({
        left: '-100%',
      });
  }
});
$$('.editor').on('hide', (i) => {
  $$('.editor mesh').setAttribute('diffuse', 'orange');
  $('#editor-container').hide().removeAttr('style');
  $('#background .container').removeAttr('style');
  $('body').removeAttr('style');
});
