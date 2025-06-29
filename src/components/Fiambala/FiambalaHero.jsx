import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const FiambalaHero = ({ badge, title, subtitle, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} 
      className="text-center space-y-8"
    >
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-4 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white dark:from-orange-600 dark:to-red-600"
      >
        {badge}
      </motion.span>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
        {title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

FiambalaHero.propTypes = {
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default FiambalaHero;
