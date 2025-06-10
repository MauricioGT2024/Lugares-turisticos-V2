import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -5, scale: 1.03, transition: { duration: 0.3 } },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.4 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const linkStyles = `
  inline-flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 
  px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 
  translate-y-2 group-hover:translate-y-0 transition-all duration-300 
  hover:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none
`;

const DestinationCard = ({ place }) => (
  <motion.article
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    whileHover="hover"
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 100, damping: 10 }}
    className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all hover:shadow-2xl bg-white/5 backdrop-blur-md"
    aria-label={`Destino: ${place.name}`}
  >
    <div className="aspect-[4/5] overflow-hidden">
      <motion.img
        variants={imageVariants}
        src={place.image}
        alt={`${place.name} - Imagen`}
        className="h-full w-full object-cover transition-transform rounded-t-xl"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
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
      <Link to={place.path} className={linkStyles} aria-label={`Explorar ${place.name}`}>
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
