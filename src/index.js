const gr = require('grimoirejs').default;

gr(() => {
  const $$ = gr('#canvas');
  $$('.opening').on('show', () => {
    console.log('show opening');
  });
  $$('.opening').on('hide', () => {
    console.log('hide opening');
  });
});
