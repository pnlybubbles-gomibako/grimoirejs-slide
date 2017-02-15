const gr = require('grimoirejs').default;
const $ = require('jquery');
const $$ = gr('#canvas');
const editorRunable = require('./editor-runable');

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
$$('.world').on('build', (i) => {
  editorBuild.build(i);
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
});
