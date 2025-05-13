import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  hover: { scale: 1.03, boxShadow: '0 8px 32px rgba(80,0,120,0.18), 0 2px 8px rgba(0,0,0,0.10)' },
};

const DestinationCard = memo(({ image, title, subtitle, description, to }) => (
  <motion.article
    variants={cardVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    whileHover="hover"
    className="group relative flex flex-col rounded-3xl overflow-hidden shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-800/60 transition-all min-h-[420px]"
    role="article"
    aria-label={`Destino: ${title}`}
  >
    {/* Imagen */}
    <div className="relative h-56 w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
    </div>
    {/* Contenido */}
    <div className="flex flex-col flex-1 p-7 gap-2">
      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-700 bg-clip-text text-transparent drop-shadow-lg mb-1">
        {title}
      </h3>
      {subtitle && (
        <span className="text-sm font-medium text-amber-600 dark:text-amber-300 mb-1 uppercase tracking-wide">
          {subtitle}
        </span>
      )}
      <p className="text-gray-700 dark:text-gray-200 line-clamp-3 mb-4 flex-1">
        {description}
      </p>
      <div className="flex justify-end mt-auto">
        <Link
          to={to}
          className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-amber-500 via-orange-400 to-amber-700 px-5 py-2.5 rounded-full shadow-lg opacity-90 hover:opacity-100 hover:brightness-110 focus:ring-2 focus:ring-amber-300 focus:outline-none font-semibold text-base transition-all"
          aria-label={`Explorar ${title}`}
        >
          <span>Explorar</span>
          <FaArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </motion.article>
));

DestinationCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard;
