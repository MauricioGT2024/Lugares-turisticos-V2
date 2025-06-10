import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const scaleFadeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const CatamarcaHero = ({ badge, title, subtitle, isDark }) => {
  const gradientClass = isDark
    ? "bg-gradient-to-r from-blue-700/80 via-blue-600/70 to-transparent"
    : "bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent";

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      aria-label="Hero section"
    >
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/hero-catamarca.webp"
          alt="San Fernando del Valle de Catamarca"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className={`absolute inset-0 ${gradientClass}`} />
      </div>

      {/* Content container */}
      <div className="relative py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.span
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
        >
          {badge}
        </motion.span>

        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-blue-50 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Decorative circles */}
      <motion.div
        variants={scaleFadeVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        variants={scaleFadeVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-1/2 -mb-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};

export default CatamarcaHero;
