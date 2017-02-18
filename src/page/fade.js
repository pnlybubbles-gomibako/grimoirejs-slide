const gr = require('grimoirejs').default;
const $$ = gr('#canvas');
const Tweenable = require('shifty');
const { Color4 } = require('grimoirejs-math').default;

const fade = (f, t) => {
  return (selector, finish, step) => {
    return (new Tweenable()).tween({
      from: { progress: f },
      to: { progress: t },
      duration: 1000,
      easing: 'swifter',
      step(state) {
        if (step) { step(state.progress); }
        $$(selector).setAttribute('color', new Color4(1, 1, 1, state.progress));
      },
      finish: finish,
    });
  };
};

const fadeIn = fade(0, 1);
const fadeOut = fade(1, 0);

module.exports = {
  fadeIn,
  fadeOut,
};
