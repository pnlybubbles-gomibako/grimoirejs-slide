const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');
require('./threejs-main')('#threejs-container .box', 512, 512);
require('./jquery-main')('#jquery-container .box');

const $$ = gr('#canvas');

const ace = require('brace');
require('brace/mode/javascript');
const editorConfig = [
  {
    id: 'jquery-editor',
    mode: 'javascript',
  },
  {
    id: 'threejs-editor',
    mode: 'javascript',
  },
  {
    id: 'grimoire-editor',
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
  editor.setFontSize(20);
});

$$('.compare').on('show', () => {
});
$$('.compare').on('build', (i) => {
  switch (i) {
    case 1:
      $('#jquery-container').fadeIn(500, swifter);
      $('#threejs-container').css({
        left: '50%',
      }).fadeIn(500, swifter);
      // $('#background .container').animate({
      //   left: '25%',
      //   right: 'auto',
      // }, 500, swifter).promise().then((this_) => {
      //   $(this_).css({
      //     width: '50%',
      //     left: 'auto',
      //     right: 0,
      //   });
      //   $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
      // });
      break;
    case 2:
      // $('#jquery-container').animate({
      //   top: -270,
      // }, 500, swifter);
      // $('#background .container').animate({
      //   top: -270,
      // }, 500, swifter);
      // $('#compare-editors').delay(500).fadeIn(500, swifter);
      break;
  }
});
$$('.compare').on('hide', (i) => {
  console.log('hide compare');
  $('#background .container').removeAttr('style');
  $('#jquery-container').hide().removeAttr('style');
  $('#threejs-container').hide().removeAttr('style');
  $('#grimoire-container').hide().removeAttr('style');
  $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
});
