"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ComplexWaveTicker({
  items = Array.from({ length: 10 }, (_, i) => ({
    src: `https://picsum.photos/seed/${i + 10}/200`,
    title: `Item ${i + 1}`,
  })),
  speed = 50,
  waveConfig = {
    primary: { amplitude: 80, frequency: 0.003 },
    secondary: { amplitude: 30, frequency: 0.007 },
    tertiary: { amplitude: 15, frequency: 0.012 },
  },
  size = 100,
  gap = 30,
}) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemElements = Array.from(track.children);
    const itemWidth = size + gap;
    const totalWidth = itemElements.length * itemWidth;

    // Clone items
    itemElements.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    const allItems = Array.from(track.children);

    // Scroll animation
    gsap.to(track, {
      x: -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    // Complex wave with 3D perspective
    const applyComplexWave = () => {
      const scrollOffset = Math.abs(parseFloat(gsap.getProperty(track, "x")) || 0);

      allItems.forEach((item, index) => {
        const baseX = index * itemWidth;
        const currentX = baseX - scrollOffset;
        
        // Three-wave combination
        const y1 = Math.sin(currentX * waveConfig.primary.frequency) * waveConfig.primary.amplitude;
        const y2 = Math.sin(currentX * waveConfig.secondary.frequency) * waveConfig.secondary.amplitude;
        const y3 = Math.sin(currentX * waveConfig.tertiary.frequency) * waveConfig.tertiary.amplitude;
        
        const y = y1 + y2 + y3;
        
        // 3D rotation
        const rotateY = Math.sin(currentX * waveConfig.primary.frequency) * 15;
        const rotateX = Math.cos(currentX * waveConfig.secondary.frequency) * 5;
        
        // Dynamic scale and opacity for depth
        const normalizedSin = (Math.sin(currentX * waveConfig.primary.frequency) + 1) / 2;
        const scale = 0.85 + normalizedSin * 0.3;
        const opacity = 0.6 + normalizedSin * 0.4;

        gsap.set(item, {
          y: y,
          rotationY: rotateY,
          rotationX: rotateX,
          scale: scale,
          opacity: opacity,
          transformPerspective: 1000,
        });
      });
    };

    gsap.ticker.add(applyComplexWave);

    return () => {
      gsap.ticker.remove(applyComplexWave);
    };
  }, [speed, waveConfig, size, gap]);

  const totalAmplitude = Object.values(waveConfig).reduce((sum, w) => sum + w.amplitude, 0);

  return (
    <div className="w-full py-32 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      <div
        className="relative"
        style={{ 
          height: totalAmplitude * 2 + size + 80,
          perspective: "1200px",
        }}
      >
        <div
          ref={trackRef}
          className="absolute flex preserve-3d"
          style={{
            gap: `${gap}px`,
            top: "50%",
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 group"
              style={{
                width: size,
                height: size,
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-2xl">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}