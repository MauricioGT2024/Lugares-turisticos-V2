import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Heading, Text, Badge, useColorModeValue } from '@chakra-ui/react';

const LocationCard = ({ location, onShowDetails }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      role="article"
      cursor="pointer"
      onClick={() => onShowDetails(location)}
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="xl"
      position="relative"
      transition="all 0.2s"
    >
      <Box position="relative" height="240px">
        <Image
          src={location.imgSrc}
          alt={location.name}
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
          colorScheme="purple"
          boxShadow="md"
          backdropFilter="blur(8px)"
        >
          {location.category}
        </Badge>
      </Box>

      <Box p={6}>
        <Heading 
          size="md" 
          mb={2}
          bgGradient="linear(to-r, purple.400, red.400)"
          bgClip="text"
        >
          {location.name}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.300")}>
          {location.description}
        </Text>
      </Box>
    </Box>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    wiki: PropTypes.string,
    iframe: PropTypes.string,
    mapUrl: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
