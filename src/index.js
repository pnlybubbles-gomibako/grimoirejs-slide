const gr = require('grimoirejs').default;
const $ = require('jquery');

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
        $('#jquery-container').fadeIn(1000);
        $('#background .container').css({
          left: 'auto',
          right: 0,
          bottom: 0,
          top: 0,
        }).animate({
          width: '50%',
        }, {
          duration: 1000,
          step() {
            $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
          },
          complete() {
            $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
            process.nextTick(() => {
              $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
            });
          },
        });
    }
  });
  $$('.compare').on('hide', (i) => {
    $('#background .container').css({
      width: '100%',
      left: 0,
    });
  });
  $$('page').on('build', (i) => {
    console.log(i);
  });
});
