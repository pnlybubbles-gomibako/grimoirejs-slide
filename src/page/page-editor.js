const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');
const Tweenable = require('shifty');

const $$ = gr('#slide');

const editorConfig = [
  {
    id: 'xml-editor',
    text: require('./sample/sample-change-color.goml.txt'),
    mode: 'xml',
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

$('#editor-container .xml .run').on('click', (this_) => {
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

$('#editor-container .js .run').on('click', (this_) => {
  const text = editors[1].getValue();
  eval(text);
});

$$('.editor').on('show', () => {
});

$$('.editor').on('build', (i) => {
  switch (i) {
    case 1:
      // const dp = $$('.editor text').getAttribute('position');
      // (new Tweenable()).tween({
      //   from: {
      //     x: 0, y: 0, z: 0,
      //   },
      //   to: {
      //     x: -5, y: -0.1, z: -3,
      //   },
      //   duration: 500,
      //   easing: 'swifter',
      //   step(s) {
      //     $$('.editor text').setAttribute('position', `${dp.X + s.x},${dp.Y + s.y},${dp.Z + s.z}`);
      //   },
      // });
      $('#background .container').animate({
        top: '-30%',
      }, 500, swifter);
      $('#editor-container').delay(200).fadeIn(500, swifter);
      break;
    case 2:
      $('#editor-container .wrap').animate({
        left: '-100%',
      });
      break;
    case 3:
      $('#background .container').animate({
        top: 0,
      }, 500, swifter);
      $('#editor-container').fadeOut(500, swifter)
      $$('.editor').single().getComponent('PageScene').operate(1);
      break;
  }
});

$$('.editor').on('hide', (i) => {
  $$('.editor mesh').setAttribute('diffuse', 'orange');
  $('#editor-container').hide().removeAttr('style');
  $('#editor-container .wrap').removeAttr('style');
  $('#background .container').removeAttr('style');
});
