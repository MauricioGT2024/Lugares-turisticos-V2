import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa"; // Ejemplo de un icono

const DestinationCard = ({ title, subtitle, image, description, path }) => {
  return (
    <motion.div
      className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <FaArrowRight className="text-white text-2xl" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
          {subtitle}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
          {description}
        </p>
        <Link
          to={path}
          className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          Descubrir más
          <FaArrowRight className="ml-2 text-sm" />
        </Link>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
