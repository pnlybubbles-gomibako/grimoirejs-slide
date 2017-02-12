const gr = require('grimoirejs').default;
const $ = require('jquery');

require('bez')($);
const swifter = $.bez([0.4, 0, 0, 1]);

gr(() => {
  const $$ = gr('#canvas');
  $$('page').on('show', (i) => {
    console.log(`show ${i}`);
  });
  $$('page').on('hide', (i) => {
    console.log(`hide ${i}`);
  });
  $$('.compare').on('show', () => {
  });
  $$('.compare').on('build', (i) => {
    switch (i) {
      case 1:
        $('#jquery-container').fadeIn(500).css({
          left: '-25%',
        }).animate({
          left: 0,
        }, {
          duration: 500,
          queue: false,
          easing: swifter,
        });
        $('#background .container').animate({
          left: '25%',
          right: 'auto',
        }, 500, swifter).promise().then((this_) => {
          $(this_).css({
            width: '50%',
            left: 'auto',
            right: 0,
          });
          $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
        });
        break;
      case 2:
        $('#jquery-container').animate({
          top: '-30%',
        }, 500, swifter);
        $('#background .container').animate({
          top: '-30%',
        }, 500, swifter);
    }
  });
  $$('.compare').on('hide', (i) => {
    console.log('hide compare');
    $('#background .container').removeAttr('style');
    $('#jquery-container').hide().removeAttr('style');
    $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
  });
  $$('page').on('build', (i) => {
    console.log(i);
  });
});
