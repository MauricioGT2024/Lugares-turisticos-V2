import { motion } from "framer-motion";
import React from "react";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Elegant ease-out cubic-bezier
    },
  }),
};

const AntofagastaHero = ({ badge, title, subtitle }) => {
  return (
    <section className="relative h-[200px] md:h-[250px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-center group">
      {/* Background Image with subtle parallax and enhanced overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <img
          src="/img/Antofagasta-de-la-Sierra/Capital.webp"
          alt="Panorámica de Antofagasta de la Sierra"
          className="w-full h-full object-cover object-center brightness-[0.65] group-hover:brightness-[0.7] transition-all duration-500"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" aria-hidden="true" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8 lg:p-12 text-white max-w-5xl mx-auto flex flex-col items-center justify-center">
        <motion.span
          className="inline-block px-4 py-1.5 rounded-full bg-white/25 text-white text-sm md:text-base font-semibold mb-3 uppercase tracking-wider backdrop-blur-sm shadow-xl border border-white/40"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {badge}
        </motion.span>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight drop-shadow-lg text-shadow-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-base md:text-lg lg:text-xl opacity-90 drop-shadow-md max-w-3xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Decorative line - subtle golden accent with hover effect */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
    </section>
  );
};

export default React.memo(AntofagastaHero);