import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { departamentos } from "../data/departamentos";
import { useColorMode } from "@chakra-ui/react";
import DepartamentoCard from "../components/Provincia/DepartamentoCard"; // Asegurate de ajustar el path si es necesario

const Provincia = memo(() => {
  const { colorMode } = useColorMode();

  return (
    <div className={`min-h-screen py-12 ${
      colorMode === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16 space-y-6"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-pink-500 shadow-md">
            Descubre Catamarca
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold font-mono bg-gradient-to-r from-green-400 via-yellow-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
            Explora los Departamentos
          </h1>
          
          <p className={`max-w-3xl mx-auto text-xl italic ${
            colorMode === 'light' ? 'text-gray-600' : 'text-gray-300'
          } drop-shadow-md`}>
            Descubre la diversidad y belleza de cada rincón de esta hermosa provincia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="sync">
            {departamentos.map((loc) => (
              <DepartamentoCard key={loc.id} loc={loc} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

Provincia.displayName = "Provincia";

export default Provincia;
