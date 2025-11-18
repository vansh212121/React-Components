"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SmoothWaveTicker({
  items = [
    "https://picsum.photos/seed/1/200",
    "https://picsum.photos/seed/2/200",
    "https://picsum.photos/seed/3/200",
    "https://picsum.photos/seed/4/200",
    "https://picsum.photos/seed/5/200",
    "https://picsum.photos/seed/6/200",
    "https://picsum.photos/seed/7/200",
    "https://picsum.photos/seed/8/200",
  ],
  speed = 25, // Duration in seconds
  amplitude = 120, // Wave height
  frequency = 0.004, // Wave frequency (lower = wider waves)
  size = 80, // Item size
  gap = 20, // Gap between items
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemElements = Array.from(track.children);
    const itemWidth = size + gap;
    const totalWidth = itemElements.length * itemWidth;

    // Duplicate items for seamless loop
    itemElements.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    const allItems = Array.from(track.children);

    // Animate horizontal movement
    gsap.to(track, {
      x: -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    // Apply wave effect
    const applyWave = () => {
      const scrollOffset = Math.abs(
        parseFloat(gsap.getProperty(track, "x")) || 0
      );

      allItems.forEach((item, index) => {
        const baseX = index * itemWidth;
        const currentX = baseX - scrollOffset;

        // Sine wave calculation
        const y = Math.sin(currentX * frequency) * amplitude;

        // Rotation for dynamic effect
        const rotation = Math.cos(currentX * frequency) * 5;

        gsap.set(item, {
          y: y,
          rotation: rotation,
        });
      });
    };

    gsap.ticker.add(applyWave);

    return () => {
      gsap.ticker.remove(applyWave);
    };
  }, [items, speed, amplitude, frequency, size, gap]);

  return (
    <div className="w-full py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: amplitude * 2 + size + 40 }}
      >
        <div
          ref={trackRef}
          className="absolute flex items-center"
          style={{
            gap: `${gap}px`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
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
