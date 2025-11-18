"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function PremiumSaaSFAQ() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "What services do you offer?",
      a: "We offer a full range of dental services, including cleanings, checkups, fillings, crowns, bridges, root canals, cosmetic procedures, and more.",
    },
    {
      q: "How often should I come in for a cleaning?",
      a: "Most patients benefit from a cleaning every 6 months, depending on oral health.",
    },
    {
      q: "Do you accept my dental insurance?",
      a: "Yes! We work with most major insurance providers and help verify coverage.",
    },
    {
      q: "What if I have a dental emergency?",
      a: "We provide same-day appointments for emergencies such as pain, swelling, or broken teeth.",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">FAQ</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently asked questions
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className={`bg-white border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-gray-300 shadow-lg shadow-gray-200/50"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 p-6 text-left"
                >
                  <span
                    className={`font-medium text-[15px] transition-colors ${
                      isOpen ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {item.q}
                  </span>

                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-gray-900 rotate-45" : "bg-gray-100 rotate-0"
                    }`}
                  >
                    <Plus
                      className={`transition-colors ${
                        isOpen ? "text-white" : "text-gray-600"
                      }`}
                      size={16}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-[15px] text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-white rounded-2xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please chat to our
            friendly team.
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Get in touch
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
