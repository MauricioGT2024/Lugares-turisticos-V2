import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const Error404 = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const gradientColors = useColorModeValue(
    "linear(to-r, teal.400, blue.500)",
    "linear(to-r, teal.200, blue.400)"
  );

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      px={4}
      overflow="hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={6} textAlign="center">
          <Icon
            as={FaExclamationTriangle}
            w={16}
            h={16}
            color="yellow.400"
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />

          <Heading
            as={motion.h1}
            size="4xl"
            bgGradient={gradientColors}
            bgClip="text"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            404
          </Heading>

          <VStack spacing={3}>
            <Heading
              as="h2"
              size="xl"
              color={textColor}
              fontWeight="normal"
            >
              Página no encontrada
            </Heading>

            <Text 
              color={textColor} 
              fontSize="lg"
              maxW="md"
              opacity={0.8}
            >
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
              Te sugerimos volver al inicio.
            </Text>
          </VStack>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              as={ReactRouterLink}
              to="/"
              size="lg"
              colorScheme="teal"
              bgGradient={gradientColors}
              color="white"
              leftIcon={<FaHome />}
              _hover={{
                bgGradient: "linear(to-r, teal.500, blue.600)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
            >
              Volver al inicio
            </Button>
          </motion.div>
        </VStack>
      </motion.div>
    </Flex>
  );
};

export default Error404;
