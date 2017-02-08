const gr = require('grimoirejs').default;
const {RendererComponent, CameraComponent, RenderSceneComponent} = require('grimoirejs-fundamental').default.Components;
const Component = gr.Node.Component;

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
    this.node.addChildByName('slide-render-scene', {
      current: 'backbuffer(current-buffer)',
      previous: 'backbuffer(previous-buffer)',
      material: 'new(transition-slide)',
    });
  }

  transit(currentCameraQuery, previousCameraQuery) {
    console.log(currentCameraQuery, previousCameraQuery);
    // this.rendererComponent.setAttribute('camera', toCameraQuery);
    // const currentScene = this.node.getChildrenByClass('currentScene')[0].getComponent(RenderSceneComponent);
    // const previousScene = this.node.getChildrenByClass('previousScene')[0].getComponent(RenderSceneComponent);
    this.currentScene.setAttribute('camera', currentCameraQuery);
    this.previousScene.setAttribute('camera', previousCameraQuery);
  }
}
