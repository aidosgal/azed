export interface CameraKeyframe {
  /** Camera position in world space. */
  position: [number, number, number];
  /** Point the camera looks at. */
  lookAt: [number, number, number];
  /** Vertical field of view, in degrees. */
  fov: number;
}

/**
 * Named camera states, one per page section. CameraRig tweens through
 * these in order as the user scrolls the whole page — this is the one
 * file to touch when tuning the hero -> about -> projects -> contact
 * framing sequence.
 */
export const cameraKeyframes: Record<
  "hero" | "about" | "projects" | "contact",
  CameraKeyframe
> = {
  // Dominant, slightly off-center chip, seen at a three-quarter angle.
  hero: {
    position: [1.8, 1.1, 6.8],
    lookAt: [0, 0, 0],
    fov: 40,
  },
  // Rotate to a lower angle that reveals the pin grid and die along the
  // frame edge, without the model overwhelming the body copy.
  about: {
    position: [-3.6, 0.3, 5.6],
    lookAt: [0.3, -0.2, 0],
    fov: 34,
  },
  // Pull back to a wide, abstract framing so project cards read clearly.
  projects: {
    position: [0.5, 4, 11],
    lookAt: [0, 0.2, 0],
    fov: 54,
  },
  // Settle into a calm resting angle near the contact section.
  contact: {
    position: [-2.6, 0.8, 5.8],
    lookAt: [0, 0, 0],
    fov: 36,
  },
};

export const cameraKeyframeOrder: Array<keyof typeof cameraKeyframes> = [
  "hero",
  "about",
  "projects",
  "contact",
];
