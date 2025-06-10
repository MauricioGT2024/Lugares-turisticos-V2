import { motion } from 'framer-motion';

const AntofagastaCard = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl shadow-lg bg-white"
      onClick={onClick}
    >
      <div className="relative h-64">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-transparent to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-teal-900 mb-2">
          {item.title}
        </h3>
        <p className="text-teal-700 line-clamp-3">
          {item.description}
        </p>
        
        <div className="mt-4 flex items-center text-teal-600">
          <span className="text-sm font-medium">Leer más</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
    </motion.div>
  );
};

export default AntofagastaCard;
