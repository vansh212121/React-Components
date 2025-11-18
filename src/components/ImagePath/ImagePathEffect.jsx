"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ImagePathTrail({
  images = [],
  width = 180,
  height = 220,
  // Animation settings
  fadeInDuration = 0.2,
  fadeOutDuration = 0.5,
  slideDistance = 40,
  scaleFrom = 0.8,
  scaleTo = 1,
  // Interaction settings
  threshold = 100,
  xOffset = 0,
  yOffset = 0,
}) {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const activeIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // NEW: A counter to ensure the newest image is always on top
  const globalZIndex = useRef(100);

  useEffect(() => {
    gsap.set(imageRefs.current, { opacity: 0, scale: scaleFrom });

    const handleMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const distance = Math.hypot(
        currentX - lastMousePos.current.x,
        currentY - lastMousePos.current.y
      );

      if (distance < threshold) return;

      lastMousePos.current = { x: currentX, y: currentY };

      const el = imageRefs.current[activeIndex.current];
      activeIndex.current = (activeIndex.current + 1) % images.length;

      // NEW: Increment Z-index so this specific image is higher than the previous one
      globalZIndex.current++;

      gsap.killTweensOf(el);

      const randomRotation = Math.random() * 15 - 7.5;

      gsap.set(el, {
        x: currentX + xOffset,
        y: currentY + yOffset,
        rotation: randomRotation,
        scale: scaleFrom,
        opacity: 0,
        filter: "blur(5px)",
        zIndex: globalZIndex.current, // <--- This solves the stacking issue
      });

      const tl = gsap.timeline();

      tl.to(el, {
        opacity: 1,
        scale: scaleTo,
        filter: "blur(0px)",
        duration: fadeInDuration,
        ease: "power2.out",
      }).to(
        el,
        {
          y: `+=${slideDistance}`,
          opacity: 0,
          filter: "blur(8px)",
          duration: fadeOutDuration,
          ease: "power2.in",
        },
        `+=${0.15}`
      );
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, [
    images.length,
    width,
    height,
    fadeInDuration,
    fadeOutDuration,
    slideDistance,
    scaleFrom,
    scaleTo,
    threshold,
    xOffset,
    yOffset,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80vh] bg-neutral-900 overflow-hidden rounded-2xl flex items-center justify-center border border-neutral-800"
    >
      <p className="absolute bottom-10 text-white/50 text-lg pointer-events-none select-none">
        Move your mouse
      </p>

      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => (imageRefs.current[i] = el)}
          src={src}
          alt=""
          className="absolute top-0 left-0 block object-cover pointer-events-none rounded-xl shadow-2xl will-change-transform"
          style={{
            width,
            height,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
