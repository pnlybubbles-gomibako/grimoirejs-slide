const gr = require('grimoirejs').default;

const Tweenable = require('shifty');
Tweenable.setBezierFunction('swifter', 0.4, 0, 0, 1);

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

  // pages
  require('./page/opening-page');
  require('./page/page-compare');
  require('./page/page-editor');
  require('./page/page-world');
  require('./page/fusion-page');
  require('./page/webgl-pages');
});
