"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CleanImageTrail({
  images = [
    { src: "https://picsum.photos/seed/40/400/500", title: "Design" },
    { src: "https://picsum.photos/seed/41/400/500", title: "Develop" },
    { src: "https://picsum.photos/seed/42/400/500", title: "Deploy" },
    { src: "https://picsum.photos/seed/43/400/500", title: "Scale" },
    { src: "https://picsum.photos/seed/44/400/500", title: "Growth" },
  ],
  width = 180,
  height = 240, // Slightly taller for text area
  threshold = 120, // Distance between cards
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const activeIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const globalZIndex = useRef(100);

  // Cycle through text/images independently if needed,
  // but here we assume the image list covers the DOM pool
  const dataIndex = useRef(0);

  useEffect(() => {
    // Hide all items initially
    gsap.set(itemRefs.current, { opacity: 0, scale: 0.5 });

    const handleMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 1. Calculate Distance
      const distance = Math.hypot(
        x - lastMousePos.current.x,
        y - lastMousePos.current.y
      );

      // 2. Check Threshold
      if (distance < threshold) return;

      // 3. Update Logic
      lastMousePos.current = { x, y };
      globalZIndex.current++;

      // Get next DOM element from pool
      const el = itemRefs.current[activeIndex.current];
      activeIndex.current = (activeIndex.current + 1) % images.length;

      // Get next Data (Text/Image)
      // We manually manipulate the DOM content of the React ref here
      // to avoid triggering a React render cycle (performance)
      const currentData = images[dataIndex.current];
      dataIndex.current = (dataIndex.current + 1) % images.length;

      // Update DOM content directly for performance
      const imgEl = el.querySelector(".trail-img");
      const textEl = el.querySelector(".trail-text");
      if (imgEl) imgEl.src = currentData.src;
      if (textEl) textEl.innerText = currentData.title;

      // 4. Animation
      gsap.killTweensOf(el);

      const rotation = gsap.utils.random(-8, 8);

      gsap.set(el, {
        x: x - width / 2,
        y: y - height / 2 + 20, // Start slightly lower
        rotation: rotation,
        scale: 0.85,
        opacity: 0,
        zIndex: globalZIndex.current,
        filter: "blur(4px) grayscale(0.5)", // Start slightly B&W and blurred
      });

      const tl = gsap.timeline();

      tl.to(el, {
        opacity: 1,
        scale: 1,
        y: y - height / 2, // Move up to cursor
        filter: "blur(0px) grayscale(0)",
        duration: 0.3,
        ease: "power2.out",
      }).to(el, {
        opacity: 0,
        scale: 0.9,
        y: `-=${40}`, // Float UP
        duration: 0.4,
        ease: "power2.in",
        delay: 0.1,
      });
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, [images, width, height, threshold]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden cursor-default flex items-center justify-center"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-50 pointer-events-none text-center select-none">
        <h2 className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">
          Work & Projects
        </h2>
        <p className="text-neutral-500 font-medium">Move cursor to reveal</p>
      </div>

      {/* Image Pool */}
      {images.map((_, i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
          style={{ width, height, opacity: 0 }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white border border-neutral-200">
            {/* Image */}
            <img
              className="trail-img w-full h-full object-cover"
              src="" // Source set via JS
              alt=""
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-4">
              <div className="inline-block px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-white/10 mb-1">
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">
                  Project
                </span>
              </div>
              <p className="trail-text text-white font-bold text-lg leading-tight">
                {/* Text set via JS */}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
