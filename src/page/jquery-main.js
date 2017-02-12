const $ = require('jquery');

module.exports = (selector) => {
  $(function(){
    $(selector).mouseover(function(){
      $(this).css('background-color','blue');
    });
  });
};
