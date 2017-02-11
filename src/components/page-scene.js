const gr = require('grimoirejs').default;
const Component = gr.Node.Component;

class PageScene extends Component {
  $mount() {
    this.slideManager = this.node.getComponentInAncestor('SlideManager');
    if (!this.slideManager) { return; }
    process.nextTick(() => {
      this.slideManager.update();
    });
  }

  $unmount() {
    this.slideManager.update();
  }
}

PageScene.attributes = {
  transition: {
    default: 'none',
    converter: 'String',
  },
  easing: {
    default: 'easeInOutQuint',
    converter: 'String',
  },
  duration: {
    default: 1,
    converter: 'Number',
  },
  color: {
    default: '#0000',
    converter: 'Color4',
  },
  order: {
    default: 1000000,
    converter: 'Number',
  },
};

module.exports = PageScene;
