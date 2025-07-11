import { motion } from "framer-motion";
import React from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CatamarcaHero = ({ badge, title, subtitle }) => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
        >
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(CatamarcaHero);
