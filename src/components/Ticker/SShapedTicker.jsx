"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SShapedTicker({
  items = Array.from(
    { length: 8 },
    (_, i) => `https://picsum.photos/seed/${i + 1}/200`
  ),
  speed = 40,
  primaryAmplitude = 50, // Main wave height
  secondaryAmplitude = 25, // Secondary wave height
  primaryFrequency = 0.004,
  secondaryFrequency = 0.008,
  size = 90,
  gap = 24,
}) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemElements = Array.from(track.children);
    const itemWidth = size + gap;
    const totalWidth = itemElements.length * itemWidth;

    // Clone for seamless loop
    itemElements.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    const allItems = Array.from(track.children);

    // Main scroll animation
    gsap.to(track, {
      x: -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    // S-shaped wave (combining two sine waves)
    const applyWave = () => {
      const scrollOffset = Math.abs(
        parseFloat(gsap.getProperty(track, "x")) || 0
      );

      allItems.forEach((item, index) => {
        const baseX = index * itemWidth;
        const currentX = baseX - scrollOffset;

        // Primary wave (slow, large)
        const primaryY =
          Math.sin(currentX * primaryFrequency) * primaryAmplitude;

        // Secondary wave (fast, small) - creates S-shape
        const secondaryY =
          Math.sin(currentX * secondaryFrequency) * secondaryAmplitude;

        // Combine waves
        const y = primaryY + secondaryY;

        // Dynamic rotation
        const rotation = Math.cos(currentX * primaryFrequency) * 3;

        // Scale for depth effect
        const scale = 1 + Math.sin(currentX * primaryFrequency) * 0.1;

        gsap.set(item, {
          y: y,
          rotation: rotation,
          scale: scale,
        });
      });
    };

    gsap.ticker.add(applyWave);

    return () => {
      gsap.ticker.remove(applyWave);
    };
  }, [
    speed,
    primaryAmplitude,
    secondaryAmplitude,
    primaryFrequency,
    secondaryFrequency,
    size,
    gap,
  ]);

  return (
    <div className="w-full py-24 overflow-hidden bg-gray-950">
      <div
        className="relative"
        style={{
          height: (primaryAmplitude + secondaryAmplitude) * 2 + size + 60,
        }}
      >
        <div
          ref={trackRef}
          className="absolute flex"
          style={{
            gap: `${gap}px`,
            top: "50%",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700"
              style={{
                width: size,
                height: size,
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
