"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

export default function MagneticGlowText({
  text,
  children,
  fontSize = "text-5xl md:text-7xl",
  fontWeight = "font-bold",
  colorBase = "#999999",
  colorReveal = "#000000",
  glowColor = "#3b82f6",
  magneticStrength = 0.2,
  magneticRadius = 250,
  spotlightSize = 180,
  animationDuration = 0.35,
  className = "",
  as: Component = "div",
}) {
  const wrapperRef = useRef(null);
  const charsRef = useRef([]);
  const glowRef = useRef(null);
  const content = children || text || "Magnetic Glow";

  const textArray = content.split("");

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const glow = glowRef.current;

    if (!wrapper || !glow) return;

    gsap.set(glow, {
      clipPath: `circle(0px at 50% 50%)`,
    });

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Glow spotlight
      gsap.to(glow, {
        clipPath: `circle(${spotlightSize}px at ${mouseX}px ${mouseY}px)`,
        duration: animationDuration * 0.6,
        ease: "power2.out",
      });

      // Magnetic pull on characters
      charsRef.current.forEach((char) => {
        if (!char) return;

        const charRect = char.getBoundingClientRect();
        const charX = charRect.left - rect.left + charRect.width / 2;
        const charY = charRect.top - rect.top + charRect.height / 2;

        const distance = calculateDistance(mouseX, mouseY, charX, charY);

        if (distance < magneticRadius) {
          const angle = Math.atan2(mouseY - charY, mouseX - charX);
          const force = (1 - distance / magneticRadius) * magneticStrength;

          const x = Math.cos(angle) * force * 40;
          const y = Math.sin(angle) * force * 40;

          gsap.to(char, {
            x,
            y,
            duration: animationDuration,
            ease: "power3.out",
          });
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: animationDuration,
            ease: "power2.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        clipPath: `circle(0px at 50% 50%)`,
        duration: animationDuration,
        ease: "power2.inOut",
      });

      charsRef.current.forEach((char) => {
        if (!char) return;
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: animationDuration * 1.2,
          ease: "elastic.out(1, 0.5)",
        });
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magneticStrength, magneticRadius, spotlightSize, animationDuration]);

  return (
    <Component
      ref={wrapperRef}
      className={`relative inline-block cursor-default select-none ${className}`}
      style={{ WebkitUserSelect: "none" }}
    >
      {/* BASE TEXT with magnetic effect */}
      <div className={`${fontSize} ${fontWeight} leading-tight tracking-tight`}>
        {textArray.map((char, index) => (
          <span
            key={index}
            ref={(el) => (charsRef.current[index] = el)}
            className="inline-block will-change-transform"
            style={{ color: colorBase }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* GLOW REVEAL LAYER */}
      <div
        ref={glowRef}
        className={`absolute inset-0 pointer-events-none ${fontSize} ${fontWeight} leading-tight tracking-tight`}
        style={{
          color: colorReveal,
          willChange: "clip-path",
          filter: `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 40px ${glowColor})`,
        }}
        aria-hidden="true"
      >
        {content}
      </div>

      <span className="sr-only">{content}</span>
    </Component>
  );
}
