import * as THREE from "three";

/**
 * Procedurally draws a circuit-trace pattern (thin lines + via dots) onto
 * a canvas and returns it as a THREE.CanvasTexture. Used for the PCB/die
 * surface detail instead of a loaded image — no texture assets exist or
 * are needed. Must only be called client-side (uses document.createElement).
 */
export function createCircuitTexture(size = 512, accentColor = "#c6ff3d") {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, size, size);

  const cell = size / 16;

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 16; i++) {
    const p = i * cell;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
  }

  // A handful of longer "traces" that jog at right angles, PCB-style.
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  const rng = mulberry32(7);
  for (let i = 0; i < 22; i++) {
    let x = Math.floor(rng() * 16) * cell;
    let y = Math.floor(rng() * 16) * cell;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 2 + Math.floor(rng() * 3);
    for (let s = 0; s < steps; s++) {
      if (rng() > 0.5) x += (rng() > 0.5 ? 1 : -1) * cell;
      else y += (rng() > 0.5 ? 1 : -1) * cell;
      x = THREE.MathUtils.clamp(x, 0, size);
      y = THREE.MathUtils.clamp(y, 0, size);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Via dots, a subset lit in the accent color to hint at "active" traces.
  ctx.lineWidth = 0;
  for (let i = 0; i < 60; i++) {
    const x = Math.floor(rng() * 16) * cell;
    const y = Math.floor(rng() * 16) * cell;
    ctx.fillStyle =
      rng() > 0.88 ? accentColor : "rgba(255,255,255,0.4)";
    ctx.beginPath();
    ctx.arc(x, y, rng() > 0.88 ? 3 : 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Finer speckle pattern used for the exposed die surface. */
export function createDieTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, size, size);

  const rng = mulberry32(42);
  for (let i = 0; i < 900; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const b = 40 + rng() * 60;
    ctx.fillStyle = `rgb(${b},${b},${b})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const cell = size / 24;
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 24; i++) {
    const p = i * cell;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Deterministic PRNG so the generated pattern is stable across renders. */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
