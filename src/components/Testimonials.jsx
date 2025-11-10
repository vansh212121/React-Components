import { motion } from "framer-motion";
import Testimonials from "@/components/ui/stagger-testimonials";

const TestimonialsSection = () => {
  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-16 px-6 overflow-hidden bg-cream"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6 transition-transform"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-sm font-medium text-gold font-sans">
              Client Success
            </span>
          </motion.div>

          {/* Headings */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 text-charcoal font-serif"
          >
            <span className="bg-gradient-hue bg-clip-text text-transparent">
              Trusted
            </span>
          </motion.h2>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 text-charcoal font-serif"
          >
            By Healthcare Leaders
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-charcoal/70 text-lg max-w-2xl mx-auto font-sans"
          >
            Real results from healthcare innovators who trust our platform to
            deliver measurable outcomes.
          </motion.p>
        </motion.div>

        {/* Infinite Scroll Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative">
            {/* integrated version */}
            <Testimonials />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
