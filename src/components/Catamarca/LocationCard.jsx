import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Image,
  AspectRatio,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { getIconByArea } from "./icons";
import { AREA_CONFIG } from "./AreaConfig";

const MotionBox = motion(Box);

const LocationCardComponent = ({ location, onShowDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { colorScheme } = AREA_CONFIG[location.area] || { colorScheme: "gray" };
  const icon = getIconByArea(location.area);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleShowDetailsClick = useCallback(() => onShowDetails(location.id), [location.id, onShowDetails]);

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <MotionBox
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      bg={useColorModeValue("white", "gray.800")}
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius="md"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      transition="0.2s"
      height="400px"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" height="180px" flexShrink={0}>
        <Skeleton isLoaded={imageLoaded} height="100%">
          <AspectRatio ratio={16 / 9} h="100%">
            <Image
              src={location.imgSrc}
              alt={location.title}
              objectFit="cover"
              onLoad={handleImageLoad}
              w="full"
              h="full"
              transition="0.3s ease-in-out"
              aria-label={location.title}
            />
          </AspectRatio>
        </Skeleton>
      </Box>
      <VStack p={4} align="start" spacing={2} flexGrow={1} display="flex" flexDirection="column">
        <HStack spacing={2}>
          {icon && <Box as={icon} color={`${colorScheme}.500`} boxSize={5} />}
          <Heading size="sm" noOfLines={2}>
            {location.title}
          </Heading>
        </HStack>
        <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.300")} noOfLines={3}>
          {location.description}
        </Text>
        <Button
          leftIcon={<FaEye />}
          onClick={handleShowDetailsClick}
          colorScheme={colorScheme}
          variant="ghost"
          size="xs"
          w="full"
          mt="auto"
          _hover={{ bg: `${colorScheme}.500`, color: "white" }}
          transition="0.2s"
        >
          Ver Detalles
        </Button>
      </VStack>
    </MotionBox>
  );
};

LocationCardComponent.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCardComponent);
