import { motion } from 'framer-motion';

const AntofagastaFilter = ({ title, items, selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-400">
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
              border
              ${
                selected === item
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg border-transparent'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-700'
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

export default AntofagastaFilter;
