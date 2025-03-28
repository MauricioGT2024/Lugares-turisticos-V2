import React from "react";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaInfoCircle, FaExpand, FaCompress } from "react-icons/fa";
import { getIconByArea } from './icons';

const LocationCard = ({ location, isExpanded, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={bgColor}
        rounded="lg"
        shadow="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      >
        <Box position="relative">
          <Image
            src={location.imgSrc}
            alt={location.title}
            h="200px"
            w="full"
            objectFit="cover"
          />
          <Button
            size="sm"
            position="absolute"
            top={4}
            right={4}
            colorScheme="teal"
            variant="solid"
            leftIcon={<Icon as={getIconByArea(location.area)} />}
          >
            {location.area}
          </Button>
        </Box>

        <VStack p={6} align="stretch" spacing={4}>
          <Heading size="md">{location.title}</Heading>
          
          <Text color={textColor} noOfLines={isExpanded ? undefined : 2}>
            {location.description}
          </Text>

          {isExpanded && (
            <Box borderRadius="md" overflow="hidden" h="300px">
              <iframe
                title={location.title}
                src={location.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>
          )}

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
      </Box>
    </motion.div>
  );
};

export default React.memo(LocationCard);
