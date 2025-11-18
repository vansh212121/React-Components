"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MultiImageTrail({
  images = [
    "https://picsum.photos/seed/10/400/500",
    "https://picsum.photos/seed/11/400/500",
    "https://picsum.photos/seed/12/400/500",
    "https://picsum.photos/seed/13/400/500",
    "https://picsum.photos/seed/14/400/500",
    "https://picsum.photos/seed/15/400/500",
  ],
  maxImages = 12, // Max simultaneous images
  width = 160,
  height = 200,
  spawnDelay = 100,
}) {
  const containerRef = useRef(null);
  const poolRef = useRef([]);
  const indexRef = useRef(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create image pool
    for (let i = 0; i < maxImages; i++) {
      const img = document.createElement("img");
      img.className =
        "absolute rounded-xl object-cover pointer-events-none shadow-2xl opacity-0";
      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
      img.src = images[i % images.length];
      container.appendChild(img);
      poolRef.current.push(img);
    }

    let poolIndex = 0;

    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastSpawnRef.current < spawnDelay) return;
      lastSpawnRef.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Get next image from pool
      const img = poolRef.current[poolIndex];
      poolIndex = (poolIndex + 1) % maxImages;

      // Update image source
      img.src = images[indexRef.current % images.length];
      indexRef.current++;

      // Kill existing animations
      gsap.killTweensOf(img);

      // Set initial position
      const randomRotation = gsap.utils.random(-20, 20);
      const randomX = gsap.utils.random(-30, 30);
      const randomY = gsap.utils.random(-30, 30);

      gsap.set(img, {
        x: x - width / 2 + randomX,
        y: y - height / 2 + randomY,
        scale: 0.6,
        opacity: 0,
        rotation: randomRotation,
        filter: "blur(4px)",
      });

      // Animate in
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate out
      gsap.to(img, {
        opacity: 0,
        scale: 0.85,
        y: `+=${gsap.utils.random(-60, -40)}`,
        rotation: randomRotation + gsap.utils.random(-10, 10),
        filter: "blur(8px)",
        duration: 0.8,
        delay: 0.15,
        ease: "power2.in",
      });
    };

    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      poolRef.current.forEach((img) => img.remove());
      poolRef.current = [];
    };
  }, [images, maxImages, width, height, spawnDelay]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-white/60 text-2xl font-light mb-2">Image Trail</p>
          <p className="text-white/30 text-sm">
            Move your cursor to create magic
          </p>
        </div>
      </div>
    </div>
  );
}


