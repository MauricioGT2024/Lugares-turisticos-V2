import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Wrap,
  WrapItem,
  Tooltip,
  useColorModeValue,
  Icon,
  Collapse,
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle, FaChevronDown } from "react-icons/fa";
import { animations } from "./animations";
import LocationImage from "./LocationImage";
import { AREA_CONFIG } from './AreaConfig';

const LocationCard = React.memo(({ location, isExpanded, onToggle }) => {
  const MotionBox = chakra(motion.div);
  const MotionBadge = chakra(motion.div);
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const areaConfig = AREA_CONFIG[location.category] || {
    gradient: "linear(to-br, teal.400, blue.400)",
    color: "teal.600",
    darkColor: "teal.300",
    icon: FaMapMarkedAlt,
    shadow: "0 4px 20px -8px rgba(129, 230, 217, 0.5)",
  };
  const handleToggle = useCallback(() => {
    onToggle(location.id);
  }, [location.id, onToggle]);

  const IconComponent = areaConfig.icon;
  return (
    <MotionBox
      layout
      {...animations.fadeIn}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "2xl",
      }}
      role="group"
      height={isExpanded ? "auto" : "450px"}
    >
      <Box position="relative">
        <LocationImage src={location.imgSrc} alt={location.title} />
        <MotionBadge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="full"
          bg={areaConfig.badge}
          color="white"
          {...animations.scale}
          whileHover={animations.scale.hover}
          backdropFilter="blur(8px)"
        >
          <Icon as={areaConfig.icon} mr={2} />
          {location.area}
        </MotionBadge>
      </Box>

      <VStack p={6} spacing={4} align="start">
        <Heading
          size="md"
          bgGradient={areaConfig.gradient}
          bgClip="text"
          _groupHover={{ transform: "translateX(4px)" }}
          transition="0.2s ease"
        >
          {location.title}
        </Heading>

        <Text
          color={textColor}
          noOfLines={isExpanded ? undefined : 3}
          cursor="pointer"
          onClick={handleToggle}
        >
          {location.description}
        </Text>

        <Collapse in={isExpanded} animateOpacity>
          <Box w="full" borderRadius="md" overflow="hidden">
            <iframe
              title={`Mapa de ${location.title}`}
              src={location.mapSrc}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </Box>

          <Wrap spacing={4} mt={4}>
            <WrapItem>
              <Tooltip label="Ver en Google Maps">
                <Button
                  as="a"
                  href={location.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaMapMarkedAlt />}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                >
                  Ver ubicación
                </Button>
              </Tooltip>
            </WrapItem>

            <WrapItem>
              <Tooltip label="Más información">
                <Button
                  as="a"
                  href={location.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaInfoCircle />}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                >
                  Detalles
                </Button>
              </Tooltip>
            </WrapItem>
          </Wrap>
        </Collapse>

        <Button
          onClick={handleToggle}
          variant="ghost"
          colorScheme="teal"
          size="sm"
          width="full"
          rightIcon={
            <MotionBox as={Icon} {...(isExpanded ? animations.rotate : {})}>
              <FaChevronDown />
            </MotionBox>
          }
          aria-label={isExpanded ? "Ver menos" : "Ver más"}
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </Button>
      </VStack>
    </MotionBox>
  );
});

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    wiki: PropTypes.string.isRequired,
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default LocationCard;
