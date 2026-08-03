"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CpuModel } from "./CpuModel";
import { CameraRig } from "./CameraRig";
import { useResponsiveQuality } from "./useResponsiveQuality";
import { cameraKeyframes } from "./cameraKeyframes";

const ACCENT_COLOR = "#c6ff3d";
const BACKGROUND_COLOR = "#0a0a0a";

/**
 * Owns the R3F canvas: lighting, the procedural CPU model and the
 * scroll-driven camera rig. Rendered only on the client (see
 * SceneClientLoader) since Three.js needs a real DOM/WebGL context.
 */
export function Scene() {
  const quality = useResponsiveQuality();

  return (
    <Canvas
      dpr={quality.dpr}
      frameloop={quality.frameloop}
      gl={{ antialias: true, alpha: false }}
      camera={{
        position: cameraKeyframes.hero.position,
        fov: cameraKeyframes.hero.fov,
        near: 0.1,
        far: 50,
      }}
    >
      <color attach="background" args={[BACKGROUND_COLOR]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.25} color={ACCENT_COLOR} />
      {quality.rimLight && (
        <directionalLight position={[-3, 2, -5]} intensity={0.6} color="#ffffff" />
      )}
      <Suspense fallback={null}>
        <CpuModel quality={quality} accentColor={ACCENT_COLOR} />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
