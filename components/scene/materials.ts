import * as THREE from "three";
import { createCircuitTexture, createDieTexture } from "./textures";

/**
 * Builds the small set of shared materials used across the CPU model.
 * Called once per mount via useMemo in CpuModel — meshes reference these
 * instances rather than each allocating their own.
 */
export function createCpuMaterials(accentColor: string, textureSize = 512) {
  const pcbTexture =
    textureSize > 0 ? createCircuitTexture(textureSize, accentColor) : null;
  const dieTexture =
    textureSize > 0 ? createDieTexture(Math.round(textureSize / 2)) : null;

  const metalLight = new THREE.MeshStandardMaterial({
    color: "#d8d8d8",
    metalness: 0.85,
    roughness: 0.32,
  });

  const metalDark = new THREE.MeshStandardMaterial({
    color: "#3a3a3a",
    metalness: 0.6,
    roughness: 0.4,
  });

  const pcbDark = new THREE.MeshStandardMaterial({
    color: "#141414",
    metalness: 0.1,
    roughness: 0.85,
    map: pcbTexture,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: pcbTexture ? 0.06 : 0,
    emissiveMap: pcbTexture,
  });

  const die = new THREE.MeshStandardMaterial({
    color: "#161616",
    metalness: 0.2,
    roughness: 0.55,
    map: dieTexture,
  });

  const pin = new THREE.MeshStandardMaterial({
    color: "#8c8c8c",
    metalness: 0.9,
    roughness: 0.3,
  });

  const materials = { metalLight, metalDark, pcbDark, die, pin };

  const dispose = () => {
    Object.values(materials).forEach((m) => m.dispose());
    pcbTexture?.dispose();
    dieTexture?.dispose();
  };

  return { ...materials, dispose };
}

export type CpuMaterials = ReturnType<typeof createCpuMaterials>;
