import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBed, FaCompass } from "react-icons/fa";

const HospedajeHeader = () => {
  const { colorMode } = useColorMode();

  return (
    <div className="relative text-center space-y-4 mb-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative py-4"
      >
        {/* Iconos decorativos */}
        <FaBed className={`absolute top-0 right-[15%] w-8 h-8 transform -rotate-15 opacity-20 ${
          colorMode === "dark" ? "text-teal-700" : "text-teal-200"
        }`} />
        <FaCompass className={`absolute bottom-0 left-[15%] w-6 h-6 transform rotate-10 opacity-20 ${
          colorMode === "dark" ? "text-teal-700" : "text-teal-200"
        }`} />

        <motion.h1
          className={`text-3xl font-bold tracking-tight ${
            colorMode === "dark" ? "text-white" : "text-gray-700"
          }`}
          transition={{ duration: 0.2 }}
        >
          Encuentra tu Hospedaje Ideal
        </motion.h1>
      </motion.div>

      <motion.p
        className={`text-lg max-w-xl mx-auto ${
          colorMode === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Explora nuestra selección de alojamientos en Catamarca para una estadía perfecta.
      </motion.p>
    </div>
  );
};

export default HospedajeHeader;
