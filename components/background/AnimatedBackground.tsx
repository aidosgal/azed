"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

type Trace = Point[];

interface Pulse {
  traceIndex: number;
  distance: number;
  speed: number;
}

const GRID = 48;
const MAX_TRACES = 26;
const MIN_TRACES = 8;
const TRACE_MIN_STEPS = 5;
const TRACE_MAX_STEPS = 14;
const TURN_PROBABILITY = 0.35;
const PULSE_SPEED_MIN = 90;
const PULSE_SPEED_MAX = 160;
const PULSE_RADIUS = 3;
const PULSE_TRAIL = 90;

const DIRECTIONS: Point[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

function randomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function generateTraces(width: number, height: number): Trace[] {
  const cols = Math.max(1, Math.floor(width / GRID));
  const rows = Math.max(1, Math.floor(height / GRID));
  const count = Math.min(
    MAX_TRACES,
    Math.max(MIN_TRACES, Math.round((width * height) / 70000))
  );

  const traces: Trace[] = [];

  for (let i = 0; i < count; i++) {
    let col = randomInt(0, cols);
    let row = randomInt(0, rows);
    let dir = DIRECTIONS[randomInt(0, DIRECTIONS.length - 1)];
    const points: Point[] = [{ x: col * GRID, y: row * GRID }];

    const steps = randomInt(TRACE_MIN_STEPS, TRACE_MAX_STEPS);
    for (let s = 0; s < steps; s++) {
      if (s > 0 && Math.random() < TURN_PROBABILITY) {
        const perpendicular = DIRECTIONS.filter(
          (d) => d.x !== dir.x || d.y !== dir.y
        ).filter((d) => d.x !== -dir.x || d.y !== -dir.y);
        dir = perpendicular[randomInt(0, perpendicular.length - 1)];
      }

      const stepLength = randomInt(1, 2);
      let nextCol = col + dir.x * stepLength;
      let nextRow = row + dir.y * stepLength;

      // Reflect off the viewport bounds instead of walking off-canvas.
      if (nextCol < 0 || nextCol > cols) {
        dir = { x: -dir.x, y: dir.y };
        nextCol = col + dir.x * stepLength;
      }
      if (nextRow < 0 || nextRow > rows) {
        dir = { x: dir.x, y: -dir.y };
        nextRow = row + dir.y * stepLength;
      }

      col = Math.min(cols, Math.max(0, nextCol));
      row = Math.min(rows, Math.max(0, nextRow));
      points.push({ x: col * GRID, y: row * GRID });
    }

    if (points.length > 1) traces.push(points);
  }

  return traces;
}

function traceLength(trace: Trace): number {
  let total = 0;
  for (let i = 1; i < trace.length; i++) {
    total += Math.hypot(trace[i].x - trace[i - 1].x, trace[i].y - trace[i - 1].y);
  }
  return total;
}

function pointAtDistance(trace: Trace, distance: number): Point {
  let remaining = distance;
  for (let i = 1; i < trace.length; i++) {
    const a = trace[i - 1];
    const b = trace[i];
    const segLength = Math.hypot(b.x - a.x, b.y - a.y);
    if (remaining <= segLength) {
      const t = segLength === 0 ? 0 : remaining / segLength;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    remaining -= segLength;
  }
  return trace[trace.length - 1];
}

/** Points of `trace` between two arc-length distances, following every bend in between. */
function pathPointsBetween(trace: Trace, fromDistance: number, toDistance: number): Point[] {
  if (toDistance <= fromDistance) return [pointAtDistance(trace, fromDistance)];

  const points: Point[] = [pointAtDistance(trace, fromDistance)];
  let acc = 0;
  for (let i = 1; i < trace.length; i++) {
    acc += Math.hypot(trace[i].x - trace[i - 1].x, trace[i].y - trace[i - 1].y);
    if (acc > fromDistance && acc < toDistance) points.push(trace[i]);
    if (acc >= toDistance) break;
  }
  points.push(pointAtDistance(trace, toDistance));
  return points;
}

function drawTraces(ctx: CanvasRenderingContext2D, traces: Trace[], color: string) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.lineJoin = "miter";
  for (const trace of traces) {
    ctx.beginPath();
    ctx.moveTo(trace[0].x, trace[0].y);
    for (let i = 1; i < trace.length; i++) ctx.lineTo(trace[i].x, trace[i].y);
    ctx.stroke();
  }
}

function spawnPulse(traceCount: number): Pulse {
  return {
    traceIndex: randomInt(0, traceCount - 1),
    distance: 0,
    speed: randomInt(PULSE_SPEED_MIN, PULSE_SPEED_MAX),
  };
}

/**
 * Fixed, full-viewport, click-through animated background: faint schematic
 * circuit traces with occasional glowing pulses traveling along them.
 * Two stacked canvases split static line work (redrawn only on resize) from
 * the per-frame pulse animation, so idle CPU cost stays near zero.
 */
export function AnimatedBackground() {
  const staticRef = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const staticCanvas = staticRef.current;
    const pulseCanvas = pulseRef.current;
    if (!staticCanvas || !pulseCanvas) return;

    const staticCtx = staticCanvas.getContext("2d");
    const pulseCtx = pulseCanvas.getContext("2d");
    if (!staticCtx || !pulseCtx) return;

    // Theme colours are read from the CSS tokens rather than hardcoded, so
    // they must be re-read whenever the theme changes — otherwise the traces
    // keep drawing in the old theme's colour (white lines on a white page).
    let lineColor = "rgba(255,255,255,0.12)";
    let accentColor = "#c6ff3d";

    function readThemeColors() {
      const styles = getComputedStyle(document.documentElement);
      lineColor =
        styles.getPropertyValue("--color-line").trim() || lineColor;
      accentColor =
        styles.getPropertyValue("--color-accent").trim() || accentColor;
    }

    readThemeColors();

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let rafId = 0;
    let lastTime = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (const canvas of [staticCanvas, pulseCanvas]) {
        if (!canvas) continue;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      traces = generateTraces(width, height);
      if (staticCtx) drawTraces(staticCtx, traces, lineColor);

      const pulseCount = width < 640 ? 1 : 2;
      pulses = Array.from({ length: pulseCount }, () => spawnPulse(traces.length));
    }

    function renderPulses(time: number) {
      const dt = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;

      pulseCtx!.clearRect(0, 0, pulseCanvas!.width, pulseCanvas!.height);
      pulseCtx!.fillStyle = accentColor;
      pulseCtx!.strokeStyle = accentColor;
      pulseCtx!.shadowColor = accentColor;
      pulseCtx!.shadowBlur = 8;

      for (const pulse of pulses) {
        const trace = traces[pulse.traceIndex];
        if (!trace) continue;
        const length = traceLength(trace);

        pulse.distance += pulse.speed * dt;
        if (pulse.distance > length + PULSE_TRAIL) {
          pulse.traceIndex = randomInt(0, traces.length - 1);
          pulse.distance = 0;
          continue;
        }

        const headDistance = Math.min(pulse.distance, length);
        const trailPoints = pathPointsBetween(
          trace,
          Math.max(0, pulse.distance - PULSE_TRAIL),
          headDistance
        );

        // Fade alpha per segment along the trail's own bends, rather than a
        // straight tail->head gradient that cuts across corners.
        pulseCtx!.lineWidth = 1.5;
        let acc = 0;
        const segLengths: number[] = [0];
        for (let i = 1; i < trailPoints.length; i++) {
          acc += Math.hypot(
            trailPoints[i].x - trailPoints[i - 1].x,
            trailPoints[i].y - trailPoints[i - 1].y
          );
          segLengths.push(acc);
        }
        const trailLength = acc || 1;
        for (let i = 1; i < trailPoints.length; i++) {
          pulseCtx!.globalAlpha = segLengths[i] / trailLength;
          pulseCtx!.beginPath();
          pulseCtx!.moveTo(trailPoints[i - 1].x, trailPoints[i - 1].y);
          pulseCtx!.lineTo(trailPoints[i].x, trailPoints[i].y);
          pulseCtx!.stroke();
        }
        pulseCtx!.globalAlpha = 1;

        const head = trailPoints[trailPoints.length - 1];
        pulseCtx!.beginPath();
        pulseCtx!.arc(head.x, head.y, PULSE_RADIUS, 0, Math.PI * 2);
        pulseCtx!.fill();
      }

      rafId = requestAnimationFrame(renderPulses);
    }

    function start() {
      if (reducedMotionQuery.matches) {
        pulseCtx!.clearRect(0, 0, pulseCanvas!.width, pulseCanvas!.height);
        return;
      }
      lastTime = 0;
      rafId = requestAnimationFrame(renderPulses);
    }

    function stop() {
      cancelAnimationFrame(rafId);
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        stop();
        resize();
        start();
      }, 150);
    }

    function handleVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function handleMotionChange() {
      stop();
      start();
    }

    /** Repaint the cached line work in the new theme's colour. */
    function handleThemeChange() {
      readThemeColors();
      drawTraces(staticCtx!, traces, lineColor);
    }

    resize();
    start();

    // The theme toggle flips data-theme on <html>; watch for that rather than
    // plumbing the theme through React, so the canvas stays self-contained.
    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      clearTimeout(resizeTimeout);
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={staticRef} className="absolute inset-0 opacity-70" />
      <canvas ref={pulseRef} className="absolute inset-0" />
    </div>
  );
}
