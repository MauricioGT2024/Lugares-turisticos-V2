import { motion } from "framer-motion";

const TinogastaFilter = ({ title, items, selected, onSelect }) => {
  return (
    <div className="flex justify-center lg:justify-start">
      <div className="space-y-4 w-full">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center lg:text-left">
          {title}
        </h3>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
          {["Todos", ...items.filter((i) => i.toLowerCase() !== "todos")].map(
            (item) => (
              <motion.button
                key={item}
                onClick={() => onSelect(item)}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className={`
                  px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide
                  transition-all duration-300 transform
                  ${
                    selected === item
                      ? "bg-linear-to-r from-yellow-500 to-amber-600 text-white shadow-lg ring-2 ring-yellow-400 dark:ring-amber-500"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
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
