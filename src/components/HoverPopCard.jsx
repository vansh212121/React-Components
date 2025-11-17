"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function HoverPopupCard({
  width = 360,
  height = 520,
  bg = "/placeholder-bg.jpg",
  popup = "/placeholder-popup.png",
  logo = "/placeholder-logo.png",
  shrink = 0.82,
  popupLift = 100,
  popupScale = 1.25,
  logoLift = 30,
  logoScale = 1.68,
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const cardBgRef = useRef(null);
  const popupRef = useRef(null);
  const logoRef = useRef(null);
  const shadowRef = useRef(null);
  const overlayRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const container = containerRef.current;
      const card = cardRef.current;
      const cardBg = cardBgRef.current;
      const popupImg = popupRef.current;
      const logoImg = logoRef.current;
      const shadow = shadowRef.current;
      const overlay = overlayRef.current;
      const bgImg = bgRef.current;

      const originalHeight = height;
      const shrinkHeight = height * shrink;

      // Initial states with GPU acceleration
      gsap.set(popupImg, {
        opacity: 0,
        scale: 0.55,
        y: 0,
        transformOrigin: "center bottom",
        force3D: true, // ⚡ GPU optimization
      });

      gsap.set(logoImg, {
        y: 0,
        scale: 1,
        transformOrigin: "center",
        force3D: true, // ⚡ GPU optimization
      });

      // Set GPU optimization on all animated elements
      gsap.set([shadow, container, card, cardBg, overlay, bgImg], {
        force3D: true,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      // Smooth shrink - EXACT ORIGINAL
      tl.to(
        [shadow, container, card, cardBg],
        {
          height: shrinkHeight,
          duration: 0.35,
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.35), 0 25px 50px rgba(0,0,0,0.22)",
          ease: "power2.out",
          force3D: true, // ⚡ GPU optimization
        },
        0
      );

      // Popup forward – EXACT ORIGINAL with optimization
      tl.fromTo(
        popupImg,
        {
          opacity: 0,
          scale: 0.55,
          y: 0,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: popupScale,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
          force3D: true, // ⚡ GPU optimization
        },
        0.06
      );

      // Logo lift - EXACT ORIGINAL
      tl.to(
        logoImg,
        {
          y: -logoLift * 0.6,
          scale: logoScale,
          duration: 0.35,
          ease: "power2.out",
          force3D: true, // ⚡ GPU optimization
        },
        0
      );

      // Overlay fade - EXACT ORIGINAL
      tl.to(
        overlay,
        {
          opacity: 0.45,
          duration: 0.35,
          force3D: true, // ⚡ GPU optimization
        },
        0
      );

      // BG scale - EXACT ORIGINAL
      tl.to(
        bgImg,
        {
          scale: 1.08,
          duration: 0.35,
          force3D: true, // ⚡ GPU optimization
        },
        0
      );

      // --- HOVER EVENTS (optimized handlers) ---
      const handleMouseEnter = () => {
        tl.timeScale(1).play();
      };

      const handleMouseLeave = () => {
        tl.timeScale(1.2).reverse();
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }, containerRef);

    return () => context.revert();
  }, [height, shrink, popupLift, popupScale, logoLift, logoScale]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        ref={shadowRef}
        className="rounded-3xl"
        style={{
          width,
          height,
          boxShadow:
            "0px 20px 60px rgba(0,0,0,0.15), 0px 10px 25px rgba(0,0,0,0.1)",
          willChange: "height, box-shadow",
        }}
      >
        <div
          ref={containerRef}
          className="relative rounded-3xl cursor-pointer w-full h-full flex justify-center items-end"
          style={{
            willChange: "height",
          }}
        >
          <div
            ref={cardRef}
            className="relative rounded-3xl w-full h-full flex items-end justify-center"
            style={{
              willChange: "height",
            }}
          >
            {/* LAYER 1: The Clipped Card Background */}
            <div
              ref={cardBgRef}
              className="absolute bottom-0 overflow-hidden bg-black w-full h-full rounded-3xl"
              style={{
                zIndex: 10,
                willChange: "height",
              }}
            >
              <div className="absolute inset-0">
                <img
                  ref={bgRef}
                  src={bg}
                  alt="background"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transformOrigin: "center" }}
                />
              </div>

              <div
                ref={overlayRef}
                className="absolute inset-0 bg-black opacity-0"
                style={{ zIndex: 5 }}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                style={{ zIndex: 6 }}
              />
            </div>
            <img
              ref={logoRef}
              src={logo}
              alt="logo"
              className="absolute left-1/2 -translate-x-1/2 w-[80%] object-contain pointer-events-none"
              style={{
                bottom: "40px",
                zIndex: 20,
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
              }}
            />

            {/* LAYER 2: The Pop-Out Image */}
            <img
              ref={popupRef}
              src={popup}
              alt="popup"
              className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[85%] object-contain pointer-events-none"
              style={{
                zIndex: 50,
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
                marginBottom: "-15px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// OPTIMIZED VERSION
