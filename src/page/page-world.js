const gr = require('grimoirejs').default;
const $ = require('jquery');

const $$ = gr('#slide');

const editorConfig = [
  {
    id: 'component-editor',
    mode: 'xml',
    text: require('./sample/component.goml.txt'),
  },
  {
    id: 'rotate-editor',
    mode: 'xml',
    text: require('./sample/rotate.goml.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

{
  let phi = 0;
  const rotate = () => {
    $$('.world mesh').setAttribute('rotation', `0,${phi},${phi}`);
    phi += 1;
    requestAnimationFrame(rotate);
  }
  rotate();
}

$('#world-container .right .run').on('click', (this_) => {
  const text = editors[1].getValue();
  const parsed = (new DOMParser).parseFromString(text, 'application/xml').documentElement;
  const scene = parsed.querySelector('scene');
  console.log(scene);
  $$('.world *').forEach((v) => {
    if (v.name.name !== 'camera' && v.name.name !== 'light') {
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

const editorBuild = require('./editor-build')('#world-container', '.world');
$$('.world').on('build', (i) => {
  editorBuild.build(i);
});

$$('.world').on('hide', (i) => {
  $$('.world mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
});
