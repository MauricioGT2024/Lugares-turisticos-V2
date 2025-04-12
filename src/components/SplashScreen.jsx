import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';
const SplashScreen = ({ onComplete }) => {
  const { colorMode } = useColorMode();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onComplete}
    >
      <div className={`absolute inset-0 ${
        colorMode === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`} />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <img 
          src="/logo.png" 
          alt="Logo Catamarca" 
          className="w-48 h-48 object-contain"
        />
        
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className={`text-3xl font-bold mb-2 ${
            colorMode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Catamarca Turismo
          </h1>
          <p className={`text-lg ${
            colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Descubriendo lugares mágicos
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

SplashScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default SplashScreen;
