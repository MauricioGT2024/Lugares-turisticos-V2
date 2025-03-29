import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Image,
  IconButton,
  HStack,
  Tooltip,
  Icon,
  AspectRatio,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { getIconByArea } from "./icons";

const MotionBox = motion(Box);

const LocationCard = ({ location, isExpanded, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isOpen, onToggle: toggleDetails } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95 },
    }),
    []
  );

  return (
    <AnimatePresence>
      <MotionBox
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        bg={bgColor}
        rounded="xl"
        shadow="lg"
        overflow="hidden"
        height={isExpanded ? "auto" : "400px"}
        _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      >
        <Box position="relative">
          <Skeleton isLoaded={imageLoaded}>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={location.imgSrc}
                alt={location.title}
                objectFit="cover"
                onLoad={handleImageLoad}
              />
            </AspectRatio>
          </Skeleton>

          <Button
            size="sm"
            position="absolute"
            top={4}
            right={4}
            colorScheme="teal"
            variant="solid"
            leftIcon={<Icon as={getIconByArea(location.area)} />}
            _hover={{ transform: "translateY(-2px)" }}
          >
            {location.area}
          </Button>
        </Box>

        <VStack p={6} align="stretch" spacing={4}>
          <Heading size="md" noOfLines={2}>
            {location.title}
          </Heading>

          <Text
            color={textColor}
            noOfLines={isExpanded ? undefined : 2}
            onClick={toggleDetails}
            cursor="pointer"
          >
            {location.description}
          </Text>

          <AnimatePresence>
            {isExpanded && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "300px" }}
                exit={{ opacity: 0, height: 0 }}
                borderRadius="md"
                overflow="hidden"
              >
                <iframe
                  title={location.title}
                  src={location.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </MotionBox>
            )}
          </AnimatePresence>

          <HStack spacing={4} justify="space-between">
            <HStack>
              <Tooltip label="Ver en mapa">
                <IconButton
                  as="a"
                  href={location.path}
                  target="_blank"
                  icon={<FaMapMarkerAlt />}
                  colorScheme="blue"
                  variant="ghost"
                />
              </Tooltip>
              <Tooltip label="Más información">
                <IconButton
                  as="a"
                  href={location.wiki}
                  target="_blank"
                  icon={<FaInfoCircle />}
                  colorScheme="teal"
                  variant="ghost"
                />
              </Tooltip>
            </HStack>

            <IconButton
              icon={isExpanded ? <FaCompress /> : <FaExpand />}
              onClick={() => onToggle(location.id)}
              variant="ghost"
              colorScheme="gray"
              aria-label={isExpanded ? "Contraer" : "Expandir"}
            />
          </HStack>
        </VStack>
      </MotionBox>
    </AnimatePresence>
  );
};

export default LocationCard;
