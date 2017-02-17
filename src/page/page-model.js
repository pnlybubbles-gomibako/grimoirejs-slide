const gr = require('grimoirejs').default;
const $ = require('jquery');
const $$ = gr('#canvas');
const { swifter } = require('./easing');

$$('.model').on('build', (i) => {
  console.log('model', i);
  switch (i) {
    case 1:
      $('#model-grimoire-container').stop(true, true).css({
        opacity: 1,
      }).animate({
        opacity: 0,
      }, 500, swifter).promise().then((this_) => {
        gr('#model')('goml').setAttribute('height', '512');
        gr('#model')('goml').setAttribute('width', '512');
        $(this_).hide();
        setTimeout(() => {
          $$('.model').single().getComponent('PageScene').operate(1);
        }, 200);
      });
      break;
  }
});

$$('.model').on('show', (i) => {
  $('#model-grimoire-container').stop(true, true).css({
    opacity: 0,
  }).delay(200).promise().then((this_) => {
    $(this_).show();
    gr('#model')('goml').setAttribute('height', 'fit');
    gr('#model')('goml').setAttribute('width', 'fit');
    return $(this_).animate({
      opacity: 1,
    }, 500, swifter).promise();
  });
});

$$('.model').on('hide', (i) => {
  $('#model-grimoire-container').stop(true, true).removeAttr('style');
});
