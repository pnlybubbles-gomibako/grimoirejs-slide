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

  operate(i) {
    this.slideManager.operate(i);
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
    default: null,
    converter: 'Number',
  },
  build: {
    default: 0,
    converter: 'Number',
  }
};

module.exports = PageScene;
