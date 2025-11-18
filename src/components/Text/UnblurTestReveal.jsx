"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollUnblurText({
  text = "This is a smooth scroll-based unblur text reveal.",
  colorFrom = "#ffffff",
  colorTo = "#000000",
  blurFrom = 10,
  blurTo = 0,
  opacityFrom = 0.5,
  opacityTo = 1,
  className = "text-4xl md:text-6xl font-bold leading-tight",
  stagger = 0.03, // Time delay between each word (lower = faster reveal)
  start = "top 70%", // Starts earlier - more responsive
  end = "bottom 30%", // Larger animation window
  scrub = 0.5, // Adds slight smoothing (use true for instant, or 0-3 for delays)
}) {
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    const words = el.querySelectorAll(".word");

    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          filter: `blur(${blurFrom}px)`,
          opacity: opacityFrom,
          color: colorFrom,
          y:10
        },
        {
          filter: `blur(${blurTo}px)`,
          opacity: opacityTo,
          color: colorTo,
          ease: "none",
          stagger: stagger, // Sequential word reveal
          scrollTrigger: {
            trigger: el,
            start: start,
            end: end,
            scrub: scrub,
            // markers: true, // 👈 Uncomment to debug scroll positions
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [blurFrom, blurTo, opacityFrom, opacityTo, colorFrom, colorTo, stagger, start, end, scrub]);

  // Split text into individual words
  const words = text.split(" ");

  return (
    <div ref={wrapperRef} className={className}>
      {words.map((word, index) => (
        <span key={index} className="word inline-block">
          {word}
          {/* Add space between words */}
          {index < words.length - 1 && " "}
        </span>
      ))}
    </div>
  );
}
