const Tweenable = require('shifty');
const $$ = gr('#slide');
const transition = new Tweenable();
const op = $$(".opening");

op.on("build",function(i){
  const cameraOrigin = $$(".opening > .camera-origin");
  switch(i){
    case 1:
      transition.tween({
        from: {
          rotation: 0,
        },
        to: {
          rotation: 180,
        },
        duration: 1000,
        easing: "easeInOutQuad",
        step: (state) => {
          cameraOrigin.setAttribute('rotation', `y(${state.rotation})`);
        },
      });
    case 2:
     transition.tween({
       from: {
         rotation: 180,
       },
       to: {
         rotation: 360,
       },
       duration: 1000,
       easing: "easeInOutQuad",
       step: (state) => {
         cameraOrigin.setAttribute('rotation', `y(${state.rotation})`);
       },
     });
  }
});

op.on("hide",function(){
  $$(".opening > .camera-origin").setAttribute("rotation","y(0d)");
});
