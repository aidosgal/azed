"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { QualitySettings } from "./useResponsiveQuality";

interface CpuModelProps {
  quality: QualitySettings;
  accentColor: string;
}

const MODEL_PATH = "/models/cpu.glb";
// The source asset is modeled at real-world scale (~4cm), scaled up here to
// roughly match the framing the scroll camera keyframes were tuned for.
const MODEL_SCALE = 70;

/**
 * User-supplied CPU model (a real Ryzen-shaped chip, GLB, public/models/cpu.glb).
 * On load: strips the real AMD Ryzen wordmark baked into the die/lid
 * texture (trademark, not ours to reproduce) in favor of a plain brushed
 * finish, then adds a neon accent glow to the model's own PCB edge and
 * contact-pad texture so Scene.tsx's Bloom pass picks it up — no fabricated
 * geometry, just the model's existing seams lit up.
 */
export function CpuModel({ quality, accentColor }: CpuModelProps) {
  const { scene, materials } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });

  const model = useMemo(() => {
    const textMat = materials.CPUText as THREE.MeshStandardMaterial | undefined;
    if (textMat) {
      textMat.map = null;
      textMat.color = new THREE.Color("#d0d0d0");
      textMat.metalness = 0.8;
      textMat.roughness = 0.35;
      textMat.needsUpdate = true;
    }

    // Neon accent #1: the exposed PCB edge glows all the way around the chip.
    const sideMat = materials.CPUBoardSide as THREE.MeshStandardMaterial | undefined;
    if (sideMat) {
      sideMat.emissive = new THREE.Color(accentColor);
      sideMat.emissiveIntensity = 1.8;
      sideMat.needsUpdate = true;
    }

    // Neon accent #2: reuse the board's own diffuse texture as its emissive
    // map, so only the bright gold contact-pad clusters glow (the dark PCB
    // background stays dark) — reads like tiny active status lights.
    const boardMat = materials.CPUBoard as THREE.MeshStandardMaterial | undefined;
    if (boardMat?.map) {
      boardMat.emissive = new THREE.Color(accentColor);
      boardMat.emissiveMap = boardMat.map;
      boardMat.emissiveIntensity = 0.9;
      boardMat.needsUpdate = true;
    }

    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    return clone;
  }, [scene, materials, accentColor]);

  useEffect(() => {
    if (!quality.idleMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [quality.idleMotion]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || !quality.idleMotion) return;

    group.rotation.y += delta * 0.08;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;

    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      pointerTarget.current.x,
      delta * 2
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      pointerTarget.current.y,
      delta * 2
    );
    group.rotation.x = pointer.current.y * 0.12;
    group.rotation.z = -pointer.current.x * 0.06;
  });

  return (
    <group ref={groupRef} scale={MODEL_SCALE}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
