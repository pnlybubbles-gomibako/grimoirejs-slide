const $ = require('jquery');

let overlay = true;

$(() => {
  $('#overlay-toggle-button').on('click', () => {
    overlay = !overlay;
    if (overlay) {
      $('#overlay').show();
    } else {
      $('#overlay').hide();
    }
  });
});
