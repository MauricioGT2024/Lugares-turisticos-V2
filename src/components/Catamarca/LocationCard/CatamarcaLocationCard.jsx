import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Box, Image, Heading, Text, Badge, VStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { getAreaTheme, getIconByArea } from "../";
import { ANIMATION_PRESETS } from "../config/animations";

const CatamarcaLocationCard = ({ location, onShowDetails }) => {
  const { colorScheme, gradient } = getAreaTheme(location.area);
  const AreaIcon = getIconByArea(location.area);

  return (
    <Box
      as={motion.div}
      variants={ANIMATION_PRESETS.item}
      whileHover="hover"
      cursor="pointer"
      onClick={() => onShowDetails(location.id)}
      role="article"
      aria-label={location.title}
    >
      <VStack
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
        spacing={0}
        h="full"
      >
        <Box position="relative" w="full" h="250px">
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
            bgGradient={gradient}
            color="white"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={AreaIcon} />
            {location.area}
          </Badge>
        </Box>

        <VStack p={6} spacing={3} align="start" flex={1}>
          <Heading size="md" color={`${colorScheme}.500`}>
            {location.title}
          </Heading>
          <Text 
            noOfLines={3}
            color={useColorModeValue("gray.600", "gray.300")}
          >
            {location.description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

CatamarcaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    area: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(CatamarcaLocationCard);
