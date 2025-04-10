import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ImageHoverCard = ({ image, title, description, category, onClick }) => {

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Contenido */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
      >
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500 text-white text-sm font-medium shadow-lg backdrop-blur-sm">
            {category}
          </span>

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <p className="text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

ImageHoverCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageHoverCard;
