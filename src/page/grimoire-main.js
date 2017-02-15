const gr = require('grimoirejs').default;

module.exports = (canvas, selector) => {
  const mesh = gr(canvas)(selector).single();
  mesh.on('mouseenter', function() {
    mesh.setAttribute('diffuse', 'blue');
  });
  mesh.on('mouseleave', function() {
    mesh.setAttribute('diffuse', 'orange');
  });
  var rot = 0;
  rotate();

  function rotate() {
    mesh.setAttribute('rotation', rot + ',' + rot + ',' + rot);
    rot += 1;
    requestAnimationFrame(rotate);
  }
};
