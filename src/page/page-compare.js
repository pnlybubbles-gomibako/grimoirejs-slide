const gr = require('grimoirejs').default;
const $ = require('jquery');
const { swifter } = require('./easing');
require('./threejs-main')('#threejs-container .box', 512, 512);
require('./jquery-main')('#jquery-container .box');
require('./grimoire-main')('#compare-canvas', 'mesh');

const $$ = gr('#canvas');

const editorConfig = [
  {
    id: 'jquery-editor',
    mode: 'javascript',
    fontSize: '3vh',
    text: require('./sample/jquery-div-color.txt'),
  },
  {
    id: 'threejs-editor',
    mode: 'javascript',
    fontSize: '3vh',
    text: require('./sample/three-color.txt'),
  },
  {
    id: 'grimoire-editor',
    mode: 'javascript',
    fontSize: '3vh',
    text: require('./sample/grimoire-color.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

$$('.compare').on('show', () => {
  $('#jquery-container').stop(true, true).delay(500).fadeIn(500, swifter);
  $('#threejs-container').css({
    left: '50%',
  }).stop(true, true).delay(500).fadeIn(500, swifter);
});
$$('.compare').on('build', (i) => {
  switch (i) {
    case 1:
      $('#jquery-container .flex').stop(true, true).animate({
        height: 300,
      }, 500, swifter);
      $('#threejs-container .flex').stop(true, true).animate({
        height: 300,
      }, 500, swifter);
      $('#jquery-container .caption').text('jQuery');
      $('#threejs-container .caption').text('three.js');
      break;
    case 2:
      $('#jquery-container').stop(true, true).animate({
        left: '-50%',
      }, 500, swifter);
      $('#threejs-container').stop(true, true).animate({
        left: '0%',
      }, 500, swifter);
      $('#grimoire-container .flex').css({
        height: 300,
      });
      $('#grimoire-container').css({
        left: '100%',
      }).show().stop(true, true).animate({
        left: '50%',
      }, 500, swifter);
      break;
    case 3:
      $('#threejs-container').stop(true, true).css({
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
      $('#jquery-container').delay(200).stop(true, true).animate({
        left: '0%',
      });
      break;
    case 4:
      $('#sugoku-tukaiyasui-container').stop(true, true).css({
        transform: 'scale(2)',
      })
      $({
        scale: 2,
      }).animate({
        scale: 1,
      }, {
        duration: 500,
        easing: swifter,
        step(now) {
          $('#sugoku-tukaiyasui-container').css({
            transform: `scale(${now})`,
          });
        },
        queue: false,
      });
      $('#sugoku-tukaiyasui-container').fadeIn(500, swifter);
      break;
    case 5:
      $('.compare-container').stop(true, true).fadeOut(500, swifter).promise().then(() => {
        $$('.compare').single().getComponent('PageScene').operate(1);
      });
      break;
  }
});
$$('.compare').on('hide', (i) => {
  $('.compare-container').stop(true, true).removeAttr('style');
  $('.compare-container .flex').stop(true, true).removeAttr('style');
  $('#jquery-container .caption').text('HTML');
  $('#threejs-container .caption').text('WebGL');
});
