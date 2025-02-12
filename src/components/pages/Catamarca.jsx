import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  SlideFade,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { locations } from "../../data/catamarca";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const Catamarca = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "gray.800" : "whiteAlpha.900";
  const [openStates, setOpenStates] = useState(
    locations.map(() => false)
  );

  const handleToggle = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={10} margin={6}>
        {locations.map((loc, index) => (
          <Card
            key={index}
            maxW="sm"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            position="relative"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "2xl",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            height={openStates[index] ? "auto" : "600px"}
            transition="height 0.3s ease"
          >
            <Box
              position="relative"
              height={{ base: "200px", md: "300px", lg: "600px" }}
              width="100%"
              overflow="hidden"
            >
              <MotionImage
                src={loc.imgSrc}
                alt={loc.title}
                objectFit="cover"
                height="100%"
                width="100%"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition="all 0.3s ease"
              />
              {/* Descripción visible en el hover */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                color="white"
                width="100%"
                opacity={0}
                _hover={{
                  opacity: 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <Heading
                  size="md"
                  fontWeight="bold"
                  mb={2}
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                >
                  {loc.title}
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                  {loc.description}
                </Text>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleToggle(index)}
                  variant="solid"
                >
                  {openStates[index] ? "Ocultar Mapa" : "Ver Mapa"}
                </Button>
              </Box>
            </Box>

            {/* Cuerpo del card con información adicional */}
            <CardBody>
              <HStack mt="5" spacing="3">
                <Tag textColor="black" variant="outline">
                  {loc.lugar}
                </Tag>
              </HStack>

              {/* SlideFade para mostrar el iframe */}
              <SlideFade in={openStates[index]} unmountOnExit>
                <Box>
                  <iframe width="270px" src={loc.mapSrc}></iframe>
                </Box>
              </SlideFade>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Catamarca;
