gr.registerComponent("Rotate",{
  attributes:{
    speed:{
      default:0.2,
      converter:"Number"
    }
  },
  $mount(){
    this.getAttributeRaw("speed").boundTo("speed");
    this.transform = this.node.getComponent("Transform");
    this.current = 0;
  },
  $update(){
    this.current += this.speed;
    this.transform.setAttribute("rotation",`y(${this.current})`);
  }
});
