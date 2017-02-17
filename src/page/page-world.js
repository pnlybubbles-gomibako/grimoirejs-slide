const gr = require('grimoirejs').default;
const $ = require('jquery');
const $$ = gr('#canvas');
const editorRunable = require('./editor-runable');
const { swifter } = require('./easing');

const editorConfig = [
  {
    id: 'component-editor',
    mode: 'xml',
    text: require('./sample/component.goml.txt'),
  },
  {
    id: 'component-js-editor',
    mode: 'javascript',
    text: require('./sample/component.js.txt'),
  },
  {
    id: 'rotate-editor',
    mode: 'xml',
    text: require('./sample/rotate.goml.txt'),
  },
  {
    id: 'register-editor',
    mode: 'javascript',
    text: require('./sample/register.js.txt'),
  },
  {
    id: 'rotate-node-editor',
    mode: 'xml',
    text: require('./sample/rotate-node.goml.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

editorRunable.goml('#world-container .right .run', '.world', editors[2]);
editorRunable.goml('#world-container .rrright .run', '.world', editors[4]);

const editorBuild = require('./editor-build')('#world-container', '.world', 4);
let delta = 0;
$$('.world').on('build', (i) => {
  if (i === 3) {
    $('#cg-engineer-tukaiyasui-container').stop(false, true).css({
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
        $('#cg-engineer-tukaiyasui-container').css({
          transform: `scale(${now})`,
        });
      },
      queue: false,
    });
    $('#cg-engineer-tukaiyasui-container').fadeIn(500, swifter);
    delta = -1;
  }
  if (i === 4) {
    $('#cg-engineer-tukaiyasui-container').fadeOut(500, swifter);
  }
  setTimeout(() => {
    editorBuild.build(i + delta);
  }, 200);
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
  $('#cg-engineer-tukaiyasui-container').stop(false, true).removeAttr('style');
  delta = 0;
});
