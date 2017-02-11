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
      camera: null,
      enabled: false,
    });
    this.previousScene = this.node.addChildByName('render-scene', {
      id: 'previous-render-scene',
      out: 'previous-buffer',
      camera: null,
      enabled: false,
    });
    this.node.addChildByName('texture-buffer', {
      name: 'current-buffer',
    });
    this.node.addChildByName('texture-buffer', {
      name: 'previous-buffer',
    });
    this.slideRenderScene = this.node.addChildByName('slide-render-scene', {
      current: 'backbuffer(current-buffer)',
      previous: 'backbuffer(previous-buffer)',
      material: 'new(transition-slide)',
    });
  }

  transit(currentCameraQuery, previousCameraQuery, tween) {
    console.log(currentCameraQuery, previousCameraQuery, tween);
    // this.rendererComponent.setAttribute('camera', toCameraQuery);
    // const currentScene = this.node.getChildrenByClass('currentScene')[0].getComponent(RenderSceneComponent);
    // const previousScene = this.node.getChildrenByClass('previousScene')[0].getComponent(RenderSceneComponent);
    if (this.transition) {
      this.transition.stop();
    }
    if (tween && MaterialFactory.materialGenerators[tween.transition]) {
      this.slideRenderScene.setAttribute('material', `new(${tween.transition})`);
      this.slideRenderScene.setAttribute('current','backbuffer(current-buffer)');
      this.slideRenderScene.setAttribute('previous','backbuffer(previous-buffer)');
    } else {
      this.slideRenderScene.setAttribute('material', `new(transition-slide)`);
      this.slideRenderScene.setAttribute('current','backbuffer(current-buffer)');
      this.slideRenderScene.setAttribute('previous','backbuffer(previous-buffer)');
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
      });
    } else {
      this.slideRenderScene.setAttribute('progress', 1);
      this.updateCamera(currentCameraQuery, previousCameraQuery);
    }
  }

  updateCamera(currentCameraQuery, previousCameraQuery) {
    this.currentScene.setAttribute('camera', currentCameraQuery);
    this.previousScene.setAttribute('camera', previousCameraQuery);
  }

  updateClearColor(currentClearColor, previousClearColor) {
    console.log(currentClearColor.toString(), previousClearColor.toString());
    this.currentScene.setAttribute('clearColor', currentClearColor);
    this.previousScene.setAttribute('clearColor', previousClearColor);
  }
}
