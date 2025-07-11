import React from "react";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const FiambalaHero = ({ badge, title, subtitle, isDark }) => {
  const overlayColor = isDark
    ? "from-gray-950/70 via-gray-900/50 to-transparent"
    : "from-orange-900/70 via-orange-800/50 to-transparent";

  return (
    <section className="relative h-[550px] md:h-[650px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-center mx-4 md:mx-auto max-w-7xl border border-gray-200 dark:border-gray-700">
      {/* Fondo con imagen y efecto de parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <img
          src="/img/Fiambala/Capital.webp" 
          alt="Vista panorámica de Fiambalá, con dunas y paisajes áridos al atardecer"
          className="w-full h-full object-cover object-center brightness-[0.55]"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-linear-to-t ${overlayColor}`}
          aria-hidden="true"
        />
      </motion.div>

      {/* Contenido principal */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-8 md:py-12 lg:py-16 text-white max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Badge */}
        {badge && (
          <motion.span
            className="inline-block px-7 py-2 rounded-full bg-white/25 text-white text-base md:text-lg font-semibold mb-5 uppercase tracking-wider backdrop-blur-sm shadow-xl border border-white/40"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {badge}
          </motion.span>
        )}

        {/* Título */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {title}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl opacity-95 drop-shadow-xl max-w-4xl mx-auto mb-10 leading-relaxed"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {subtitle}
        </motion.p>

        {/* Botón de acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <Button
            color="orange"
            className="bg-linear-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            ripple={true}
            size="lg"
          >
            Explorar Aventura
          </Button>
        </motion.div>
      </div>

      {/* Línea decorativa inferior (opcional, mantener si se desea) */}
      {/* <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-orange-400 to-red-500" /> */}
    </section>
  );
};

export default React.memo(FiambalaHero);
