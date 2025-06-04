import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -10, scale: 1.02, transition: { duration: 0.3 } },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.07, transition: { duration: 0.4 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const linkStyles = `
  inline-flex items-center gap-2 text-white bg-white/20 backdrop-blur-md 
  px-5 py-3 rounded-full opacity-0 group-hover:opacity-100 
  translate-y-2 group-hover:translate-y-0 transition-all duration-300 
  hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none
`;

const DestinationCard = ({ place }) => (
  <motion.article
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    whileHover="hover"
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 100, damping: 10 }}
    className="group relative overflow-hidden rounded-2xl shadow-xl transform transition-all hover:shadow-2xl"
    aria-label={`Destino: ${place.name}`}
  >
    <div className="aspect-[4/5] overflow-hidden">
      <motion.img
        variants={imageVariants}
        src={place.image}
        alt={`${place.name} - Imagen`}
        className="h-full w-full object-cover transition-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </div>
    <motion.div
      className="absolute bottom-0 p-6 w-full"
      variants={contentVariants}
    >
      <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg">
        {place.name}
      </h3>
      <p className="mb-4 text-gray-200 line-clamp-2 drop-shadow-sm">
        {place.description}
      </p>
      <Link to={place.path} className={linkStyles}>
        <span>Explorar</span>
        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  </motion.article>
);

DestinationCard.propTypes = {
  place: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

DestinationCard.displayName = "DestinationCard";

export default memo(DestinationCard);
