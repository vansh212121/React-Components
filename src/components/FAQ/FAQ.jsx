"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(0); // First item open by default

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
    <section className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
            <span className="text-sm font-medium text-gray-700">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our services. Can't find the
            answer you're looking for?{" "}
            <a
              href="#"
              className="text-gray-900 underline underline-offset-4 hover:text-gray-700"
            >
              Please chat to our team
            </a>
            .
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className={`group border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen ? "bg-gray-50" : "bg-white hover:bg-gray-50/50"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 p-6 text-left"
                >
                  <span className="font-medium text-gray-900 text-lg pr-8">
                    {item.q}
                  </span>

                  <div
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <Plus className="text-gray-400" size={20} strokeWidth={2} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-200 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gray-50">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                Still have questions?
              </h3>
              <p className="text-gray-600">
                Can't find the answer you're looking for? Please chat to our
                friendly team.
              </p>
            </div>
            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
