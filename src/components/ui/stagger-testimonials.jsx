import React from "react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    handle: "@childdevcenter",
    text: "NeuroHue revolutionized our pediatric therapy outcomes — smoother workflows, clearer data, happier families.",
  },
  {
    name: "Dr. Michael Chen",
    handle: "@midwesttherapy",
    text: "Finally, a platform that understands clinicians. NeuroHue’s secure analytics make documentation effortless.",
  },
  {
    name: "Dr. James Kim",
    handle: "@neurocarelead",
    text: "Before NeuroHue, outcome tracking was a nightmare. Now, it’s automated, accurate, and actually insightful.",
  },
  {
    name: "Dr. Maria Thompson",
    handle: "@hopetherapy",
    text: "The analytics dashboard gives me clarity I didn’t know I was missing. Every treatment plan feels sharper.",
  },
  {
    name: "Dr. Andre Rodriguez",
    handle: "@pediatricinnovate",
    text: "We’ve cut reporting time by half since switching to NeuroHue. That’s time we can give back to our patients.",
  },
  {
    name: "Dr. Jeremy Park",
    handle: "@therapynetwork",
    text: "SO HAPPY we found NeuroHue. Our clinic saves over 100 hours a month — and we finally love our workflow.",
  },
];

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const columns = chunk(testimonials, 2); // 3 columns, 2 testimonials each

const Testimonials = () => {
  return (
    <div className="relative overflow-hidden bg-cream">
      {/* Scroll area */}
      <div className="relative h-[520px] overflow-hidden">
        {/* Blur edges */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream to-transparent z-10 pointer-events-none" />

        {/* Columns container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`flex flex-col gap-5 animate-scroll-slow${
                colIndex + 1
              }`}
            >
              {[...col, ...col, ...col].map((t, i) => (
                <div
                  key={i}
                  className="bg-cream shadow-md border border-gold/20 rounded-2xl p-6 max-w-[340px] w-full min-h-[180px] mx-auto flex flex-col justify-between"
                >
                  <p className="text-charcoal mb-3 font-sans leading-relaxed text-[15px]">
                    “{t.text}”
                  </p>
                  <div>
                    <p className="font-semibold font-sans text-gold text-[15px]">
                      {t.name}
                    </p>
                    <p className="text-sm font-sans text-charcoal/60">
                      {t.handle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Infinite scroll animations */}
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-slow1 {
          animation: scrollUp 26s linear infinite;
        }
        .animate-scroll-slow2 {
          animation: scrollDown 30s linear infinite;
        }
        .animate-scroll-slow3 {
          animation: scrollUp 34s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
