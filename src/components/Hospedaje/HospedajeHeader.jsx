import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBed, FaCompass, FaHotel } from "react-icons/fa";

const HospedajeHeader = () => {
  const { colorMode } = useColorMode();
  
  return (
    <header className="relative py-16 sm:py-24">
      {/* Efecto de fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 
                ${colorMode === "dark" ? "bg-teal-900" : "bg-teal-300"}`}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div 
            className="flex justify-center gap-4 mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <FaBed className={`w-8 h-8 ${colorMode === "dark" ? "text-teal-400" : "text-teal-600"}`} />
            <FaHotel className={`w-8 h-8 ${colorMode === "dark" ? "text-blue-400" : "text-blue-600"}`} />
            <FaCompass className={`w-8 h-8 ${colorMode === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
          </motion.div>

          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${
            colorMode === "dark" ? "text-white" : "text-gray-900"}`}>
            <span className="block">Encuentra el Mejor</span>
            <span className={`block ${
              colorMode === "dark" ? "text-teal-400" : "text-teal-600"
            }`}>Hospedaje para Ti</span>
          </h1>

          <p className={`mt-6 max-w-2xl mx-auto text-lg ${
            colorMode === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Explora nuestra selección de alojamientos premium en Catamarca. 
            Desde hoteles de lujo hasta acogedoras posadas familiares.
          </p>

          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`px-4 py-2 rounded-full ${
              colorMode === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <span className={colorMode === "dark" ? "text-teal-400" : "text-teal-600"}>
                +10 Hoteles
              </span>
            </div>
            <div className={`px-4 py-2 rounded-full ${
              colorMode === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <span className={colorMode === "dark" ? "text-blue-400" : "text-blue-600"}>
                4 Ubicaciones
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default HospedajeHeader;
