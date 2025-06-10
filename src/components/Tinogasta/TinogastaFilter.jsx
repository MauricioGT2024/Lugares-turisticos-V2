import { motion } from 'framer-motion';

const TinogastaFilter = ({ title, items, selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-400">
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
              transition-colors duration-200 backdrop-blur-sm
              ${
                selected === item
                  ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg'
                  : 'bg-purple-100/80 text-purple-700 hover:bg-purple-200/80 dark:bg-purple-900/20 dark:text-purple-300'
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

export default TinogastaFilter;
