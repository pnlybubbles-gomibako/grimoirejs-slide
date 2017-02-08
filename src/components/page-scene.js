const gr = require('grimoirejs').default;
const Component = gr.Node.Component;

class PageScene extends Component {
  $mount() {
    this.slideManager = this.node.getComponentInAncestor('SlideManager');
    if (!this.slideManager) { return; }
    this.slideManager.update();
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
};

module.exports = PageScene;
