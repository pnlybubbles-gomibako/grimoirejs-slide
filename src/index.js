const gr = require('grimoirejs').default;

const Tweenable = require('shifty');
Tweenable.setBezierFunction('swifter', 0.4, 0, 0, 1);

gr(() => {
  const $$ = gr('#canvas');
  $$('page').on('show', (i) => {
    console.log(`show ${i}`);
  });
  $$('page').on('hide', (i) => {
    console.log(`hide ${i}`);
  });
  $$('page').on('build', (i) => {
    console.log(i);
  });

  // pages
  require('./page/opening-page');
  require('./page/page-compare');
  require('./page/page-editor');
  require('./page/page-world');
  require('./page/fusion-page');
  require('./page/webgl-pages');
});
