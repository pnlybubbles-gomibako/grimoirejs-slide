const { Quaternion, Vector3 } = require('grimoirejs-math').default;
const gr = require('grimoirejs').default;
const Tweenable = require('shifty');

const $$ = gr('#canvas');
const scene = $$('.slideshow').single();
const object = scene.addChildByName('object');
object.setAttribute('rotation', 'y(90)');
// object.addComponent('Rotate', {
//     speed: 0.05
// });
const dataNum = 9;
const cellNum = 10;
const radius = 12.8;
const group = 2;
const scale = 5;
const padding = 1.2;
const offsetX = Math.PI / cellNum;

const label = [
  'pixivハッカソン',
  'pixivハッカソン',
  '第1回ハンズオン',
  '第2回ハンズオン@mozilla',
  '第2回ハンズオン@mozilla',
  '第2回ハンズオン@mozilla',
  '第2回ハンズオン@mozilla',
  'Global Game Jam',
  'Global Game Jam',
];

const labelOffset = [
  0.13,
  0.13,
  0.01,
  0.22,
  0.22,
  0.22,
  0.22,
  0.3,
  0.3,
];

for (let i = 0; i < dataNum; i++) {
  object.addChildByName('mesh', {
    scale: [scale * 0.4, scale * 0.3, 1],
    class: `img${i + 1}`,
    texture: `./src/page/pictures/img${(i + 1)}.jpg`,
    position: [
      radius * Math.cos(Math.PI / cellNum * i),
      (-(group - 1) / 2 + (i % group)) * padding,
      radius * Math.sin(Math.PI / cellNum * i),
    ],
    rotation: Quaternion.eulerXYZ(0, Math.PI + Math.PI / 2 - Math.PI / cellNum * i, 0),
    material: 'new(unlit)',
  });
  $$(`.slideshow .img${i + 1}`).addChildByName('text', {
    text: label[i],
    font: '30pt Noto Sans CJK JP',
    color: '#381794',
    size: 0.15,
    position: [labelOffset[i], 1.2 * ((-1) ** i % group), 0],
  });
}

const initialRotation = object.getAttribute('rotation');

let rotateTweenable = null;

$$('.slideshow').on('build', (i) => {
  if (rotateTweenable) {
    console.log('stop', Quaternion.angleAxis(18 * (i - 1) * Math.PI / 180, new Vector3(0, 1, 0)).toString());
    rotateTweenable.stop();
    object.setAttribute('rotation', Quaternion.multiply(initialRotation, (Quaternion.angleAxis(18 * (i - 1) * Math.PI / 180, new Vector3(0, 1, 0)))));
  }
  let defaultRotation = object.getAttribute('rotation');
  rotateTweenable = new Tweenable();
  rotateTweenable.tween({
    from: { phi: 0 },
    to: { phi: 18 },
    duration: 500,
    easing: 'swifter',
    step(state) {
      object.setAttribute('rotation', Quaternion.multiply(defaultRotation, (Quaternion.angleAxis(state.phi * Math.PI / 180, new Vector3(0, 1, 0)))));
    },
    finish() {
      rotateTweenable = null;
    },
  });
});

$$('.slideshow').on('hide', () => {
  object.setAttribute('rotation', initialRotation);
});
