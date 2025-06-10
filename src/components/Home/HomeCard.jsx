import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

const HomeCard = ({ image, title, description, onClick }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative group cursor-pointer overflow-hidden rounded-xl shadow-lg 
        ${isDark ? 'bg-gray-800/30' : 'bg-white/10'} 
        backdrop-blur-sm
        hover:shadow-xl transition-all duration-300
      `}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
        <div className={`
          absolute inset-0 bg-gradient-to-t 
          ${isDark 
            ? 'from-black/90 via-black/60 to-transparent' 
            : 'from-black/80 via-black/50 to-transparent'
          }
          opacity-60 group-hover:opacity-80 transition-opacity duration-300
        `} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {description}
        </p>
        
        <motion.button
          className={`
            mt-4 inline-flex items-center gap-2 text-white
            bg-gradient-to-r from-purple-500 to-pink-500 
            px-4 py-2 rounded-full opacity-0 group-hover:opacity-100
            translate-y-2 group-hover:translate-y-0 
            transition-all duration-300
            hover:shadow-lg focus:ring-2 focus:ring-purple-300 
            focus:outline-none focus:ring-offset-2
            ${isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Explorar ${title}`}
        >
          Explorar
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

HomeCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default HomeCard;
