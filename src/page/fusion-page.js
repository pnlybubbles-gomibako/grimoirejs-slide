const Tweenable = require('shifty');
const $$ = gr('#canvas');
const transition = new Tweenable();
const fp = $$(".fusion-page");
fp.on("build",function(i){
  const fusionShader = $$("mesh.fusion-shader");
  switch(i){
    case 1:
      transition.tween({
        from: {
          progress: 0,
        },
        to: {
          progress: 1,
        },
        duration: 1000,
        easing: "easeInOutQuad",
        step: (state) => {
          fusionShader.setAttribute('progress', state.progress);
        },
      });
  }
});

fp.on("hide",function(){
  $$("mesh.fusion-shader").setAttribute("progress","0");
});
