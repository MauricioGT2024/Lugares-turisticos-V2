import { useColorMode } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingSpinner = () => {
  const { colorMode } = useColorMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <div className={`h-screen w-full flex flex-col justify-center items-center gap-6 overflow-hidden ${
          colorMode === "dark" 
            ? "bg-[radial-gradient(circle,theme(colors.gray.900)_0%,theme(colors.gray.800)_100%)]" 
            : "bg-[radial-gradient(circle,theme(colors.gray.50)_0%,theme(colors.white)_100%)]"
        }`}>
          <motion.div
            variants={itemVariants}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="relative"
          >
            <div className={`w-[70px] h-[70px] rounded-full border-3 border-transparent border-t-current ${
              colorMode === "dark" ? "text-teal-200" : "text-teal-500"
            } animate-spin drop-shadow-[0_0_10px_rgba(49,151,149,0.2)]`} />
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="text-center"
          >
            <h2 className={`text-xl font-medium tracking-wide mb-2 ${
              colorMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Cargando...
            </h2>
            <p className={`text-sm ${
              colorMode === "dark" ? "text-gray-400" : "text-gray-600"
            } opacity-80`}>
              Preparando tu experiencia
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSpinner;
