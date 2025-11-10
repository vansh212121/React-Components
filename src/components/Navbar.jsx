import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "./ui/AnimatedButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    top: {
      scale: 1,
      borderRadius: 0,
      boxShadow: "none",
      transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
    },
    scrolled: {
      scale: 0.985,
      borderRadius: 16,
      boxShadow: "none",
      transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const overlayVariants = {
    top: {
      backgroundColor: "rgba(255,255,255,0)",
      borderColor: "rgba(255,255,255,0)",
      borderWidth: 0,
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderColor: "rgba(255, 255, 255, 0.18)",
      backdropFilter: "blur(18px) saturate(180%)",
      WebkitBackdropFilter: "blur(18px) saturate(180%)",
    },
  };

  const contentVariants = {
    top: { gap: "9.5rem", transition: { duration: 0.25 } },
    scrolled: { gap: "2rem", transition: { duration: 0.25 } },
  };

  return (
    <div className="fixed p-4 top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        animate={scrolled ? "scrolled" : "top"}
        variants={navVariants}
        className={cn(
          "relative pointer-events-auto w-full flex justify-center transition-all duration-200 max-w-6xl"
        )}
      >
        <motion.div
          variants={overlayVariants}
          animate={scrolled ? "scrolled" : "top"}
          className="flex items-center justify-center px-1.5 py-1.5 rounded-full transition-none"
        >
          <motion.div
            variants={contentVariants}
            animate={scrolled ? "scrolled" : "top"}
            className="flex items-center justify-center"
          >
            {/* Logo */}
            <div className="flex ml-2 items-center gap-2">
              <motion.div
                className="w-5 h-5 rounded-full bg-gray-900"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              />
              <span className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                BrandName
              </span>
            </div>

            {/* Links */}
            <ul className="hidden md:flex items-center gap-5 text-sm text-gray-900 font-medium">
              {["Features", "Pricing", "About", "Blog", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="relative hover:text-black text-lg font-normal transition-all duration-200 px-2 py-1 rounded-full group"
                    >
                      <span className="relative z-10 tracking-wide">
                        {link}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-250 opacity-0 group-hover:opacity-20 -z-10 shadow-sm" />
                    </a>
                  </li>
                )
              )}
            </ul>

            {/* CTA */}
            <div className="relative">
              <AnimatedButton
                size="lg"
                className="group rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                Get Started
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      </motion.nav>
    </div>
  );
}
