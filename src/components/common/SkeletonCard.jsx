import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

const SkeletonCard = () => {
  const { colorMode } = useColorMode();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        rounded-xl overflow-hidden
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg p-4
      `}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg" />
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
