"use client";

import { useEffect, useState } from "react";

export type QualityTier = "full" | "reduced" | "minimal";

export interface QualitySettings {
  tier: QualityTier;
  dpr: [number, number];
  rimLight: boolean;
  idleMotion: boolean;
  frameloop: "always" | "demand";
  bloom: boolean; // whether the neon bloom postprocessing pass is active
}

const TIER_SETTINGS: Record<QualityTier, QualitySettings> = {
  full: {
    tier: "full",
    dpr: [1, 2],
    rimLight: true,
    idleMotion: true,
    frameloop: "always",
    bloom: true,
  },
  reduced: {
    tier: "reduced",
    dpr: [1, 1.5],
    rimLight: false,
    idleMotion: true,
    frameloop: "always",
    bloom: true,
  },
  minimal: {
    tier: "minimal",
    dpr: [1, 1],
    rimLight: false,
    idleMotion: false,
    frameloop: "demand",
    bloom: false,
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
