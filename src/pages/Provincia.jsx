import { motion } from 'framer-motion';
import {
  Card,
  Image,
  Heading,
  Text,
  Link as ChakraLink,
  CardBody,
  Box,
} from "@chakra-ui/react";

import { departamentos } from "../data/departamentos";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/react";

const Provincia = () => {
  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={7}>
        {departamentos.map((loc, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChakraLink
              as={ReactRouterLink}
              to={loc.path}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Card
                maxW="sm"
                position="relative"
                overflow="hidden"
                cursor="pointer"
                borderRadius="xl"
                boxShadow="md"
                transition="all 0.3s ease-in-out"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'xl',
                }}
              >
                <Box
                  position="relative"
                  height="200px"
                  overflow="hidden"
                >
                  <Image 
                    src={loc.image} 
                    alt={loc.id} 
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    loading="lazy"
                    fallbackSrc="/placeholder.jpg"
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.600"
                    opacity={0}
                    transition="opacity 0.3s"
                    _hover={{
                      opacity: 1,
                    }}
                  >
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      p={4}
                      bg="blackAlpha.800"
                    >
                      <Heading 
                        size="lg" 
                        color="white"
                        textAlign="center"
                      >
                        {loc.name}
                      </Heading>
                    </Box>
                  </Box>
                </Box>
                <CardBody p={4}>
                  <Text fontSize="md" color="gray.600">
                    {loc.description}
                  </Text>
                </CardBody>
                  
               
              </Card>
            </ChakraLink>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
};

Provincia.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  iframe: PropTypes.string.isRequired,
};

export default Provincia;
