"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function CursorMaskReveal({
  // 📦 CONTAINER SETTINGS
  width = 900,
  height = 500,
  borderRadius = "1.5rem",

  // 🖼️ IMAGE SETTINGS
  fgImage = "/fg.jpg", // Grayscale image (always visible)
  bgImage = "/bg.jpg", // Color image (revealed by cursor)

  // 🎨 STYLE SETTINGS
  overlayColor = "rgba(255,255,255,0.4)", // Tint on grayscale

  // 🔦 SPOTLIGHT SETTINGS
  maskSize = 250, // Spotlight diameter
  glowEffect = true, // Spotlight glow border
  glowColor = "rgba(255,255,255,0.3)", // Glow color
  featherEdge = true, // Glow sizing
}) {
  const containerRef = useRef(null);
  const revealLayerRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const revealLayer = revealLayerRef.current;
    const glowEl = glowRef.current;

    // ⚡ GPU acceleration
    gsap.set([revealLayer, glowEl], { force3D: true });

    // Pre-calculate values for performance
    const halfMask = maskSize / 2;
    const feather = featherEdge ? 15 : 0;
    const glowRadius = halfMask + feather;

    // ⚡ INSTANT TRACKING with optimized calculations
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Apply spotlight mask INSTANTLY
      revealLayer.style.clipPath = `circle(${halfMask}px at ${x}px ${y}px)`;

      // Apply glow effect INSTANTLY
      if (glowEffect && glowEl) {
        glowEl.style.background = `radial-gradient(circle ${glowRadius}px at ${x}px ${y}px, ${glowColor}, transparent)`;
      }
    };

    const handleMouseEnter = (e) => {
      // Set initial position instantly on enter
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      revealLayer.style.clipPath = `circle(${halfMask}px at ${x}px ${y}px)`;

      if (glowEffect && glowEl) {
        glowEl.style.background = `radial-gradient(circle ${glowRadius}px at ${x}px ${y}px, ${glowColor}, transparent)`;
      }
    };

    const handleMouseLeave = () => {
      // Hide spotlight when leaving
      revealLayer.style.clipPath = `circle(0px at 50% 50%)`;
      if (glowEl) {
        glowEl.style.background = "transparent";
      }
    };

    // Passive listeners for better scroll performance
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maskSize, glowEffect, glowColor, featherEdge]);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div
        ref={containerRef}
        className="relative overflow-hidden shadow-2xl"
        style={{
          width,
          height,
          borderRadius,
          cursor: "none",
          willChange: "transform",
          contain: "layout style paint", // ⚡ Rendering optimization
          transform: "translateZ(0)", // ⚡ GPU layer
        }}
      >
        {/* ===== LAYER 1: Grayscale Base ===== */}
        <div
          className="absolute inset-0"
          style={{
            contain: "layout style paint", // ⚡ Isolate layer
          }}
        >
          <img
            src={fgImage}
            alt="grayscale"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              filter: "grayscale(1) brightness(1.3) contrast(0.6)",
              transform: "translateZ(0)", // ⚡ GPU layer
            }}
            draggable="false"
            loading="eager" // ⚡ Priority load
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: overlayColor,
              transform: "translateZ(0)", // ⚡ GPU layer
            }}
          />
        </div>

        {/* ===== LAYER 2: Glow Effect ===== */}
        {glowEffect && (
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
            style={{
              willChange: "background",
              contain: "layout style paint", // ⚡ Isolate layer
              transform: "translateZ(0)", // ⚡ GPU layer
            }}
          />
        )}

        {/* ===== LAYER 3: Color Reveal ===== */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: "circle(0px at 50% 50%)",
            willChange: "clip-path",
            contain: "layout style paint", // ⚡ Isolate layer
            transform: "translateZ(0)", // ⚡ GPU layer
          }}
        >
          <img
            src={bgImage}
            alt="color reveal"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            draggable="false"
            loading="eager" // ⚡ Priority load
            style={{
              transform: "translateZ(0)", // ⚡ GPU layer
            }}
          />
        </div>

        {/* ===== LAYER 4: Helper Text ===== */}
        <div className="absolute inset-0 pointer-events-none mix-blend-difference">
          <div className="text-white text-md font-mono opacity-50 absolute top-4 left-4">
            Move cursor to reveal
          </div>
        </div>
      </div>
    </div>
  );
}
