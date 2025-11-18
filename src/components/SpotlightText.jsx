"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function SpotlightText({
  text,
  children,
  fontSize = "text-5xl md:text-7xl",
  fontWeight = "font-bold",
  colorBase = "#999999",
  colorReveal = "#000000",
  spotlightSize = 220,
  animationDuration = 0.25,
  animationEase = "power2.out",
  fadeOnLeave = true,
  className = "",
  as: Component = "div",
}) {
  const wrapperRef = useRef(null);
  const revealRef = useRef(null);
  const content = children || text || "Hover to reveal";

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const reveal = revealRef.current;

    if (!wrapper || !reveal) return;

    // Initialize with spotlight hidden
    gsap.set(reveal, {
      clipPath: `circle(0px at 50% 50%)`,
    });

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(reveal, {
        clipPath: `circle(${spotlightSize}px at ${x}px ${y}px)`,
        duration: animationDuration,
        ease: animationEase,
      });
    };

    const handleMouseLeave = () => {
      if (fadeOnLeave) {
        gsap.to(reveal, {
          clipPath: `circle(0px at 50% 50%)`,
          duration: animationDuration * 1.5,
          ease: "power2.inOut",
        });
      }
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spotlightSize, animationDuration, animationEase, fadeOnLeave]);

  return (
    <Component
      ref={wrapperRef}
      className={`relative inline-block cursor-default select-none ${className}`}
      style={{ WebkitUserSelect: "none" }}
    >
      {/* BASE TEXT */}
      <div
        className={`${fontSize} ${fontWeight} leading-tight tracking-tight`}
        style={{ color: colorBase }}
        aria-hidden="true"
      >
        {content}
      </div>

      {/* SPOTLIGHT REVEAL TEXT */}
      <div
        ref={revealRef}
        className={`absolute inset-0 pointer-events-none ${fontSize} ${fontWeight} leading-tight tracking-tight`}
        style={{
          color: colorReveal,
          willChange: "clip-path",
        }}
        aria-hidden="true"
      >
        {content}
      </div>

      {/* Screen reader accessible text */}
      <span className="sr-only">{content}</span>
    </Component>
  );
}
