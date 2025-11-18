"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ScatterBurstImages({
  images = [
    "https://picsum.photos/seed/30/400/500",
    "https://picsum.photos/seed/31/400/500",
    "https://picsum.photos/seed/32/400/500",
    "https://picsum.photos/seed/33/400/500",
    "https://picsum.photos/seed/34/400/500",
    "https://picsum.photos/seed/35/400/500",
  ],
  width = 120,
  height = 160,
  burstCount = 6, // How many images spawn per click
  clickDelay = 100, // Minimum ms between clicks
}) {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  // We need a pool index to cycle through DOM elements
  const currentPoolIndex = useRef(0);
  const lastClickTime = useRef(0);
  const globalZIndex = useRef(100);

  // Determine pool size: (burstCount * 4) ensures we have enough images
  // even if the user clicks quickly before animations finish.
  const poolSize = burstCount * 4;

  // Create a fixed array to map over in JSX
  const poolArray = Array.from({ length: poolSize });

  useEffect(() => {
    // Initial setup: Hide all images in the pool
    gsap.set(imageRefs.current, { opacity: 0, scale: 0 });

    const handleClick = (e) => {
      if (!containerRef.current) return;

      const now = Date.now();
      if (now - lastClickTime.current < clickDelay) return;
      lastClickTime.current = now;

      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn a batch of images (the burst)
      for (let i = 0; i < burstCount; i++) {
        const img = imageRefs.current[currentPoolIndex.current];

        // Increment pool index (loop back if at end)
        currentPoolIndex.current = (currentPoolIndex.current + 1) % poolSize;

        // Increment Z-Index so new bursts sit on top
        globalZIndex.current++;

        // --- PHYSICS CALCULATIONS ---

        // 1. Angle: Spread them out in a circle, but add randomness (jitter)
        const angle =
          (i / burstCount) * Math.PI * 2 + gsap.utils.random(-0.5, 0.5);

        // 2. Distance: How far they fly (randomized)
        const radius = gsap.utils.random(100, 250);

        // 3. Target Position
        const targetX = clickX + Math.cos(angle) * radius;
        const targetY = clickY + Math.sin(angle) * radius;

        // 4. Rotation: 3D tumble effect
        const randomRotate = gsap.utils.random(-180, 180);

        // --- ANIMATION ---
        gsap.killTweensOf(img);

        // Reset to cursor position
        gsap.set(img, {
          x: clickX - width / 2,
          y: clickY - height / 2,
          scale: 0,
          opacity: 1,
          rotation: 0,
          zIndex: globalZIndex.current,
          filter: "blur(0px)",
        });

        const tl = gsap.timeline();

        // Step 1: The Explosion (Fast & Bouncy)
        tl.to(img, {
          x: targetX - width / 2,
          y: targetY - height / 2,
          scale: 1,
          rotation: randomRotate,
          duration: 0.5,
          ease: "back.out(1.2)", // The "Pop" effect
        })
          // Step 2: Gravity & Fade (Slow fall)
          .to(
            img,
            {
              y: `+=${gsap.utils.random(50, 150)}`, // Drop down due to gravity
              rotation: randomRotate + gsap.utils.random(-20, 20),
              opacity: 0,
              scale: 0.8,
              filter: "blur(8px)",
              duration: 1,
              ease: "power2.in",
            },
            "-=0.1"
          ); // Overlap slightly
      }
    };

    const container = containerRef.current;
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [burstCount, clickDelay, poolSize, width, height]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-neutral-950 overflow-hidden cursor-pointer perspective-1000"
      style={{ perspective: "1000px" }} // Adds 3D depth for rotations
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="text-center">
          <h2 className="text-white/80 text-5xl font-bold tracking-tighter mb-4">
            CLICK ME
          </h2>
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Explosive Gallery
          </p>
        </div>
      </div>

      {poolArray.map((_, i) => (
        <img
          key={i}
          ref={(el) => (imageRefs.current[i] = el)}
          // Cycle through the passed images array
          src={images[i % images.length]}
          alt=""
          className="absolute top-0 left-0 object-cover rounded-xl shadow-2xl pointer-events-none will-change-transform"
          style={{
            width,
            height,
            opacity: 0, // Hidden by default
          }}
        />
      ))}
    </div>
  );
}
