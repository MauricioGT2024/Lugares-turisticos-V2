import { Box, Spinner, Text, useColorModeValue,  } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes } from "@emotion/react";

const pulseKeyframe = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const LoadingSpinner = () => {
  const bgGradient = useColorModeValue(
    "radial-gradient(circle, gray.50 0%, white 100%)",
    "radial-gradient(circle, gray.900 0%, gray.800 100%)"
  );
  
  const spinnerColor = useColorModeValue("teal.500", "teal.200");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const pulse = `${pulseKeyframe} 2s ease-in-out infinite`;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Box
          height="100vh"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={6}
          bgGradient={bgGradient}
          position="relative"
          overflow="hidden"
        >
          <motion.div
            variants={itemVariants}
            style={{ 
              animation: pulse,
              filter: "drop-shadow(0 0 10px rgba(49, 151, 149, 0.2))"
            }}
          >
            <Spinner
              thickness="3px"
              speed="0.8s"
              emptyColor="transparent"
              color={spinnerColor}
              size="xl"
              width="70px"
              height="70px"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ textAlign: "center" }}
          >
            <Text 
              fontSize="xl" 
              fontWeight="500"
              color={textColor}
              letterSpacing="0.5px"
              mb={2}
            >
              Cargando
              <Box 
                as="span" 
                animation="dots 1.4s linear infinite"
                sx={{
                  '@keyframes dots': {
                    '0%, 20%': { content: '""' }, 
                    '40%': { content: '"."' },
                    '60%': { content: '".."' },
                    '80%, 100%': { content: '"..."' }
                  }
                }}
              />
            </Text>
            <Text
              fontSize="sm"
              color={textColor}
              opacity={0.8}
            >
              Preparando tu experiencia
            </Text>
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSpinner;
