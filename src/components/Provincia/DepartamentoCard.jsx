import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const gradientConfigs = {
  "Antofagasta de la Sierra": {
    gradient: "from-amber-400 via-orange-400 to-rose-500",
    hoverGradient: "from-amber-500 via-orange-500 to-rose-600",
    textGradient: "from-amber-600 to-orange-600",
    description: "Desiertos y Salares",
  },
  "Tinogasta": {
    gradient: "from-violet-400 via-purple-400 to-fuchsia-500",
    hoverGradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    textGradient: "from-violet-600 to-purple-600",
    description: "Viñedos y Montañas",
  },
  "Fiambalá": {
    gradient: "from-rose-400 via-pink-400 to-red-500",
    hoverGradient: "from-rose-500 via-pink-500 to-red-600",
    textGradient: "from-rose-600 to-pink-600",
    description: "Termas y Aventura",
  },
  "Catamarca Capital": {
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    hoverGradient: "from-emerald-500 via-teal-500 to-cyan-600",
    textGradient: "from-emerald-600 to-teal-600",
    description: "Historia y Cultura",
  },
  default: {
    gradient: "from-sky-400 via-blue-400 to-indigo-500",
    hoverGradient: "from-sky-500 via-blue-500 to-indigo-600",
    textGradient: "from-sky-600 to-blue-600",
    description: "Explora el Destino",
  }
};

const DepartamentoCard = memo(({ loc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode } = useColorMode();
  const config = gradientConfigs[loc.name] || gradientConfigs.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, type: "spring" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link 
        to={loc.path}
        className={`group block h-full rounded-xl overflow-hidden ${
          colorMode === 'light' ? 'bg-white' : 'bg-gray-800'
        } shadow-lg transition-transform duration-300 hover:shadow-2xl`}
      >
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={loc.image}
            alt={loc.name}
            className="w-full h-full object-cover transition-transform"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          {/* Overlay gradiente animado */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-t ${config.gradient}`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isHovered ? 0.7 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badge flotante con degradado */}
          <div className="absolute top-4 right-4">
            <motion.span 
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${config.gradient} shadow-lg backdrop-blur-sm`}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {config.description}
            </motion.span>
          </div>

          {/* Contenido que aparece en hover */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mb-3 text-3xl font-bold drop-shadow-lg">{loc.name}</h3>
            <p className="mb-4 text-white/90 drop-shadow-sm">{loc.description}</p>
            <motion.button
              className="mt-4 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 text-white font-medium drop-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar
            </motion.button>
          </motion.div>
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

export default DepartamentoCard;
