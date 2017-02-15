const gr = require('grimoirejs').default;
const $ = require('jquery');
const $$ = gr('#canvas');

const exceptNodes = ['light', 'text'];

const goml = (runButton, gomlSelector, editor) => {
  $(runButton).on('click', (this_) => {
    const text = editor.getValue();
    const parsed = (new DOMParser).parseFromString(text, 'application/xml').documentElement;
    const scene = parsed.querySelector('scene');
    console.log(scene);
    const cameraId = $$(`${gomlSelector} camera`).getAttribute('id');
    $$(`${gomlSelector} *`).forEach((v) => {
      if (exceptNodes.includes(v.name.name)) { return; }
      v.remove();
    });
    Array.from(scene.childNodes).forEach((node) => {
      if (node.nodeType !== 1) { return; }
      if (exceptNodes.includes(node.nodeName)) { return; }
      const camera = node.nodeName === 'camera' ? node : node.querySelector('camera');
      if (camera) {
        camera.setAttribute('id', cameraId);
      }
      console.log(node.outerHTML);
      $$(gomlSelector).append(node.outerHTML);
    });
    $$('#current-render-scene').setAttribute('camera', null);
    $$('#current-render-scene').setAttribute('camera', `#${cameraId}`);
  });
};

const js = (runButton, editor) => {
  $(runButton).on('click', (this_) => {
    const text = editor.getValue();
    eval(text);
  });
};

module.exports = {
  goml,
  js,
};
