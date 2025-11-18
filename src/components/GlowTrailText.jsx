

"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

export default function CanvasGlowTrailsText({
  text,
  children,
  fontSize = "text-5xl md:text-7xl",
  fontWeight = "font-bold",
  colorBase = "#999999",
  colorReveal = "#000000",
  glowColor = "#3b82f6",
  spotlightSize = 180,
  trailDecay = 0.92, // How fast trails fade (0-1)
  className = "",
  as: Component = "div",
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const revealRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const content = children || text || "Hover to reveal";

  // Canvas trail animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const wrapper = wrapperRef.current;

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      // Fade effect (trail decay)
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - trailDecay})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw glow particles
      particles.current = particles.current.filter((p) => {
        p.life -= 0.02;
        if (p.life <= 0) return false;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );
        gradient.addColorStop(
          0,
          `${glowColor}${Math.floor(p.life * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);

        return true;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [glowColor, trailDecay]);

  // Mouse interaction
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const reveal = revealRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !reveal || !canvas) return;

    gsap.set(reveal, {
      clipPath: `circle(0px at 50% 50%)`,
    });

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Main spotlight
      gsap.to(reveal, {
        clipPath: `circle(${spotlightSize}px at ${x}px ${y}px)`,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });

      // Add glow particle
      particles.current.push({
        x,
        y,
        size: spotlightSize * 0.6,
        life: 1,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(reveal, {
        clipPath: `circle(0px at 50% 50%)`,
        duration: 0.3,
        ease: "power2.inOut",
      });
      particles.current = [];
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spotlightSize]);

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

      {/* CANVAS GLOW LAYER */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
        aria-hidden="true"
      />

      {/* MAIN SPOTLIGHT REVEAL */}
      <div
        ref={revealRef}
        className={`absolute inset-0 pointer-events-none ${fontSize} ${fontWeight} leading-tight tracking-tight`}
        style={{
          color: colorReveal,
          willChange: "clip-path",
          filter: `drop-shadow(0 0 10px ${glowColor})`,
        }}
        aria-hidden="true"
      >
        {content}
      </div>

      <span className="sr-only">{content}</span>
    </Component>
  );
}
