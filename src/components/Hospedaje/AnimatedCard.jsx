import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaHotel, FaLocationArrow } from "react-icons/fa";
import PropTypes from "prop-types";

const locationColors = {
  "Catamarca": "from-blue-500 to-blue-700",
  "Tinogasta": "from-orange-500 to-orange-700",
  "Fiambalá": "from-purple-500 to-purple-700",
  "Antofagasta de la Sierra": "from-emerald-500 to-emerald-700",
};

const AnimatedCard = ({ image, title, description, location, mapUrl }) => {
  const { colorMode } = useColorMode();
  const gradientColor = locationColors[location] || "from-teal-500 to-teal-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl ${
        colorMode === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-xl transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          layoutId={`image-${title}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          colorMode === "dark" ? "bg-gray-700/70" : "bg-white/70"
        } backdrop-blur-sm`}>
          <FaLocationArrow className={`h-3 w-3 bg-gradient-to-r ${gradientColor} bg-clip-text`} />
          <span className="bg-gradient-to-r bg-clip-text text-transparent ${gradientColor}">
            {location}
          </span>
        </span>
      </div>

      <div className="p-6">
        <h3 className={`flex items-center gap-2 text-xl font-semibold ${
          colorMode === "dark" ? "text-white" : "text-gray-900"
        }`}>
          <FaHotel className={`h-5 w-5 bg-gradient-to-r ${gradientColor} bg-clip-text`} />
          {title}
        </h3>

        <p className={`mt-3 text-sm ${
          colorMode === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          {description}
        </p>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${gradientColor} py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90`}
        >
          <FaMapMarkedAlt className="h-4 w-4" />
          Ver Ubicación
        </motion.a>
      </div>
    </motion.div>
  );
};

AnimatedCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  mapUrl: PropTypes.string.isRequired,
};

export default AnimatedCard;
