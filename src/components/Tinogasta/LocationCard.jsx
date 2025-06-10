import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const LocationCard = ({ location, onClick }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group shadow-lg"
      onClick={onClick}
      role="button"
      aria-label={`Ver detalles de ${location.name}`}
    >
      <figure className="h-full">
        <img
          src={location.imgSrc}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </figure>

      <footer className="absolute bottom-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 text-white">
        <span 
          className="inline-block px-4 py-1.5 rounded-full bg-purple-500 text-sm font-medium shadow-lg backdrop-blur-sm"
          role="tag"
        >
          {location.category}
        </span>
        <h2 className="text-2xl font-bold mt-2">{location.name}</h2>
        <p 
          className="line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
          aria-label={`Descripción de ${location.name}`}
        >
          {location.description}
        </p>
      </footer>
    </motion.article>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LocationCard;
