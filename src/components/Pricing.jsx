
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Badge } from "./ui/badge";

// export default function PricingSection() {
//   const [isAnnual, setIsAnnual] = useState(true);

//   const plans = [
//     {
//       name: "Dreelio Basic",
//       price: "Free",
//       description: "For solo use with light needs.",
//       features: [
//         "Unlimited projects",
//         "Unlimited clients",
//         "Time tracking",
//         "CRM",
//         "iOS & Android app",
//       ],
//       button: "Try Dreelio free",
//       highlight: false,
//       buttonStyle:
//         "bg-[#f6f1ed] hover:bg-[#efe8e3] text-gray-900 font-medium shadow-sm hover:shadow-md",
//     },
//     {
//       name: "Dreelio Premium",
//       price: isAnnual ? "$189/mo" : "$229/mo",
//       badge: "Save 20%",
//       description: "For pro use with light needs.",
//       features: [
//         "Everything in Basic",
//         "Invoices & payments",
//         "Expense tracking",
//         "Income tracking",
//         "Scheduling",
//       ],
//       button: "Get started",
//       highlight: true,
//       buttonStyle:
//         "bg-gray-900 text-white hover:bg-gray-800 font-medium shadow-lg hover:shadow-xl",
//     },
//     {
//       name: "Dreelio Enterprise",
//       price: "Flexible",
//       description: "For team use with light needs.",
//       features: [
//         "Everything in Premium",
//         "Custom data import",
//         "Advanced onboarding",
//         "Hubspot integration",
//         "Timesheets",
//       ],
//       button: "Contact sales",
//       highlight: false,
//       buttonStyle:
//         "bg-[#f6f1ed] hover:bg-[#efe8e3] text-gray-900 font-medium shadow-sm hover:shadow-md",
//     },
//   ];

//   return (
//     <section className="py-20 bg-[#f8f9fc]">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-12"
//         >
//           <p className="uppercase text-sm font-semibold tracking-wider text-gray-400 mb-3">
//             Pricing
//           </p>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
//             Simple plans for serious work
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto text-lg">
//             Choose a plan that fits your workflow and scale easily with your team.
//           </p>
//         </motion.div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
//           {plans.map((plan, i) => (
//             <motion.div
//               key={plan.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 duration: 0.5,
//                 delay: i * 0.1,
//                 ease: [0.22, 0.9, 0.1, 1],
//               }}
//               className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-300 shadow-md hover:shadow-xl ${
//                 plan.highlight
//                   ? "bg-gradient-to-b from-blue-50 to-white border-2 border-blue-400 md:scale-[1.05]"
//                   : "bg-white border border-gray-100 md:scale-[0.96]"
//               }`}
//             >
//               <div
//                 className={`flex flex-col flex-1 ${
//                   plan.highlight ? "p-7 pb-4" : "p-5 pb-3"
//                 }`}
//               >
//                 {/* Toggle for middle card */}
//                 {plan.highlight && (
//                   <div className="flex justify-center mb-6 -mt-1">
//                     <div className="inline-flex bg-white border border-gray-200 rounded-full shadow-sm p-1">
//                       <button
//                         onClick={() => setIsAnnual(true)}
//                         className={`px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
//                           isAnnual
//                             ? "bg-gray-900 text-white"
//                             : "text-gray-600 hover:text-gray-900"
//                         }`}
//                       >
//                         Annually
//                       </button>
//                       <button
//                         onClick={() => setIsAnnual(false)}
//                         className={`px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
//                           !isAnnual
//                             ? "bg-gray-900 text-white"
//                             : "text-gray-600 hover:text-gray-900"
//                         }`}
//                       >
//                         Monthly
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Title */}
//                 <div className="mb-3 flex items-center justify-between">
//                   <h3
//                     className={`font-semibold text-gray-900 ${
//                       plan.highlight ? "text-lg" : "text-base"
//                     }`}
//                   >
//                     {plan.name}
//                   </h3>
//                   {plan.badge && (
//                     <Badge className="text-xs font-semibold text-green-700 bg-green-50 border-green-200 rounded-full px-2 py-0.5">
//                       {plan.badge}
//                     </Badge>
//                   )}
//                 </div>

//                 {/* Price */}
//                 <div className="mb-3">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={plan.price}
//                       initial={{ opacity: 0, y: 6 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -6 }}
//                       transition={{ duration: 0.25 }}
//                       className={`font-bold text-gray-900 ${
//                         plan.highlight
//                           ? "text-[1.875rem] md:text-[2rem]"
//                           : "text-[1.5rem] md:text-[1.625rem]"
//                       }`}
//                     >
//                       {plan.price}
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-500 mb-4 text-sm leading-relaxed">
//                   {plan.description}
//                 </p>

