const gr = require('grimoirejs').default;
const $ = require('jquery');
const { swifter } = require('./easing');
const editorRunable = require('./editor-runable');

const $$ = gr('#canvas');

const editorConfig = [
  {
    id: 'model-editor',
    mode: 'xml',
    text: require('./sample/model.goml.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

editorRunable.goml('#model-container .left .run', '.model', editors[0]);

$$('.model').on('build', (i) => {
  console.log('model', i);
  switch (i) {
    case 1:
      $('#model-container').delay(200).stop(false, true).fadeIn(500, swifter);
      break;
    case 2:
      $('#model-container').stop(false, true).fadeOut(500, swifter)
      $$('.model').single().getComponent('PageScene').operate(1);
      break;
  }
});

$$('.model').on('hide', (i) => {
  $('#model-container').stop(false, true).removeAttr('style');
});
