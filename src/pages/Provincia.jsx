import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  Image,
  Heading,
  Text,
  Link as ChakraLink,
  CardBody,
  Box,
  Container,
  VStack,
  useColorModeValue,
  Skeleton,
  Badge,
} from "@chakra-ui/react";
import { departamentos } from "../data/departamentos";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/react";

const DepartamentoCard = ({ loc }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const bgGradient = useColorModeValue(
    "linear(to-br, teal.400, blue.500)",
    "linear(to-br, teal.600, blue.700)"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <ChakraLink
        as={ReactRouterLink}
        to={loc.path}
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
        display="block"
      >
        <Card
          maxW="sm"
          overflow="hidden"
          borderRadius="2xl"
          boxShadow="xl"
          bg={useColorModeValue('white', 'gray.800')}
          position="relative"
          transition="all 0.3s"
          _hover={{
            transform: 'scale(1.02)',
            boxShadow: '2xl',
          }}
        >
          <Box position="relative" height="250px" overflow="hidden">
            <Skeleton isLoaded={isLoaded} height="100%" fadeDuration={1}>
              <Image
                src={loc.image}
                alt={loc.name}
                objectFit="cover"
                width="100%"
                height="100%"
                transition="transform 0.5s"
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Skeleton>
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient={bgGradient}
              opacity="0"
              transition="opacity 0.3s"
              _groupHover={{ opacity: 0.7 }}
            />
            <Badge
              position="absolute"
              top="4"
              right="4"
              colorScheme="teal"
              fontSize="sm"
              borderRadius="full"
              px="3"
              py="1"
            >
              Explorar
            </Badge>
          </Box>

          <CardBody p="6">
            <VStack align="start" spacing="3">
              <Heading 
                size="lg" 
                bgGradient={bgGradient}
                bgClip="text"
                transition="all 0.3s"
                _groupHover={{ transform: 'scale(1.05)' }}
              >
                {loc.name}
              </Heading>
              <Text
                fontSize="md"
                color={useColorModeValue('gray.600', 'gray.300')}
                noOfLines={3}
              >
                {loc.description}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </ChakraLink>
    </motion.div>
  );
};

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const Provincia = () => {
  return (
    <Container maxW="8xl" py="12">
      <VStack spacing="8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, teal.500, blue.500)"
            bgClip="text"
            mb="6"
            fontFamily="JetBrains Mono"
          >
            Explora los Departamentos
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            color={useColorModeValue('gray.600', 'gray.300')}
            maxW="3xl"
            mx="auto"
            mb="8"
          >
            Descubre la diversidad y belleza de cada rincón de Catamarca
          </Text>
        </motion.div>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing="8"
          w="full"
        >
          <AnimatePresence>
            {departamentos.map((loc, index) => (
              <DepartamentoCard key={loc.id} loc={loc} />
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Provincia;
