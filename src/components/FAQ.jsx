import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does NeuroHue improve therapy outcomes?",
    answer:
      "NeuroHue automates outcome tracking, surfaces deep analytics, and helps clinicians personalize each patient's treatment journey.",
  },
  {
    question: "Is my patient data secure?",
    answer:
      "Absolutely. NeuroHue follows HIPAA compliance standards with end-to-end encryption and strict data governance protocols.",
  },
  {
    question: "Can NeuroHue integrate with our existing EMR?",
    answer:
      "Yes. We support API-based integrations with leading EMRs, allowing seamless synchronization of records and progress reports.",
  },
  {
    question: "Do you offer support for onboarding?",
    answer:
      "Our success team provides guided onboarding, staff training, and 24/7 live support to ensure your clinic is up and running quickly.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="relative py-24 px-6 sm:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about how NeuroHue enhances your
            clinical workflows.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left py-6 sm:py-8 transition-colors duration-300 hover:bg-gray-50"
              >
                <span className="text-lg sm:text-xl font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-gray-400 text-2xl font-light select-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 sm:pb-8 text-gray-600 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
