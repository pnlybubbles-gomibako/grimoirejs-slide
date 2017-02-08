const gr = require('grimoirejs').default;
const {FrameBuffer} = require('grimoirejs-fundamental').default.Resource;
const Component = gr.Node.Component;

class SlideRenderScene extends Component {
  $awake() {
 //   this.getAttributeRaw('progress').boundTo('_progress');
    this.getAttributeRaw('targetBuffer').boundTo('_targetBuffer');
    this.getAttributeRaw('clearColor').boundTo('_clearColor');
    this.getAttributeRaw('clearColorEnabled').boundTo('_clearColorEnabled');
  }

  $mount() {
    this._gl = this.companion.get('gl');
    this._canvas = this.companion.get('canvasElement');
    const gr = this.companion.get('GeometryRegistory');
    this._geom = gr.getGeometry('quad');
    this._materialContainer = this.node.getComponent('MaterialContainer');
  }

  $bufferUpdated() {
    const out = this.getAttribute('out');
    if (out !== 'default') {
      this._outFBO = new FrameBuffer(this._gl);
      this._outFBO.update(args.buffers[out]);
      this._FBOSize = args.bufferSizes[out];
    }
  }

  $render(args) {
    if (!this._materialContainer.materialReady) { return; }
    if (this._outFBO) {
      this._outFBO.bind();
      this._gl.viewport(0, 0, this._FBOSize.width, this._FBOSize.height);
    } else {
      this._gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
      this._gl.viewport(args.viewport.Left, this._canvas.height - args.viewport.Bottom, args.viewport.Width, args.viewport.Height);
    }
    if (this._outFBO && this._clearColorEnabled) {
      this._gl.clearColor(this._clearColor.R, this._clearColor.G, this._clearColor.B, this._clearColor.A);
      this._gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
    }
    // const currentBuffer = args.buffers[this.getAttribute('currentBuffer')];
    // const previousBuffer = args.buffers[this.getAttribute('previousBuffer')];
    const renderArgs = {
      targetBuffer: this._targetBuffer,
      geometry: this._geom,
      attributeValues: {},
      camera: null,
      transform: null,
      buffers: args.buffers,
      viewport: args.viewport,
      defaultTexture: this.companion.get('defaultTexture'),
      technique:"default"
    };
    renderArgs.attributeValues = this._materialContainer.materialArgs;
    // renderArgs.attributeValues['current'] = {get: _ => currentBuffer};
    // renderArgs.attributeValues['previous'] = {get: _ => previousBuffer};
    // renderArgs.attributeValues['progress'] = {get: _ => this._progress};
    this._materialContainer.material.draw(renderArgs);
    this._gl.flush();
  }
}

SlideRenderScene.attributes = {
  out: {
    default: 'default',
    converter: 'String',
  },
  targetBuffer: {
    default: 'default',
    converter: 'String',
  },
  clearColor: {
    default: '#0000',
    converter: 'Color4',
  },
  clearColorEnabled: {
    default: true,
    converter: 'Boolean',
  },
};

module.exports = SlideRenderScene;
