import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const LocationCard = ({ location, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group shadow-lg"
      onClick={onClick}
    >
      <img
        src={location.imgSrc}
        alt={location.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 text-white">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500 text-sm font-medium shadow-lg backdrop-blur-sm">
          {location.category}
        </span>
        <h2 className="text-2xl font-bold">{location.name}</h2>
        <p className="line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {location.description}
        </p>
      </div>
    </motion.div>
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
