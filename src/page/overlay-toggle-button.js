const $ = require('jquery');

let overlay = true;

$(() => {
  $('#overlay-toggle-button').on('click', () => {
    overlay = !overlay;
    $('#overlay').css({
      display: overlay ? 'block' : 'none',
    });
  });
});
