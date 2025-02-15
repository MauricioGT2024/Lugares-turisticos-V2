import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  SlideFade,
  Tag,
  Text,
  useToast,
  IconButton,
  Flex,
  Badge,
  Select,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { StarIcon } from "@chakra-ui/icons";

import { locations } from "../data/catamarca";

const MotionImage = motion(Image);

const Catamarca = () => {
  const toast = useToast();
  const [openStates, setOpenStates] = useState(locations.map(() => false));
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filteredLocations, setFilteredLocations] = useState(locations);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavorite = (locationId) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(locationId)
        ? prevFavorites.filter((id) => id !== locationId)
        : [...prevFavorites, locationId];
      
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      
      toast({
        title: prevFavorites.includes(locationId)
          ? "Removed from favorites"
          : "Added to favorites",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      return updatedFavorites;
    });
  };


  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sortedLocations = [...locations];

    if (value === "rating") {
      sortedLocations.sort((a, b) => b.rating - a.rating);
    } else if (value === "favorites") {
      sortedLocations.sort(
        (a, b) => favorites.includes(b.id) - favorites.includes(a.id)
      );
    }

    setFilteredLocations(sortedLocations);
  };

  const handleToggle = (index) => {
    const newOpenStates = [...openStates];

    newOpenStates[index] = !newOpenStates[index];

    setOpenStates(newOpenStates);
  };

  return (
    <>
      <Flex justify="flex-end" mb={4} mx={6}>
        <Select
          placeholder="Sort by"
          value={sortBy}
          onChange={handleSortChange}
          width="200px"
        >
          <option value="default">Default</option>
          <option value="rating">Rating</option>
          <option value="favorites">Favorites</option>
        </Select>
      </Flex>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={10} margin={6}>
        {filteredLocations.map((loc, index) => (
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
            height={openStates[index] ? "auto" : "450px"}
            transition="height 0.3s ease"
          >
            <Box position="relative" height="300px" overflow="hidden">
              <IconButton
                aria-label="Add to favorites"
                icon={<StarIcon />}
                position="absolute"
                top={2}
                right={2}
                zIndex={2}
                colorScheme={favorites.includes(loc.id) ? "yellow" : "gray"}
                onClick={() => handleFavorite(loc.id)}
              />
              <MotionImage
                src={loc.imgSrc}
                alt={loc.title}
                objectFit="cover"
                height="100%"
                width="100%"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 2 }}
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
                  fontSize={{ base: "xl", md: "xl", lg: "3xl" }}
                >
                  {loc.title}
                </Heading>

                <Text mb={3} fontSize={{ base: "xs", md: "sm", lg: "xs" }}>
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
              <Flex mt="5" justify="space-between" align="center">
                <Tag textColor="black" variant="outline">
                  {loc.lugar}
                </Tag>
                <Badge colorScheme="green" fontSize="sm">
                  Rating: {loc.rating || 4.5}
                </Badge>
              </Flex>

              {/* SlideFade para mostrar el iframe */}

              <SlideFade in={openStates[index]} unmountOnExit>
                <Box mt={3}>
                  <iframe
                    key={index}
                    width="250px"
                    src={loc.mapSrc}
                    title={`Mapa de ${loc.title}`}
                  />
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
