const $$ = gr("#canvas");

const $ = require("jquery");
$('.webgl-caption-container').hide();

$$(".webgl-start").on('show',function(){
  $('.webgl-caption-container').show();
  $('.webgl-caption-container').animate({"opacity":1},1000);
});

$$(".webgl-end").on('hide',function(){
  $('.webgl-caption-container').animate({"opacity":0},1000,"linear",()=>{
      $('.webgl-caption-container').hide();
  })
});
