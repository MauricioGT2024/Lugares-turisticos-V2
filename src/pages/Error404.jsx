import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Error404 = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      px={4}
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2} color={textColor}>
          Página no encontrada
        </Text>
        <Text color={textColor} mb={6}>
          La página que estás buscando no existe o ha sido movida.
        </Text>

        <Button
          as={ReactRouterLink}
          to="/"
          colorScheme="blue"
          bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
          color="white"
          variant="solid"
          _hover={{
            bgGradient: "linear(to-r, blue.500, blue.600, blue.700)",
          }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Flex>
  );
};

export default Error404;
