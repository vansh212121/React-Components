"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function EnhancedHoverCard({
  width = 320,
  height = 460,
  bg = "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=1000&auto=format&fit=crop",
  popup = "https://png.pngtree.com/png-vector/20240601/ourmid/pngtree-cyborg-girl-cyberpunk-character-png-image_12593143.png",
  logo = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const bgImageRef = useRef(null);
  const charRef = useRef(null);
  const logoRef = useRef(null);
  const sheenRef = useRef(null);
  const flashRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      // --- SETUP ---

      // 1. Character setup
      gsap.set(charRef.current, {
        y: 20,
        scale: 0.85,
        opacity: 0,
        filter: "blur(5px)",
        transformOrigin: "center bottom",
      });

      // 2. Logo setup
      gsap.set(logoRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
        filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.5))",
      });

      // 3. Sheen & Flash setup
      gsap.set(sheenRef.current, { xPercent: -200 });
      gsap.set(flashRef.current, { opacity: 0 });

      // --- TIMELINE ---

      // 1. Shrink Card Base
      tl.to(
        cardRef.current,
        {
          height: height * 0.72,
          duration: 0.4,
          ease: "power3.inOut",
          boxShadow: "0px 40px 60px -15px rgba(0,0,0,0.5)",
        },
        0
      );

      // 2. Scale BG Image (Counter-zoom)
      tl.to(
        bgImageRef.current,
        {
          scale: 1.1,
          y: 10,
          duration: 0.4,
        },
        0
      );

      // 3. Pop Character UP
      tl.to(
        charRef.current,
        {
          y: -70,
          scale: 1.2,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        0.1
      );

      // 4. Pop Logo FORWARD (Scale vs Lift)
      // Instead of moving UP, we Scale HUGE to create "Pop Out" 3D effect
      tl.to(
        logoRef.current,
        {
          y: -25, // Minimal lift, just enough to detach
          scale: 1.65, // <--- HUGE SCALE (Overflows width)
          filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.7))",
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        0.05
      );

      // 5. Sheen Sweep
      tl.fromTo(
        sheenRef.current,
        { xPercent: -200, opacity: 0 },
        { xPercent: 200, opacity: 0.3, duration: 0.7, ease: "power2.out" },
        0.1
      );

      // 6. Impact Flash
      tl.fromTo(
        flashRef.current,
        { opacity: 0.5 },
        { opacity: 0, duration: 0.25 },
        0.1
      );

      // --- INTERACTION HANDLERS ---
      const container = containerRef.current;

      const onEnter = () => tl.play();
      const onLeave = () => {
        tl.reverse();
        gsap.to(container, { rotationX: 0, rotationY: 0, duration: 0.5 });
      };

      const onMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = x / rect.width - 0.5;
        const yPct = y / rect.height - 0.5;

        gsap.to(container, {
          rotationY: xPct * 15,
          rotationX: -yPct * 15,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      container.addEventListener("mousemove", onMove);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        container.removeEventListener("mousemove", onMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [height]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div
        ref={containerRef}
        className="relative cursor-pointer group perspective-1000"
        style={{ width, height, perspective: "1000px" }}
      >
        {/* LAYER 1: Shrinking Card Base */}
        <div
          ref={cardRef}
          className="absolute bottom-0 left-0 w-full rounded-3xl overflow-hidden bg-gray-900 shadow-2xl will-change-transform"
          style={{
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            ref={bgImageRef}
            src={bg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />

          <div
            ref={sheenRef}
            className="absolute inset-0  -skew-x-12 z-20"
            style={{ width: "150%" }}
          />

          <div
            ref={flashRef}
            className="absolute inset-0 bg-white z-30 pointer-events-none"
          />
        </div>

        {/* LAYER 2: Floating Elements (Character & Logo) */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center pointer-events-none">
          {/* Character - Sits Middle Depth */}
          <img
            ref={charRef}
            src={popup}
            alt="Character"
            className="relative z-40 w-[90%] object-contain will-change-transform"
            style={{ bottom: 0 }}
          />

          {/* Logo - Sits Max Depth (Closest to Camera) */}
          <div className="absolute bottom-10 z-50 w-full flex justify-center">
            <img
              ref={logoRef}
              src={logo}
              alt="Logo"
              className="w-[65%] object-contain will-change-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
