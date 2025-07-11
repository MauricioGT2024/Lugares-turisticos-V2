import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block"
          aria-hidden="true"
        >
          <FaExclamationTriangle className="w-16 h-16 text-yellow-400" />
        </motion.div>

        <motion.h1
          className="text-8xl font-bold bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          404
        </motion.h1>

        <div className="space-y-3">
          <h2 className="text-3xl font-normal text-gray-700 dark:text-gray-300">
            Página no encontrada
          </h2>
          <p className="text-lg max-w-md mx-auto text-gray-600 dark:text-gray-400 opacity-80">
            Lo sentimos, la página que estás buscando no existe o fue movida.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
          >
            <FaHome className="mr-2 text-xl" />
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error404;
