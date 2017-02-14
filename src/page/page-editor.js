const gr = require('grimoirejs').default;
const $ = require('jquery');

const $$ = gr('#slide');

const editorConfig = [
  {
    id: 'xml-editor',
    text: require('./sample/change-color.goml.txt'),
    mode: 'xml',
  },
  {
    id: 'html-editor',
    text: require('./sample/change-color.html.txt'),
    mode: 'html',
  },
  {
    id: 'js-editor',
    mode: 'javascript',
    text: 'alert("hello world");',
  },
];
const editors = require('./editor-settings')(editorConfig);

$('#overlay').on('mousemove', $$('renderer').single().getComponent('Renderer')._mouseMoveHandler);
$('#overlay').on('mouseleave', $$('renderer').single().getComponent('Renderer')._mouseLeaveHandler);
$('#overlay').on('mouseenter', $$('renderer').single().getComponent('Renderer')._mouseEnterHandler);

{
  let phi = 0;
  const rotate = () => {
    $$('.editor mesh').setAttribute('rotation', `0,${phi},${phi}`);
    phi += 1;
    requestAnimationFrame(rotate);
  }
  rotate();
}

$('#editor-container .left .run').on('click', (this_) => {
  const text = editors[0].getValue();
  const parsed = (new DOMParser).parseFromString(text, 'application/xml').documentElement;
  const scene = parsed.querySelector('scene');
  console.log(scene);
  $$('.editor *').forEach((v) => {
    if (v.name.name !== 'camera' && v.name.name !== 'light') {
      v.remove();
    }
  });
  Array.from(scene.childNodes).forEach((node) => {
    if (node.nodeType !== 1) { return; }
    if (node.nodeName === 'camera' || node.nodeName === 'light') { return; }
    $$('.editor').append(node.outerHTML);
  });
});

$('#editor-container .right .run').on('click', (this_) => {
  const text = editors[1].getValue();
  eval(text);
});

$$('.editor').on('show', () => {
});

const editorBuild = require('./editor-build')('#editor-container', '.editor', 3);
$$('.editor').on('build', (i) => {
  switch (i) {
    case 3:
      $(`#editor-container .wrap`).stop(false, true).animate({
        left: '0%',
      });
      break;
    case 4:
      $(`#editor-container .wrap`).stop(false, true).animate({
        left: '-200%',
      });
      break;
    default:
      editorBuild.build(i);
  }
});


$$('.editor').on('hide', (i) => {
  $$('.editor mesh').setAttribute('diffuse', 'orange');
  editorBuild.reset();
});
