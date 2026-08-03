"use client";

import { useEffect, useState } from "react";

export type QualityTier = "full" | "reduced" | "minimal";

export interface QualitySettings {
  tier: QualityTier;
  pinGridStep: number; // lower = denser grid = more pin instances
  textureSize: number;
  dpr: [number, number];
  wireframe: boolean;
  rimLight: boolean;
  idleMotion: boolean;
  frameloop: "always" | "demand";
}

const TIER_SETTINGS: Record<QualityTier, QualitySettings> = {
  full: {
    tier: "full",
    pinGridStep: 1,
    textureSize: 512,
    dpr: [1, 2],
    wireframe: true,
    rimLight: true,
    idleMotion: true,
    frameloop: "always",
  },
  reduced: {
    tier: "reduced",
    pinGridStep: 2,
    textureSize: 256,
    dpr: [1, 1.5],
    wireframe: false,
    rimLight: false,
    idleMotion: true,
    frameloop: "always",
  },
  minimal: {
    tier: "minimal",
    pinGridStep: 3,
    textureSize: 0,
    dpr: [1, 1],
    wireframe: false,
    rimLight: false,
    idleMotion: false,
    frameloop: "demand",
  },
};

function computeTier(): QualityTier {
  if (typeof window === "undefined") return "full";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;

  if (prefersReducedMotion || (isMobile && lowCores)) return "minimal";
  if (isMobile) return "reduced";
  return "full";
}

/** Derives a 3D-scene quality tier from viewport, motion preference and core count. */
export function useResponsiveQuality(): QualitySettings {
  const [tier, setTier] = useState<QualityTier>(computeTier);

  useEffect(() => {
    const update = () => setTier(computeTier());
    update();

    const widthQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    widthQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      widthQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return TIER_SETTINGS[tier];
}
