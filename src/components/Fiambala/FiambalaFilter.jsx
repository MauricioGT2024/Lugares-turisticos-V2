import { motion } from 'framer-motion';

const FiambalaFilter = ({ title, items, selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
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
              px-4 py-2 rounded-lg font-medium text-sm transition-colors
              ${
                selected === item
                  ? 'bg-orange-500 text-white dark:bg-orange-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
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

export default FiambalaFilter;
