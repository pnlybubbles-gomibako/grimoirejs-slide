const gr = require('grimoirejs').default;
const {MaterialFactory} = require('grimoirejs-fundamental').default.Material;
const SlideManager = require('./components/slide-manager');
const SlideRenderer = require('./components/slide-renderer');
const SlideRenderScene = require('./components/slide-render-scene');
const PageScene = require('./components/page-scene');

const slideShader = require('./transition/slide.sort');
const pushShader = require('./transition/push.sort');
const glitchShader = require('./transition/glitch.sort');
const noiseShader = require('./transition/noise.sort');

gr.register(async () => {
  MaterialFactory.addSORTMaterial("transition-slide", slideShader);
  MaterialFactory.addSORTMaterial("transition-push", pushShader);
  MaterialFactory.addSORTMaterial("transition-glitch", glitchShader);
  MaterialFactory.addSORTMaterial("transition-noise", noiseShader);
  gr.registerComponent('SlideManager', SlideManager);
  gr.registerComponent('SlideRenderScene', SlideRenderScene);
  gr.registerComponent('SlideRenderer', SlideRenderer);
  gr.registerComponent('PageScene', PageScene);
  gr.overrideDeclaration('renderer', ['SlideRenderer']);
  gr.overrideDeclaration('goml', ['SlideManager']);
  gr.registerNode('page', ['PageScene'], {}, 'scene');
  gr.registerNode('slide-render-scene', ['MaterialContainer', 'SlideRenderScene'], {});
});
