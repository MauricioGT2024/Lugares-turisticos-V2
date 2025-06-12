import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import PropTypes from "prop-types";

const SplashScreen = ({ onComplete }) => {
  const { colorMode } = useTheme();

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 2 }}
      onAnimationComplete={onComplete}
    >
      {/* Background según tema */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800  bg-gradient-to-b from-white to-gray-100 " />

      {/* Contenedor del logo y texto */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: [0.6, 1.1, 1],
          opacity: 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        <img
          src="/logo.png"
          alt="Logo Catamarca"
          className="w-40 h-40 object-contain mb-6 drop-shadow-lg"
        />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-4xl font-extrabold dark:text-white text-gray-900"
        >
          Catamarca Turismo
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-2 text-lg dark:text-gray-300 text-gray-700"
        >
          Descubriendo lugares mágicos
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

SplashScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default SplashScreen;
