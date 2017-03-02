const gr = require('grimoirejs').default;

require('./page/shifty-easing');
require('./page/overlay-toggle-button');

gr(() => {
  const $$ = gr('#canvas');
  $$('page').on('show', (i, delta) => {
    console.log(`show ${i}: ${delta}`);
  });
  $$('page').on('hide', (i, delta) => {
    console.log(`hide ${i}: ${delta}`);
  });
  $$('page').on('build', (i) => {
    console.log(`build ${i}`);
  });
  $$('goml').addComponent('WebAudioShaderResource');
  $$('goml').addComponent('WebcamShaderResource');

  // pages
  require('./page/page-opening');
  require('./page/page-compare');
  require('./page/page-editor');
  require('./page/page-world');
  require('./page/page-fusion');
  require('./page/page-webgl');
  require('./page/page-model');
  // require('./page/page-slideshow');
  // require('./page/page-future');
});
