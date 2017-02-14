const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');
require('./threejs-main')('#threejs-container .box', 512, 512);
require('./jquery-main')('#jquery-container .box');
require('./grimoire-main')('#compare-canvas', 'mesh');

const $$ = gr('#slide');

const editorConfig = [
  {
    id: 'jquery-editor',
    mode: 'javascript',
    text: require('./sample/jquery-div-color.txt'),
  },
  {
    id: 'threejs-editor',
    mode: 'javascript',
    text: require('./sample/three-color.txt'),
  },
  {
    id: 'grimoire-editor',
    mode: 'javascript',
    text: require('./sample/grimoire-color.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

$$('.compare').on('show', () => {
  $('#jquery-container').fadeIn(500, swifter);
  $('#threejs-container').css({
    left: '50%',
  }).fadeIn(500, swifter);
});
$$('.compare').on('build', (i) => {
  switch (i) {
    case 1:
      $('#jquery-container .flex').animate({
        height: 300,
      }, 500, swifter);
      $('#threejs-container .flex').animate({
        height: 300,
      }, 500, swifter);
      break;
    case 2:
      $('#jquery-container').animate({
        left: '-50%',
      }, 500, swifter);
      $('#threejs-container').animate({
        left: '0%',
      }, 500, swifter);
      $('#grimoire-container .flex').css({
        height: 300,
      });
      $('#grimoire-container').css({
        left: '100%',
      }).show().animate({
        left: '50%',
      }, 500, swifter);
      break;
    case 3:
      $('#threejs-container').css({
        transform: 'scale(1)',
      })
      $({
        scale: 1,
      }).animate({
        scale: 0.3,
      }, {
        duration: 500,
        easing: swifter,
        step(now) {
          $('#threejs-container').css({
            transform: `scale(${now})`,
          });
        },
        queue: false,
      })
      $('#threejs-container').fadeOut(500, swifter);
      $('#jquery-container').delay(200).animate({
        left: '0%',
      });
      break;
    case 4:
      $('.compare-container').fadeOut(500, swifter).promise().then(() => {
        $$('.compare').single().getComponent('PageScene').operate(1);
      });
  }
});
$$('.compare').on('hide', (i) => {
  console.log('hide compare');
  // $('#background .container').removeAttr('style');
  $('.compare-container').hide().removeAttr('style');
  $('.compare-container .flex').removeAttr('style');
  // $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
});