//                 {/* Features */}
//                 <ul className="text-gray-700 text-sm space-y-2 mb-4 flex-1">
//                   {plan.features.map((feature, idx) => (
//                     <li key={idx} className="flex items-start gap-2">
//                       <span className="text-green-500 mt-0.5 text-xs">✓</span>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Button anchored at bottom */}
//               <div className="p-5 pt-0 mt-auto">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`w-full rounded-full transition-all duration-300 font-medium text-sm ${
//                     plan.highlight ? "py-3.5" : "py-3"
//                   } ${plan.buttonStyle}`}
//                 >
//                   {plan.button}
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom note */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-8 text-center"
//         >
//           <p className="text-gray-400 text-sm">
//             All plans include 14-day free trial • No credit card required
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Dreelio Basic",
      price: "Free",
      description: "For solo use with light needs.",
      features: [
        "Unlimited projects",
        "Unlimited clients",
        "Time tracking",
        "CRM",
        "iOS & Android app",
      ],
      button: "Try Dreelio free",
      highlight: false,
      buttonStyle:
        "bg-[#f6f1ed] hover:bg-[#efe8e3] text-gray-900 font-medium shadow-sm hover:shadow-md",
    },
    {
      name: "Dreelio Premium",
      price: isAnnual ? "$189/mo" : "$229/mo",
      badge: "Save 20%",
      description: "For pro use with light needs.",
      features: [
        "Everything in Basic",
        "Invoices & payments",
        "Expense tracking",
        "Income tracking",
        "Scheduling",
      ],
      button: "Get started",
      highlight: true,
      buttonStyle:
        "bg-gray-900 text-white hover:bg-gray-800 font-medium shadow-lg hover:shadow-xl",
    },
    {
      name: "Dreelio Enterprise",
      price: "Flexible",
      description: "For team use with light needs.",
      features: [
        "Everything in Premium",
        "Custom data import",
        "Advanced onboarding",
        "Hubspot integration",
        "Timesheets",
      ],
      button: "Contact sales",
      highlight: false,
      buttonStyle:
        "bg-[#f6f1ed] hover:bg-[#efe8e3] text-gray-900 font-medium shadow-sm hover:shadow-md",
    },
  ];

  return (
    <section className="py-20 bg-[#f8f9fc]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="uppercase text-sm font-semibold tracking-wider text-gray-400 mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Simple plans for serious work
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Choose a plan that fits your workflow and scale easily with your team.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 0.9, 0.1, 1],
              }}
              className={`relative flex flex-col justify-between text-left rounded-xl border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-blue-50 to-white border-blue-200 shadow-xl md:scale-[1.08] md:-translate-y-5 min-h-[580px]"
                  : "bg-white border-gray-100 hover:border-gray-200 md:scale-[0.93] min-h-[440px]"
              }`}
            >
              <div
                className={`flex flex-col h-full ${
                  plan.highlight ? "p-7" : "p-5"
                }`}
              >
                {/* Toggle inside middle card */}
                {plan.highlight && (
                  <div className="flex justify-center mb-6 -mt-1">
                    <div className="inline-flex bg-white border border-gray-200 rounded-full shadow-sm p-1">
                      <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                          isAnnual
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Annually
                      </button>
                      <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                          !isAnnual
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                )}

                {/* Title Row */}
                <div className="mb-3 flex items-center justify-between">
                  <h3
                    className={`font-semibold text-gray-900 ${
                      plan.highlight ? "text-lg" : "text-base"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <Badge className="text-xs font-semibold text-green-700 bg-green-50 border-green-200 rounded-full px-2 py-0.5">
                      {plan.badge}
                    </Badge>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={plan.price}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className={`font-bold text-gray-900 ${
                        plan.highlight
                          ? "text-[1.875rem] md:text-[2.125rem]"
                          : "text-[1.5rem] md:text-[1.75rem]"
                      }`}
                    >
                      {plan.price}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Description */}
                <p className="text-gray-500 mb-3 text-sm leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="text-gray-700 text-sm space-y-2.5 mb-5 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 text-xs">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full rounded-full transition-all duration-300 font-medium text-sm ${
                      plan.highlight ? "py-3.5 mt-2" : "py-3 mt-1"
                    } ${plan.buttonStyle}`}
                  >
                    {plan.button}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            All plans include 14-day free trial • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
