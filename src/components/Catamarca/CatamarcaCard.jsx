import { motion } from 'framer-motion';

const CatamarcaCard = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-600/90 text-white">
            {item.area}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          {item.title}
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <span className="text-sm font-medium">Ver más</span>
          <svg
            className="ml-1 w-5 h-5 transform transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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

      {/* Decorative underline */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transform transition-transform duration-300" />
    </motion.div>
  );
};

export default CatamarcaCard;
