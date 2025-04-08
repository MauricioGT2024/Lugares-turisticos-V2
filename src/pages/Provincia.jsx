import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { departamentos } from "../data/departamentos";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const gradientConfigs = {
  "Antofagasta de la Sierra": {
    gradient: "from-amber-400 via-orange-400 to-rose-500",
    hoverGradient: "from-amber-500 via-orange-500 to-rose-600",
    textGradient: "from-amber-600 to-orange-600",
    description: "Desiertos y Salares"
  },
  "Tinogasta": {
    gradient: "from-violet-400 via-purple-400 to-fuchsia-500",
    hoverGradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    textGradient: "from-violet-600 to-purple-600",
    description: "Viñedos y Montañas"
  },
  "Fiambalá": {
    gradient: "from-rose-400 via-pink-400 to-red-500",
    hoverGradient: "from-rose-500 via-pink-500 to-red-600",
    textGradient: "from-rose-600 to-pink-600",
    description: "Termas y Aventura"
  },
  "Catamarca Capital": {
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    hoverGradient: "from-emerald-500 via-teal-500 to-cyan-600",
    textGradient: "from-emerald-600 to-teal-600",
    description: "Historia y Cultura"
  },
  default: {
    gradient: "from-sky-400 via-blue-400 to-indigo-500",
    hoverGradient: "from-sky-500 via-blue-500 to-indigo-600",
    textGradient: "from-sky-600 to-blue-600",
    description: "Explora el Destino"
  }
};

const DepartamentoCard = memo(({ loc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode } = useColorMode();
  const config = gradientConfigs[loc.name] || gradientConfigs.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, type: "spring" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link 
        to={loc.path}
        className={`block h-full rounded-xl overflow-hidden ${
          colorMode === 'light' ? 'bg-white' : 'bg-gray-800'
        } shadow-lg transition-all duration-300 hover:shadow-2xl`}
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={loc.image}
            alt={loc.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${config.gradient} opacity-50`} />
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${config.gradient} shadow-lg backdrop-blur-sm`}>
              {config.description}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className={`text-2xl font-bold font-mono bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent transition-transform duration-300 hover:translate-x-1`}>
            {loc.name}
          </h3>
          <p className={`${
            colorMode === 'light' ? 'text-gray-600' : 'text-gray-300'
          } line-clamp-3 leading-relaxed`}>
            {loc.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

DepartamentoCard.displayName = "DepartamentoCard";

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

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
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-pink-500">
            Descubre Catamarca
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold font-mono bg-gradient-to-r from-green-400 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
            Explora los Departamentos
          </h1>
          
          <p className={`max-w-3xl mx-auto text-xl italic ${
            colorMode === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Descubre la diversidad y belleza de cada rincón de esta hermosa provincia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
