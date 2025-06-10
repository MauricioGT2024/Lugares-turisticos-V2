import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TinogastaHero = ({ badge, title, subtitle, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-10"
    >
      <motion.span
        whileHover={{ rotate: 1 }}
        className="inline-block px-5 py-2 rounded-xl text-sm font-semibold bg-purple-600 text-white uppercase tracking-wide shadow-lg"
      >
        {badge}
      </motion.span>
      <motion.h1
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="text-7xl font-extrabold text-purple-600 dark:text-purple-400"
      >
        {title}
      </motion.h1>
      <p className={`text-xl max-w-4xl mx-auto leading-relaxed font-light ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {subtitle}
      </p>
    </motion.div>
  );
};

TinogastaHero.propTypes = {
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default TinogastaHero;
