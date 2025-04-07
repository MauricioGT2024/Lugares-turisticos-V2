import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Heading, Text, Badge, VStack, useColorModeValue } from "@chakra-ui/react";
import { CATEGORY_CONFIG } from "./CategoryConfig";

const LocationCard = ({ location, onShowDetails }) => {
  const config = CATEGORY_CONFIG[location.category] || {};
  
  const handleClick = () => {
    onShowDetails(location.id);
  };

  return (
    <Box
      role="article"
      cursor="pointer"
      onClick={handleClick}
      borderRadius="xl"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      position="relative"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
    >
      <Box position="relative" height="240px">
        <Image
          src={location.imgSrc}
          alt={location.title}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.3s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="full"
          bgGradient={config.gradient}
          color="white"
          boxShadow="sm"
          backdropFilter="blur(4px)"
        >
          {location.category}
        </Badge>
      </Box>

      <VStack p={6} spacing={3} align="start">
        <Heading 
          size="md"
          bgGradient={config.gradient}
          bgClip="text"
        >
          {location.title}
        </Heading>
        <Text 
          noOfLines={3}
          color={useColorModeValue("gray.600", "gray.300")}
        >
          {location.description}
        </Text>
      </VStack>
    </Box>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
