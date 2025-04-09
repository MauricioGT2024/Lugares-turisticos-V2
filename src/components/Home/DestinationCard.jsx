import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -10 },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0 },
};

const linkStyles = "inline-flex items-center space-x-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none";

const DestinationCard = memo(({ place }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      role="article"
      aria-label={`Destino: ${place.name}`}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <motion.img
          variants={imageVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      </div>

      <motion.div 
        className="absolute bottom-0 p-6 w-full"
        variants={contentVariants}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-2xl font-bold text-white mb-2 text-shadow">{place.name}</h3>
        <p className="text-gray-200 line-clamp-2 mb-4">
          {place.description}
        </p>
        <Link
          to={place.path}
          className={linkStyles}
          aria-label={`Explorar ${place.name}`}
        >
          <span>Explorar</span>
          <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
});

DestinationCard.propTypes = {
  place: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard;
