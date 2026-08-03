"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => null,
});

/**
 * Fixed, full-viewport, click-through layer that hosts the 3D scene.
 * Stays mounted and visible for the entire page (no pin/unpin, no
 * scroll-tied opacity fade) while CameraRig reframes the camera as the
 * page scrolls. pointer-events-none so content sections rendered on top
 * remain clickable; the CPU's mouse-parallax uses a raw window listener
 * instead of R3F pointer events for the same reason.
 */
export function SceneClientLoader() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Scene />
    </div>
  );
}
