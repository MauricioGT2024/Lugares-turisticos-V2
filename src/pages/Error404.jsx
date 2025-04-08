import { useColorMode } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const Error404 = () => {
  const { colorMode } = useColorMode();

  return (
    <div className={`
      min-h-screen flex items-center justify-center px-4 
      ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="inline-block"
        >
          <FaExclamationTriangle className="w-16 h-16 text-yellow-400" />
        </motion.div>

        <motion.h1
          className={`
            text-8xl font-bold bg-gradient-to-r 
            ${colorMode === 'dark' 
              ? 'from-teal-200 to-blue-400' 
              : 'from-teal-400 to-blue-500'} 
            bg-clip-text text-transparent
          `}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          404
        </motion.h1>

        <div className="space-y-3">
          <h2 className={`text-3xl font-normal
            ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Página no encontrada
          </h2>

          <p className={`
            text-lg max-w-md mx-auto opacity-80
            ${colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
            Te sugerimos volver al inicio.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ReactRouterLink
            to="/"
            className={`
              inline-flex items-center px-6 py-3 rounded-lg
              font-medium text-white shadow-lg
              transition-all duration-300 ease-out
              transform hover:-translate-y-1
              bg-gradient-to-r
              ${colorMode === 'dark' 
                ? 'from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600' 
                : 'from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700'}
            `}
          >
            <FaHome className="mr-2 text-xl" />
            Volver al inicio
          </ReactRouterLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error404;
