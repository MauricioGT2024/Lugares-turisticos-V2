import { motion } from "framer-motion";

const TinogastaFilter = ({ title, items, selected, onSelect }) => {
  return (
    <div className="flex justify-center lg:justify-start">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-400">
          {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Todos", ...items.filter((i) => i.toLowerCase() !== "todos")].map(
            (item) => (
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
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 dark:from-yellow-400 dark:to-yellow-600 dark:text-yellow-900 shadow-lg"
                  : "bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300 hover:bg-yellow-200/80 dark:hover:bg-yellow-800/60"
              }
            `}
              >
                {item}
              </motion.button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TinogastaFilter;
