gr.registerComponent('Rotate',{
  attributes:{
    speed:{
      default: 0.2,
      converter: 'Number',
    },
  },
  $mount(){
    this.transform = this.node.getComponent('Transform');
    this.current = 0;
  },
  $update(){
    this.current += this.getAttribute('speed');
    this.transform.rotation = `y(${this.current})`;
  }
});
