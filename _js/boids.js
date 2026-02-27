import init, * as wasm from "../_assets/wasm/wasm_boids.js";

const wasmInstance = await init();
await wasm.initThreadPool(navigator.hardwareConcurrency);
wasm.init_panic_hook();
let universe = wasm.Builder.from_preset(wasm.Preset.Basic)
  .number_of_boids(500)
  .multithreaded(true)
  .number_of_boids_per_thread(200)
  .naive(false)
  .build();
let playing = true;
let showFps = true;
let rafId = null;
let tickTimeout = null;

function tickLoop() {
  if (!playing) return;
  universe.tick();
  tickTimeout = setTimeout(tickLoop, 0);
}

function play() {
  playing = true;
  if (tickTimeout === null) {
    tickLoop();
  }
  if (rafId === null) {
    rafId = requestAnimationFrame(render);
  }
}

function pause() {
  playing = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (tickTimeout !== null) {
    clearTimeout(tickTimeout);
    tickTimeout = null;
  }
}

const canvas = document.getElementById("boids-canvas");
const FPS_SAMPLES = 10;
const frameTimes = [];
let lastFrameTime = performance.now();

function render(timestamp) {
  const FLOATS_PER_BOID = 6;
  const boidsPtr = universe.get_boids_pointer();
  const numBoids = universe.get_number_of_boids();
  const data = new Float32Array(
    wasmInstance.memory.buffer,
    boidsPtr,
    numBoids * FLOATS_PER_BOID,
  );
  let boids = [];
  for (let i = 0; i < numBoids; i++) {
    const offset = i * FLOATS_PER_BOID;

    const boid = {
      x: data[offset],
      y: data[offset + 1],
      vx: data[offset + 2],
      vy: data[offset + 3],
    };

    boids.push(boid);
  }

  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-background")
    .trim();
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-text")
    .trim();

  const universeSize = universe.get_size();
  const triangleSize = width / 100;
  boids.forEach((b) => {
    let x = (b.x / universeSize) * width;
    let y = (b.y / universeSize) * height;
    const angle = Math.atan2(b.vy, b.vx);

    ctx.setTransform(
      Math.cos(angle),
      Math.sin(angle),
      -Math.sin(angle),
      Math.cos(angle),
      x,
      y,
    );

    ctx.beginPath();
    ctx.moveTo(triangleSize, 0);
    ctx.lineTo(-triangleSize, triangleSize);
    ctx.lineTo(-triangleSize, -triangleSize);
    ctx.closePath();
    ctx.fill();
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (showFps) {
    frameTimes.push(timestamp - lastFrameTime);
    if (frameTimes.length > FPS_SAMPLES) frameTimes.shift();
    const avgDelta = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    const fps = 1000 / avgDelta;
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim();
    ctx.font = "20px monospace";
    ctx.fillText(`FPS: ${Math.trunc(fps)}`, width - 104, 20);
  }
  lastFrameTime = timestamp;

  if (playing) {
    rafId = requestAnimationFrame(render);
  }
}

// -------------------
//     UI Wiring
// -------------------

const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

playButton.addEventListener("click", () => {
  play();
  document.documentElement.setAttribute("playing-mode", "playing");
});
pauseButton.addEventListener("click", () => {
  pause();
  document.documentElement.setAttribute("playing-mode", "paused");
});

let eventCausedPause = false;
function eventPlay() {
  if (eventCausedPause) {
    play();
    eventCausedPause = false;
  }
}
function eventPause() {
  if (playing) {
    pause();
    eventCausedPause = true;
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    eventPlay();
  } else {
    eventPause();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      eventPlay();
    } else {
      eventPause();
    }
  },
  {
    root: null,
    threshold: 0.3,
  },
);
observer.observe(canvas);

const tabs = document.querySelectorAll('[role="tab"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Deactivate all
    tabs.forEach((t) => {
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    });
    document
      .querySelectorAll('[role="tabpanel"]')
      .forEach((p) => (p.hidden = true));

    // Activate clicked tab
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    document.getElementById(tab.getAttribute("aria-controls")).hidden = false;
  });
});

// Add progress custom css selector to style slider left side on chrome
document.querySelectorAll("input[type='range']").forEach((slider) => {
  slider.addEventListener("input", () => {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--progress", `${pct}%`);
  });
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--progress", `${pct}%`);
});

function initializeSlider({
  id,
  min,
  max,
  defaultValueCallback,
  logarithmic,
  numberOfDecimals = 0,
  snapPoints = [],
  func,
}) {
  const input = document.getElementById(id);
  const output = document.querySelector(`output[for='${id}']`);
  const datalist = document.getElementById(`${id}-values`);

  const actualToLog = (value) => {
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    return (Math.log(value) - logMin) / (logMax - logMin);
  };

  const logToActual = (value) => {
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    return Math.exp(logMin + value * (logMax - logMin));
  };

  input.addEventListener("input", () => {
    const actual = logarithmic ? logToActual(input.value) : Number(input.value);
    output.value = actual.toFixed(numberOfDecimals);
    func(actual);
  });

  snapPoints.forEach((n) => {
    const option = document.createElement("option");
    option.value = logarithmic ? actualToLog(n) : n;
    option.label = n;
    datalist.appendChild(option);
  });

  function resetSlider() {
    input.value = logarithmic
      ? actualToLog(defaultValueCallback())
      : defaultValueCallback();
    output.value = defaultValueCallback().toFixed(numberOfDecimals);
  }

  input.addEventListener("dblclick", resetSlider);
  resetSlider();
  return resetSlider;
}

