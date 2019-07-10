// main.js
const view = document.getElementById('view');

// initialize rendering and set correct sizing
const renderer = PIXI.autoDetectRenderer({
  antialias: true,
  width: view.clientWidth,
  height: view.clientHeight,
});
view.appendChild(renderer.view);

// center stage and normalize scaling for all resolutions
const stage = new PIXI.Container();
stage.position.set(view.clientWidth / 2, view.clientHeight / 2);
stage.scale.set(Math.max(renderer.width, renderer.height) / 1024);

// load a sprite from a svg file
const sprite = PIXI.Sprite.from('triangle.svg');
sprite.anchor.set(0.5);
sprite.tint = 0x00FF00; // green
stage.addChild(sprite);

let spin = true;
// register assistant canvas callbacks
const callbacks = {
  onUpdate(state) {
    console.log('onUpdate', JSON.stringify(state));
    if ('tint' in state) {
      sprite.tint = state.tint;
    }
    if ('spin' in state) {
      spin = state.spin;
    }
  },
};
assistantCanvas.ready(callbacks);

// toggle spin on tap of the triangle
sprite.interactive = true;
sprite.buttonMode = true;
sprite.on('pointerdown', () => {
  spin = !spin;
});

// code to be ran per frame
let last = performance.now();
const frame = () => {
  // calculate time differences for smooth animations
  const now = performance.now();
  const delta = now - last;

  // rotate the triangle only if spin is true
  if (spin) {
    sprite.rotation += delta / 1000;
  }

  last = now;

  renderer.render(stage);
  requestAnimationFrame(frame);
};
frame();