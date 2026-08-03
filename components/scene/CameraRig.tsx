"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsapClient";
import { cameraKeyframeOrder, cameraKeyframes } from "./cameraKeyframes";

/**
 * Drives the camera through the named keyframes in cameraKeyframes.ts as
 * the page scrolls, via a single scrubbed GSAP timeline spanning the
 * entire document (trigger = document.body, top-of-page to bottom-of-page —
 * the page has one continuous scroll flow, so no dedicated scroll
 * container ref is needed). The timeline only ever tweens a plain state
 * object — never the live Three.js camera directly — and a useFrame loop
 * lerps the real camera to that state each render, decoupling GSAP's
 * scrub tick rate from R3F's frame loop.
 */
export function CameraRig() {
  const cameraState = useRef({
    x: cameraKeyframes.hero.position[0],
    y: cameraKeyframes.hero.position[1],
    z: cameraKeyframes.hero.position[2],
    lookAtX: cameraKeyframes.hero.lookAt[0],
    lookAtY: cameraKeyframes.hero.lookAt[1],
    lookAtZ: cameraKeyframes.hero.lookAt[2],
    fov: cameraKeyframes.hero.fov,
  });

  useEffect(() => {
    ensureGsapRegistered();
    const state = cameraState.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    for (const key of cameraKeyframeOrder.slice(1)) {
      const kf = cameraKeyframes[key];
      tl.to(state, {
        x: kf.position[0],
        y: kf.position[1],
        z: kf.position[2],
        lookAtX: kf.lookAt[0],
        lookAtY: kf.lookAt[1],
        lookAtZ: kf.lookAt[2],
        fov: kf.fov,
        ease: "none",
        duration: 1,
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    const resizeTimeout = window.setTimeout(refresh, 300);
    window.addEventListener("resize", refresh);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    const s = cameraState.current;
    targetPosition.current.set(s.x, s.y, s.z);
    targetLookAt.current.set(s.lookAtX, s.lookAtY, s.lookAtZ);

    // Frame-rate independent smoothing, on top of GSAP's own scrub easing.
    const lerpFactor = 1 - Math.pow(0.00001, delta);
    camera.position.lerp(targetPosition.current, lerpFactor);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, s.fov, lerpFactor);
      camera.updateProjectionMatrix();
    }

    camera.lookAt(targetLookAt.current);
  });

  return null;
}