let defaultNumberOfBoids = universe.get_number_of_boids();
const resetNumberOfBoids = initializeSlider({
  id: "number-of-boids",
  min: 1,
  max: 4000,
  defaultValueCallback: () => defaultNumberOfBoids,
  logarithmic: true,
  snapPoints: [1, 2, 3, 4, 5, 500],
  func: (x) => universe.set_number_of_boids(x),
});

let defaultDensity = universe.get_density();
const resetDensity = initializeSlider({
  id: "density",
  min: 0.01,
  max: 1000,
  defaultValueCallback: () => defaultDensity,
  logarithmic: true,
  numberOfDecimals: 2,
  snapPoints: [0.01, 0.02, 0.03, 0.04, 0.05, 1, 100],
  func: (x) => universe.set_density(x),
});

let defaultAttractionWeighting = universe.get_attraction_weighting();
const resetAttractionWeighting = initializeSlider({
  id: "attraction-weighting",
  min: 0,
  max: 1,
  defaultValueCallback: () => defaultAttractionWeighting,
  logarithmic: false,
  numberOfDecimals: 2,
  func: (x) => universe.set_attraction_weighting(x),
});

let defaultAttractionRadius = universe.get_attraction_radius();
const resetAttractionRadius = initializeSlider({
  id: "attraction-radius",
  min: 0.01,
  max: 10,
  defaultValueCallback: () => defaultAttractionRadius,
  logarithmic: true,
  numberOfDecimals: 2,
  func: (x) => universe.set_attraction_radius(x),
});

let defaultAlignmentWeighting = universe.get_alignment_weighting();
const resetAlignmentWeighting = initializeSlider({
  id: "alignment-weighting",
  min: 0,
  max: 1,
  defaultValueCallback: () => defaultAlignmentWeighting,
  logarithmic: false,
  numberOfDecimals: 2,
  func: (x) => universe.set_alignment_weighting(x),
});

let defaultAlignmentRadius = universe.get_alignment_radius();
const resetAlignmentRadius = initializeSlider({
  id: "alignment-radius",
  min: 0.01,
  max: 10,
  defaultValueCallback: () => defaultAlignmentRadius,
  logarithmic: true,
  numberOfDecimals: 2,
  func: (x) => universe.set_alignment_radius(x),
});

let defaultSeparationWeighting = universe.get_separation_weighting();
const resetSeparationWeighting = initializeSlider({
  id: "separation-weighting",
  min: 0,
  max: 1,
  defaultValueCallback: () => defaultSeparationWeighting,
  logarithmic: false,
  numberOfDecimals: 2,
  func: (x) => universe.set_separation_weighting(x),
});

let defaultSeparationRadius = universe.get_separation_radius();
const resetSeparationRadius = initializeSlider({
  id: "separation-radius",
  min: 0.01,
  max: 10,
  defaultValueCallback: () => defaultSeparationRadius,
  logarithmic: true,
  numberOfDecimals: 2,
  func: (x) => universe.set_seperation_radius(x),
});

let defaultMaximumVelocity = universe.get_maximum_velocity();
const resetMaximumVelocity = initializeSlider({
  id: "maximum-velocity",
  min: 0.01,
  max: 1,
  defaultValueCallback: () => defaultMaximumVelocity,
  logarithmic: true,
  numberOfDecimals: 2,
  func: (x) => universe.set_maximum_velocity(x),
});

let defaultNoise = universe.get_noise_fraction();
const resetNoise = initializeSlider({
  id: "noise",
  min: 0.01,
  max: 1,
  defaultValueCallback: () => defaultNoise,
  logarithmic: true,
  numberOfDecimals: 2,
  func: (x) => universe.set_noise_fraction(x),
});

function resetAll() {
  resetNumberOfBoids();
  resetDensity();
  resetAttractionWeighting();
  resetAttractionRadius();
  resetAlignmentWeighting();
  resetAlignmentRadius();
  resetSeparationWeighting();
  resetSeparationRadius();
  resetMaximumVelocity();
  resetNoise();
}

const preset = document.getElementById("preset");
preset.value = "basic";
preset.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "basic":
      universe = wasm.Universe.build_from_preset(wasm.Preset.Basic);
      break;
    case "maruyama":
      universe = wasm.Universe.build_from_preset(wasm.Preset.Maruyama);
      break;
    case "zhang":
      universe = wasm.Universe.build_from_preset(wasm.Preset.Zhang);
      break;
    default:
      throw new Error(`Preset ${e.target.value} not found.`);
  }

  defaultNumberOfBoids = universe.get_number_of_boids();
  defaultDensity = universe.get_density();
  defaultAttractionWeighting = universe.get_attraction_weighting();
  defaultAttractionRadius = universe.get_attraction_radius();
  defaultAlignmentWeighting = universe.get_alignment_weighting();
  defaultAlignmentRadius = universe.get_alignment_radius();
  defaultSeparationWeighting = universe.get_separation_weighting();
  defaultSeparationRadius = universe.get_separation_radius();
  defaultMaximumVelocity = universe.get_maximum_velocity();
  defaultNoise = universe.get_noise_fraction();
  resetAll();
});

play();
