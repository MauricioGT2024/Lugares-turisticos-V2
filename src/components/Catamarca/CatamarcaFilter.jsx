import { motion } from "framer-motion";

const CatamarcaFilter = ({ title, items, selected, onSelect, isDark }) => {
  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold ${
          isDark ? "text-blue-400" : "text-blue-800"
        }`}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {["Todos", ...items].map((item) => (
          <motion.button
            key={item}
            onClick={() => onSelect(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={selected === item}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md ${
              selected === item
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : isDark
                ? "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200"
                : "bg-blue-900/20 text-blue-300 border border-blue-700 hover:bg-blue-800/40"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CatamarcaFilter;
