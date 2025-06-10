import { motion } from 'framer-motion';

const CatamarcaCard = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600/90 rounded-full">
            {item.area}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <span className="text-sm font-medium">Ver más</span>
          <svg
            className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
    </motion.div>
  );
};

export default CatamarcaCard;
