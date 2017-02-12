const gr = require('grimoirejs').default;

module.exports = (canvas, selector) => {
    const mesh = gr(canvas)(selector).single();
    mesh.on("mouseenter", function() {
        mesh.setAttribute("color", "blue");
    });
    var rot = 0;
    rotate();

    function rotate() {
        mesh.setAttribute("rotation", "0," + rot + "," + rot);
        rot += 1;
        requestAnimationFrame(rotate);
    }
};
