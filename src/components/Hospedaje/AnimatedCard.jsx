import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Collapse,
  useColorModeValue,
  Icon,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaHotel, FaLocationArrow, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const MotionBox = motion(Box);

const AnimatedCard = ({ image, title, description, iframe, id, location, isExpanded, onToggle }) => {
  return (
    <MotionBox
      maxW="full"
      borderRadius="2xl"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      position="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "2xl",
        padding: "2px",
        background: "linear-gradient(45deg, teal.400, blue.500)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <Box position="relative" height="220px">
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          width="100%"
          height="100%"
          transition="0.3s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)"
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="full"
          bg="whiteAlpha.900"
          color="gray.800"
          display="flex"
          alignItems="center"
          gap={2}
          boxShadow="md"
        >
          <Icon as={FaLocationArrow} color="teal.500" />
          {location}
        </Badge>
      </Box>

      <VStack p={6} spacing={4} align="stretch">
        <HStack justify="space-between">
          <Heading size="md" display="flex" alignItems="center" gap={2}>
            <Icon as={FaHotel} color="teal.500" />
            {title}
          </Heading>
          <Icon as={FaStar} color="yellow.400" />
        </HStack>

        <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
          {description}
        </Text>

        <Button
          onClick={() => onToggle(id)}
          size="lg"
          colorScheme="teal"
          variant="ghost"
          width="full"
          leftIcon={<FaMapMarkedAlt />}
          _hover={{
            transform: "translateY(-2px)",
            shadow: "md",
            bg: "teal.50",
          }}
        >
          {isExpanded ? "Ocultar ubicación" : "Ver ubicación"}
        </Button>

        <Collapse in={isExpanded}>
          <Box
            mt={4}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="inner"
            height="250px"
          >
            <iframe
              src={iframe}
              title={`Mapa de ${title}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </Box>
        </Collapse>
      </VStack>
    </MotionBox>
  );
};

AnimatedCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iframe: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AnimatedCard;
