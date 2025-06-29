import { motion } from "framer-motion";
import React from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CatamarcaHero = ({ badge, title, subtitle, isDark = false }) => {
  // Gradientes con colores RGBA para mejor soporte cross-browser
  const gradientClass = isDark
    ? "bg-gradient-to-r from-[rgba(10,10,10,0.8)] via-[rgba(10,10,10,0.6)] to-transparent"
    : "bg-gradient-to-r from-[rgba(0,31,63,0.8)] via-[rgba(0,51,102,0.4)] to-transparent";

  return (
    <section
      className="relative h-[550px] md:h-[650px] lg:h-[750px] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-center"
      aria-label="Hero de Catamarca"
      role="region"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src="/hero-catamarca.webp"
          alt="Vista panorámica de Catamarca"
          className="w-full h-full object-cover object-center brightness-75"
          loading="lazy"
        />
        {/* Overlay con gradiente */}
        <div className={`absolute inset-0 ${gradientClass} pointer-events-none`} />
      </div>

      {/* Contenido */}
      <motion.div
        className="relative z-10 px-6 md:px-12 lg:px-16 max-w-5xl mx-auto flex flex-col items-center justify-center text-white"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.span
          className="inline-block px-6 py-2 rounded-full bg-white/20 text-white text-sm md:text-base font-semibold mb-4 uppercase tracking-wide backdrop-blur-md shadow-lg border border-white/30"
          variants={fadeUpVariants}
        >
          {badge}
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg"
          variants={fadeUpVariants}
          transition={{ delay: 0.15 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-3xl opacity-90 drop-shadow-md"
          variants={fadeUpVariants}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default React.memo(CatamarcaHero);
