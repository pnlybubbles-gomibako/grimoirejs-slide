const gr = require('grimoirejs').default;
const $ = require('jquery');

const $$ = gr('#canvas');

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

$('#world-container .right .run').on('click', (this_) => {
  const text = editors[2].getValue();
  const parsed = (new DOMParser).parseFromString(text, 'application/xml').documentElement;
  const scene = parsed.querySelector('scene');
  console.log(scene);
  $$('.world *').forEach((v) => {
    if (v.name.name !== 'camera' && v.name.name !== 'light' && v.name.name !== 'text') {
      v.remove();
    }
  });
  Array.from(scene.childNodes).forEach((node) => {
    if (node.nodeType !== 1) { return; }
    if (node.nodeName === 'camera' || node.nodeName === 'light') { return; }
    $$('.world').append(node.outerHTML);
  });
});

$('#world-container .rrright .run').on('click', (this_) => {
  const text = editors[4].getValue();
  const parsed = (new DOMParser).parseFromString(text, 'application/xml').documentElement;
  const scene = parsed.querySelector('scene');
  console.log(scene);
  $$('.world *').forEach((v) => {
    if (v.name.name !== 'camera' && v.name.name !== 'light' && v.name.name !== 'text') {
      v.remove();
    }
  });
  Array.from(scene.childNodes).forEach((node) => {
    if (node.nodeType !== 1) { return; }
    if (node.nodeName === 'camera' || node.nodeName === 'light') { return; }
    $$('.world').append(node.outerHTML);
  });
});

$$('.world').on('show', () => {
});

const editorBuild = require('./editor-build')('#world-container', '.world', 4);
$$('.world').on('build', (i) => {
  editorBuild.build(i);
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
});
