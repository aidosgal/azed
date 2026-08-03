"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Edges, Instance, Instances, RoundedBox } from "@react-three/drei";
import { createCpuMaterials } from "./materials";
import type { QualitySettings } from "./useResponsiveQuality";

interface CpuModelProps {
  quality: QualitySettings;
  accentColor: string;
}

const PCB_SIZE = 3.4;
const PCB_HEIGHT = 0.16;
const SPREADER_SIZE = 2.5;
const SPREADER_HEIGHT = 0.46;

/**
 * Procedural 3D CPU: PCB substrate, brushed-metal heat-spreader, an
 * exposed die, an instanced ridge lattice on top and an instanced pin
 * grid underneath. No external model/texture files — geometry and
 * surface detail are generated in code so the whole thing stays cheap
 * (well under ~20k tris, ~10 draw calls even at full quality).
 */
export function CpuModel({ quality, accentColor }: CpuModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });

  const materials = useMemo(
    () => createCpuMaterials(accentColor, quality.textureSize),
    [accentColor, quality.textureSize]
  );

  useEffect(() => {
    return () => materials.dispose();
  }, [materials]);

  useEffect(() => {
    if (!quality.idleMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [quality.idleMotion]);

  // Pin grid positions on the PCB underside, density driven by quality tier.
  const pinPositions = useMemo(() => {
    const positions: [number, number][] = [];
    const count = Math.max(4, Math.floor(18 / quality.pinGridStep));
    const spacing = (PCB_SIZE * 0.78) / count;
    const offset = ((count - 1) * spacing) / 2;
    for (let ix = 0; ix < count; ix++) {
      for (let iz = 0; iz < count; iz++) {
        positions.push([ix * spacing - offset, iz * spacing - offset]);
      }
    }
    return positions;
  }, [quality.pinGridStep]);

  // Ridge-lattice strip placements on the heat-spreader top face.
  const ridgePositions = useMemo(() => {
    const rows = 8;
    const span = SPREADER_SIZE * 0.85;
    const spacing = span / rows;
    const offset = ((rows - 1) * spacing) / 2;
    const strips: { pos: [number, number]; rotY: number }[] = [];
    for (let i = 0; i < rows; i++) {
      const p = i * spacing - offset;
      strips.push({ pos: [p, 0], rotY: 0 });
      strips.push({ pos: [0, p], rotY: Math.PI / 2 });
    }
    return strips;
  }, []);

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
    <group ref={groupRef}>
      <mesh
        position={[0, -SPREADER_HEIGHT / 2 - PCB_HEIGHT / 2, 0]}
        material={materials.pcbDark}
      >
        <boxGeometry args={[PCB_SIZE, PCB_HEIGHT, PCB_SIZE]} />
        {quality.wireframe && <Edges color="#ffffff" transparent opacity={0.18} />}
      </mesh>

      <RoundedBox
        args={[SPREADER_SIZE, SPREADER_HEIGHT, SPREADER_SIZE]}
        radius={0.05}
        smoothness={2}
        material={materials.metalLight}
      >
        {quality.wireframe && <Edges color="#ffffff" transparent opacity={0.18} />}
      </RoundedBox>

      {/* Exposed die, inset near one edge of the heat-spreader's top face */}
      <mesh
        position={[
          SPREADER_SIZE * 0.22,
          SPREADER_HEIGHT / 2 + 0.03,
          SPREADER_SIZE * 0.22,
        ]}
        material={materials.die}
      >
        <boxGeometry args={[0.9, 0.06, 0.9]} />
      </mesh>

      <Instances limit={ridgePositions.length} material={materials.metalLight}>
        <boxGeometry args={[SPREADER_SIZE * 0.85, 0.035, 0.045]} />
        {ridgePositions.map((r, i) => (
          <Instance
            key={i}
            position={[r.pos[0], SPREADER_HEIGHT / 2 + 0.02, r.pos[1]]}
            rotation={[0, r.rotY, 0]}
          />
        ))}
      </Instances>

      <Instances limit={pinPositions.length} material={materials.pin}>
        <cylinderGeometry args={[0.028, 0.028, 0.22, 6]} />
        {pinPositions.map(([x, z], i) => (
          <Instance
            key={i}
            position={[x, -SPREADER_HEIGHT / 2 - PCB_HEIGHT - 0.11, z]}
          />
        ))}
      </Instances>
    </group>
  );
}
