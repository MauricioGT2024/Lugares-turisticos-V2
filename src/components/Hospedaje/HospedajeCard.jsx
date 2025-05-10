import { useColorMode } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaMap } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

const overlayVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
  exit: { opacity: 0 },
};

const HospedajeCard = ({ hospedaje }) => {
  const { colorMode } = useColorMode();
  const [hovered, setHovered] = useState(false);

  const cardBg = colorMode === "dark" ? "bg-gray-900" : "bg-white";
  const textPrimary = colorMode === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = colorMode === "dark" ? "text-gray-400" : "text-gray-600";
  const border = colorMode === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <motion.div
      className={`relative rounded-2xl border ${border} shadow-xl overflow-hidden group cursor-pointer ${cardBg} w-full transition-colors duration-300`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-56">
        <img
          src={hospedaje.image}
          alt={hospedaje.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-98"
          loading="lazy"
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              variants={overlayVariants}
              initial="initial"
              animate="hover"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
              style={{
                background: "rgba(0,0,0,0.80)",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 10,
              }}
            >
              <p className="text-white text-base mb-3">{hospedaje.description}</p>
              <span className="text-teal-300 font-bold text-lg mb-2">{hospedaje.precioARS}</span>
              <a
                href={hospedaje.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow transition"
              >
                <FaMap /> Ver en Google Maps
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`text-xl font-bold mb-1 truncate ${textPrimary}`}>{hospedaje.title}</h3>
        <div className="flex items-center text-sm mb-2 gap-2">
          <FaMapMarkerAlt className="text-teal-500" />
          <span className={`truncate ${textSecondary}`}>{hospedaje.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

HospedajeCard.propTypes = {
  hospedaje: PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    precioARS: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default HospedajeCard;
