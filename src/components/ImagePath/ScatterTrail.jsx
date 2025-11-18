"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ScatterTrail({
  images = [
    "https://picsum.photos/seed/10/400/500",
    "https://picsum.photos/seed/11/400/500",
    "https://picsum.photos/seed/12/400/500",
    "https://picsum.photos/seed/13/400/500",
    "https://picsum.photos/seed/14/400/500",
    "https://picsum.photos/seed/15/400/500",
  ],
  width = 140,
  height = 180,
  threshold = 100, // Distance to move before spawning next image
}) {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const activeIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const globalZIndex = useRef(1000); // Start high

  useEffect(() => {
    // Initialize all images to hidden
    gsap.set(imageRefs.current, { opacity: 0, scale: 0.5 });

    const handleMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance
      const dist = Math.hypot(
        x - lastMousePos.current.x,
        y - lastMousePos.current.y
      );

      if (dist < threshold) return;

      lastMousePos.current = { x, y };
      globalZIndex.current++;

      // Cycle through images
      const img = imageRefs.current[activeIndex.current];
      activeIndex.current = (activeIndex.current + 1) % images.length;

      gsap.killTweensOf(img);

      // --- RANDOMIZATION ---
      // Random rotation for messy look
      const randomRotation = gsap.utils.random(-25, 25);
      // Random offset so they don't appear in a perfect straight line
      const randomX = gsap.utils.random(-20, 20);
      const randomY = gsap.utils.random(-20, 20);

      gsap.set(img, {
        x: x - width / 2 + randomX,
        y: y - height / 2 + randomY,
        rotation: randomRotation,
        scale: 0.8,
        opacity: 0,
        zIndex: globalZIndex.current,
        filter: "blur(5px)",
      });

      const tl = gsap.timeline();

      // Animation: Pop in -> Fall down with Gravity
      tl.to(img, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.2,
        ease: "back.out(1.7)", // Bouncy pop-in
      }).to(
        img,
        {
          y: `+=${gsap.utils.random(100, 150)}`, // Fall down (Gravity)
          rotation: randomRotation + gsap.utils.random(-10, 10), // Rotate slightly while falling
          opacity: 0,
          scale: 0.5, // Shrink while falling
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power2.in",
        },
        "<+=0.1"
      ); // Start fading shortly after appearing
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, [threshold, width, height, images.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#111] overflow-hidden cursor-none flex items-center justify-center"
    >
      <div className="pointer-events-none text-center z-0">
        <h2 className="text-white/20 text-4xl font-bold uppercase tracking-widest">
          Scatter
        </h2>
        <p className="text-white/10 mt-2">Move cursor fast</p>
      </div>

      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => (imageRefs.current[i] = el)}
          src={src}
          alt=""
          className="absolute top-0 left-0 object-cover rounded-lg shadow-2xl border-2 border-white/10 will-change-transform"
          style={{ width, height, opacity: 0 }}
        />
      ))}
    </div>
  );
}
