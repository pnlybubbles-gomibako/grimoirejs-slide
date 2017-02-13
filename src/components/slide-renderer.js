const gr = require('grimoirejs').default;
const gf = require('grimoirejs-fundamental').default;
const {RendererComponent, CameraComponent, RenderSceneComponent} = gf.Components;
const {MaterialFactory} = gf.Material;
const Component = gr.Node.Component;
const Tweenable = require('shifty');

module.exports = class SlideRenderer extends Component {
  $awake() {
    this.rendererComponent = this.node.getComponent(RendererComponent);
  }

  $mount() {
    this.currentScene = this.node.addChildByName('render-scene', {
      id: 'current-render-scene',
      out: 'current-buffer',
      depthBuffer:'current-render-buffer',
      camera: null,
      enabled: false,
    });
    this.previousScene = this.node.addChildByName('render-scene', {
      id: 'previous-render-scene',
      out: 'previous-buffer',
      depthBuffer: 'previous-render-buffer',
      camera: null,
      enabled: false,
    });
    this.node.addChildByName('texture-buffer', {
      name: 'current-buffer',
    });
    this.node.addChildByName('texture-buffer', {
      name: 'previous-buffer',
    });
    this.node.addChildByName('render-buffer', {
      name: 'current-render-buffer',
    });
    this.node.addChildByName('render-buffer', {
      name: 'previous-render-buffer',
    });
    this.node.addChildByName('texture-buffer', {
      name: 'fxaa-buffer',
    });
    this.slideRenderScene = this.node.addChildByName('slide-render-scene', {
      current: 'backbuffer(current-buffer)',
      previous: 'backbuffer(previous-buffer)',
      material: 'new(transition-slide)',
      // out: 'fxaa-buffer',
    });
    // this.node.addChildByName('render-quad', {
    //   source: 'backbuffer(fxaa-buffer)',
    //   material: 'new(fxaa)',
    // });
  }

  transit(currentCameraQuery, previousCameraQuery, tween, cb) {
    // console.log(currentCameraQuery, previousCameraQuery, tween);
    // this.rendererComponent.setAttribute('camera', toCameraQuery);
    // const currentScene = this.node.getChildrenByClass('currentScene')[0].getComponent(RenderSceneComponent);
    // const previousScene = this.node.getChildrenByClass('previousScene')[0].getComponent(RenderSceneComponent);
    if (this.transition) {
      this.transition.stop();
      this.transition._finish();
    }
    if (tween && MaterialFactory.materialGenerators[tween.transition]) {
      this.updateMaterial(tween.transition);
    } else {
      this.updateMaterial('transition-slide');
    }
    if (tween) {
      this.transition = new Tweenable();
      this.transition.tween({
        from: {
          progress: 0,
        },
        to: {
          progress: 1,
        },
        duration: tween.duration * 1000,
        easing: tween.easing,
        start: () => {
          this.updateCamera(currentCameraQuery, previousCameraQuery);
        },
        step: (state) => {
          this.slideRenderScene.setAttribute('progress', state.progress);
        },
        finish: cb,
      });
    } else {
      this.slideRenderScene.setAttribute('progress', 1);
      this.updateCamera(currentCameraQuery, previousCameraQuery);
      if (cb) { cb(); }
    }
  }

  updateMaterial(name) {
    this.slideRenderScene.setAttribute('material', `new(${name})`);
    this.slideRenderScene.setAttribute('current', 'backbuffer(current-buffer)');
    this.slideRenderScene.setAttribute('previous', 'backbuffer(previous-buffer)');
  }

  updateCamera(currentCameraQuery, previousCameraQuery) {
    this.currentScene.setAttribute('camera', currentCameraQuery);
    this.previousScene.setAttribute('camera', previousCameraQuery);
  }

  updateClearColor(currentClearColor, previousClearColor) {
    // console.log(currentClearColor.toString(), previousClearColor.toString());
    this.currentScene.setAttribute('clearColor', currentClearColor);
    this.previousScene.setAttribute('clearColor', previousClearColor);
  }
}
