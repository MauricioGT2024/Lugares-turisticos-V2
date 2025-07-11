import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15, 
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94], // Elegant ease-out cubic-bezier
    },
  }),
};

const TinogastaHero = ({ badge, title, subtitle }) => {
  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl flex items-center justify-center text-center">
      {/* Background Image with subtle parallax and enhanced overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="/img/Tinogasta/Capital.webp"
          alt="Panorámica de Tinogasta, con paisajes desérticos y montañas"
          className="w-full h-full object-cover object-center brightness-[0.7]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" aria-hidden="true" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8 lg:p-12 text-white max-w-5xl mx-auto flex flex-col items-center justify-center">
        <motion.span
          className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm md:text-base font-semibold mb-2 uppercase tracking-wider backdrop-blur-md shadow-lg border border-white/30"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {badge}
        </motion.span>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 leading-tight drop-shadow-2xl"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-md md:text-lg lg:text-xl opacity-95 drop-shadow-xl max-w-3xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Decorative line - subtle golden accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-yellow-500 to-amber-600" />
    </section>
  );
};

export default React.memo(TinogastaHero);
