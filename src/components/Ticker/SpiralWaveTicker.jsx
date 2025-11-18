"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SpiralWaveTicker({
  items = Array.from(
    { length: 12 },
    (_, i) => `https://picsum.photos/seed/${i + 20}/200`
  ),
  speed = 25,
  spiralAmplitude = 70,
  spiralTightness = 0.006,
  rotationSpeed = 0.002,
  size = 85,
  gap = 22,
}) {
  const trackRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemElements = Array.from(track.children);
    const itemWidth = size + gap;
    const totalWidth = itemElements.length * itemWidth;

    // Duplicate
    itemElements.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });

    const allItems = Array.from(track.children);

    // Main scroll
    gsap.to(track, {
      x: -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    // Spiral wave effect
    const applySpiralWave = () => {
      timeRef.current += rotationSpeed;
      const scrollOffset = Math.abs(
        parseFloat(gsap.getProperty(track, "x")) || 0
      );

      allItems.forEach((item, index) => {
        const baseX = index * itemWidth;
        const currentX = baseX - scrollOffset;

        // Spiral calculation
        const angle = currentX * spiralTightness + timeRef.current;
        const radius = spiralAmplitude + Math.sin(angle * 0.5) * 20;

        const y = Math.sin(angle) * radius;
        const z = Math.cos(angle) * 50; // Depth

        // Rotation based on position
        const rotation = Math.sin(angle) * 8;
        const rotateY = Math.cos(angle) * 20;

        // Scale based on depth
        const scale = 0.9 + ((z + 50) / 100) * 0.3;

        // Opacity for depth
        const opacity = 0.5 + ((z + 50) / 100) * 0.5;

        gsap.set(item, {
          y: y,
          z: z,
          rotation: rotation,
          rotationY: rotateY,
          scale: scale,
          opacity: opacity,
          transformPerspective: 1200,
        });
      });
    };

    gsap.ticker.add(applySpiralWave);

    return () => {
      gsap.ticker.remove(applySpiralWave);
    };
  }, [speed, spiralAmplitude, spiralTightness, rotationSpeed, size, gap]);

  return (
    <div className="w-full py-28 overflow-hidden bg-black">
      <div
        className="relative"
        style={{
          height: spiralAmplitude * 2 + size + 100,
          perspective: "1500px",
        }}
      >
        <div
          ref={trackRef}
          className="absolute flex"
          style={{
            gap: `${gap}px`,
            top: "50%",
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: size,
                height: size,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={src}
                alt={`Item ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
