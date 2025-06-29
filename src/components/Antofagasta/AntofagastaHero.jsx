import { motion } from "framer-motion";
import React from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AntofagastaHero = ({ badge, title, subtitle }) => {
  return (
    <section
      className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 ease-in-out
                 bg-gradient-to-br from-yellow-500 to-orange-600 dark:from-yellow-700 dark:to-orange-800"
      aria-label="Hero section for Antofagasta"
    >
      {/* Optional: Background image with subtle overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/public/hero-catamarca.webp" // Assuming a generic hero image or replace with Antofagasta specific
          alt="Landscape of Antofagasta de la Sierra"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content container */}
      <div className="relative z-10 py-20 px-6 md:py-28 md:px-12 lg:px-20 max-w-7xl mx-auto text-center text-white">
        <motion.span
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-block px-5 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-5 uppercase tracking-wide backdrop-blur-sm shadow-md"
        >
          {badge}
        </motion.span>

        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Subtle decorative elements for depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full mix-blend-overlay transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full mix-blend-overlay transform translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
};

export default React.memo(AntofagastaHero);
