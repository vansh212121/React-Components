"use client";

import { useState } from "react";
import { Plus, Mail, MessageCircle } from "lucide-react";

export default function SaaSFAQWithSidebar() {
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
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  Support
                </span>
              </div>

              <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
                Frequently asked questions
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                Can't find what you're looking for? Reach out to our support
                team.
              </p>

              {/* Contact Options */}
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <MessageCircle size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      Live chat
                    </div>
                    <div className="text-xs text-gray-500">
                      Available 9am-5pm
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Mail size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      Email us
                    </div>
                    <div className="text-xs text-gray-500">
                      hello@example.com
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - FAQ */}
          <div className="lg:col-span-8">
            <div className="space-y-1">
              {faqs.map((item, i) => {
                const isOpen = open === i;

                return (
                  <div
                    key={i}
                    className={`border border-gray-200 rounded-xl overflow-hidden transition-all ${
                      isOpen
                        ? "bg-white shadow-sm"
                        : "bg-white hover:bg-gray-50/50"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 p-5 text-left"
                    >
                      <span className="font-medium text-gray-900 pt-0.5">
                        {item.q}
                      </span>

                      <div
                        className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-200 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        <Plus
                          className="text-gray-400"
                          size={18}
                          strokeWidth={2}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-200 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed border-t border-gray-100 pt-4">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
