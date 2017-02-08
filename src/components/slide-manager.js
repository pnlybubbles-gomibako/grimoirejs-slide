const gr = require('grimoirejs').default;
const {CameraComponent} = require('grimoirejs-fundamental').default.Components;
const Component = gr.Node.Component;

module.exports = class SlideManager extends Component {
  $awake() {
    this.pages = [];
    this.number = 0;
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowRight':
          if (this.number === this.pages.length - 1) {
            return;
          }
          this.operate(1);
          break;
        case 'ArrowLeft':
          if (this.number === 0) {
            return;
          }
          this.operate(-1);
          break;
      }
    });
  }

  operate(delta) {
    const slideRenderer = this.node.getComponentsInChildren('SlideRenderer')[0];
    const currentNumber = this.number + delta;
    const currentPageScene = this.pages[currentNumber];
    const previousPageScene = this.pages[this.number];
    if (!currentPageScene) { return; }
    previousPageScene.node.emit('hide');
    slideRenderer.transit(`#page${currentNumber}`, `#page${this.number}`);
    currentPageScene.node.emit('show');
    this.number = currentNumber;
  }

  update() {
    this.pages = this.node.children.map((v) => {
      return v.getComponent('PageScene');
    }).filter((v) => v);
    this.pages.forEach((v, i) => {
      v.node.getComponentsInChildren(CameraComponent)[0].node.setAttribute('id', `page${i}`); // temporary avoid bugs
    });
  }
}
