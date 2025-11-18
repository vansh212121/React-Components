"use client";

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import gsap from "gsap";

export default function MagneticText({
  text,
  children,
  fontSize = "text-5xl md:text-7xl",
  fontWeight = "font-bold",
  colorBase = "#999999",
  colorReveal = "#000000",
  magneticStrength = 0.3,
  magneticRadius = 200,
  animationDuration = 0.4,
  animationEase = "power3.out",
  splitBy = "chars", // 'chars' or 'words'
  revealOnProximity = true,
  className = "",
  as: Component = "div",
}) {
  const wrapperRef = useRef(null);
  const charsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const content = children || text || "Hover to attract";

  // Split text into characters or words
  const textArray =
    splitBy === "chars" ? content.split("") : content.split(" ");

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      charsRef.current.forEach((char) => {
        if (!char) return;

        const charRect = char.getBoundingClientRect();
        const charX = charRect.left - rect.left + charRect.width / 2;
        const charY = charRect.top - rect.top + charRect.height / 2;

        const distance = calculateDistance(mouseX, mouseY, charX, charY);

        if (distance < magneticRadius) {
          const angle = Math.atan2(mouseY - charY, mouseX - charX);
          const force = (1 - distance / magneticRadius) * magneticStrength;

          const x = Math.cos(angle) * force * 50;
          const y = Math.sin(angle) * force * 50;

          // Color reveal based on proximity
          const colorProgress = revealOnProximity
            ? 1 - distance / magneticRadius
            : 1;

          gsap.to(char, {
            x,
            y,
            duration: animationDuration,
            ease: animationEase,
            color: gsap.utils.interpolate(
              colorBase,
              colorReveal,
              colorProgress
            ),
          });
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: animationDuration,
            ease: animationEase,
            color: colorBase,
          });
        }
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      charsRef.current.forEach((char) => {
        if (!char) return;
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: animationDuration * 1.5,
          ease: "elastic.out(1, 0.5)",
          color: colorBase,
        });
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [
    magneticStrength,
    magneticRadius,
    animationDuration,
    animationEase,
    colorBase,
    colorReveal,
    revealOnProximity,
  ]);

  return (
    <Component
      ref={wrapperRef}
      className={`relative inline-block cursor-default select-none ${className}`}
      style={{ WebkitUserSelect: "none" }}
    >
      <div className={`${fontSize} ${fontWeight} leading-tight tracking-tight`}>
        {textArray.map((item, index) => (
          <span
            key={index}
            ref={(el) => (charsRef.current[index] = el)}
            className="inline-block will-change-transform"
            style={{
              color: colorBase,
              display: "inline-block",
            }}
          >
            {item === " " ? "\u00A0" : item}
            {splitBy === "words" && index < textArray.length - 1 && "\u00A0"}
          </span>
        ))}
      </div>

      <span className="sr-only">{content}</span>
    </Component>
  );
}
