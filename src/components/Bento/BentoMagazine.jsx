"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function BentoMagazine({ images = [], className = "" }) {
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight" && activeIndex < images.length - 1) {
        setActiveIndex(activeIndex + 1);
        setActive(images[activeIndex + 1]);
      }
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        setActive(images[activeIndex - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, activeIndex, images]);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "unset";
  }, [active]);

  return (
    <>
      <div className={`w-full max-w-7xl mx-auto p-4 ${className}`}>
        <div className="hidden md:grid grid-cols-8 auto-rows-[140px] gap-4">
          {/* Image 1 - Hero full width top */}
          <div
            onClick={() => {
              setActive(images[0]);
              setActiveIndex(0);
            }}
            className="col-span-8 row-span-2 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[0]?.src}
              alt={images[0]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 2 - Medium left */}
          <div
            onClick={() => {
              setActive(images[1]);
              setActiveIndex(1);
            }}
            className="col-span-3 row-span-2 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[1]?.src}
              alt={images[1]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 3 - Small top right */}
          <div
            onClick={() => {
              setActive(images[2]);
              setActiveIndex(2);
            }}
            className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[2]?.src}
              alt={images[2]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 4 - Tall right */}
          <div
            onClick={() => {
              setActive(images[3]);
              setActiveIndex(3);
            }}
            className="col-span-3 row-span-3 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[3]?.src}
              alt={images[3]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 5 - Small middle */}
          <div
            onClick={() => {
              setActive(images[4]);
              setActiveIndex(4);
            }}
            className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[4]?.src}
              alt={images[4]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 6 - Wide bottom left */}
          <div
            onClick={() => {
              setActive(images[5]);
              setActiveIndex(5);
            }}
            className="col-span-3 row-span-1 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[5]?.src}
              alt={images[5]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 7 - Small bottom */}
          <div
            onClick={() => {
              setActive(images[6]);
              setActiveIndex(6);
            }}
            className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer group rounded-2xl"
          >
            <img
              src={images[6]?.src}
              alt={images[6]?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => {
                setActive(img);
                setActiveIndex(i);
              }}
              className="relative overflow-hidden cursor-pointer group rounded-xl aspect-square"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
            >
              <X size={24} />
            </button>
            {activeIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(activeIndex - 1);
                  setActive(images[activeIndex - 1]);
                }}
                className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
              >
                <ChevronLeft size={28} />
              </button>
            )}
            {activeIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(activeIndex + 1);
                  setActive(images[activeIndex + 1]);
                }}
                className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
              >
                <ChevronRight size={28} />
              </button>
            )}
            <motion.img
              key={activeIndex}
              src={active.src}
              alt={active.title}
              className="max-w-[90%] max-h-[90vh] object-contain rounded-xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
