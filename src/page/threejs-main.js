const THREE = require('three');

module.exports = function(selector, width, height) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height);
  camera.position.set(0, 0, 50);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
  const obj = document.querySelector(selector);
  obj.appendChild(renderer.domElement);
  const geometry = new THREE.CubeGeometry(13, 13, 13);
  const material = new THREE.MeshPhongMaterial({
    color: 'orange'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  obj.addEventListener('mousemove', onMouseMove);
  const mouse = {
    x: 0,
    y: 0
  };

  function onMouseMove(e) {
    const rect = e.target.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.x = (mouse.x / width) * 2 - 1;
    mouse.y = -(mouse.y / height) * 2 + 1;
    const vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    vector.unproject(camera);
    const ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    const objs = ray.intersectObjects(scene.children);
    if (objs.length > 0) {
      material.color.set('blue');
    } else {
      material.color.set('orange');
    }
  }
  (function update() {
    requestAnimationFrame(update);
    mesh.rotation.set(
      0,
      mesh.rotation.y + .02,
      mesh.rotation.z + .02
    );
    renderer.render(scene, camera);
  })();
};
