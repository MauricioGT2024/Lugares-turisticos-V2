import { motion } from 'framer-motion';

const CatamarcaFilter = ({ title, items, selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-400">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {['Todos', ...items].map((item) => (
          <motion.button
            key={item}
            onClick={() => onSelect(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200
              shadow-sm hover:shadow-md
              ${
                selected === item
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700'
              }
            `}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CatamarcaFilter;
