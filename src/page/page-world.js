const gr = require('grimoirejs').default;
const $ = require('jquery');
const $$ = gr('#canvas');
const editorRunable = require('./editor-runable');
const { swifter } = require('./easing');

const editorConfig = [
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

editorRunable.goml('#world-container .middle .run', '.world', editors[1]);
editorRunable.goml('#world-container .rright .run', '.world', editors[3]);

const editorBuild = require('./editor-build')('#world-container', '.world', 1);
let delta = 0;
const apealPointFloatingBuild = 2;
$$('.world').on('build', (i) => {
  if (i === apealPointFloatingBuild) {
    $('#cg-engineer-tukaiyasui-container').stop(true, true).css({
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
  } else if (i === apealPointFloatingBuild + 1) {
    $('#cg-engineer-tukaiyasui-container').fadeOut(500, swifter);
    setTimeout(() => {
      editorBuild.build(i + delta);
    }, 200);
  } else {
    editorBuild.build(i + delta)
  }
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
  $('#cg-engineer-tukaiyasui-container').stop(true, false).removeAttr('style');
  delta = 0;
});
