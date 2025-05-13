import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Box, Badge, useColorModeValue } from "@chakra-ui/react";

const ModernLocationCard = ({ location, onShowDetails }) => {
  const { title, description, imgSrc, categoria } = location;
  const [hovered, setHovered] = useState(false);
  const badgeBg = useColorModeValue("orange.400", "yellow.400");
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.7)",
    "rgba(30,30,30,0.7)"
  );
  const shadow = useColorModeValue(
    "0 8px 32px 0 rgba(255,140,0,0.10)",
    "0 8px 32px 0 rgba(255,255,255,0.08)"
  );

  return (
    <motion.div
      whileHover={{ y: -14, scale: 1.04, boxShadow: shadow }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        height: 400,
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        background: cardBg,
        border: "1.5px solid rgba(255,255,255,0.13)",
        boxShadow: shadow,
        transition: "box-shadow 0.3s",
      }}
      onClick={() => onShowDetails(location.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box position="absolute" inset={0} zIndex={1}>
        <motion.img
          src={imgSrc}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 24,
            filter: hovered
              ? "brightness(0.92) saturate(1.1) blur(1px)"
              : "brightness(0.97) saturate(1.05)",
            transition: "filter 0.4s",
          }}
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, orange.700 60%, transparent)"
          opacity={0.5}
        />
      </Box>
      <Badge
        position="absolute"
        top={5}
        right={5}
        px={5}
        py={2}
        borderRadius="full"
        bg={badgeBg}
        color="white"
        fontSize="md"
        fontWeight="bold"
        boxShadow="xl"
        backdropFilter="blur(6px)"
        display="flex"
        alignItems="center"
        zIndex={2}
        style={{ letterSpacing: 1 }}
      >
        {categoria}
      </Badge>
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 28,
          background: "rgba(0,0,0,0.32)",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          transform: hovered ? "translateY(0)" : "translateY(24px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s",
        }}
      >
        <Box as="h2" fontSize="2xl" fontWeight="extrabold" color="white" mb={2} letterSpacing={1} textShadow="0 2px 8px rgba(0,0,0,0.18)">
          {title}
        </Box>
        <Box as="p" color="gray.100" noOfLines={2} fontSize="md" textShadow="0 1px 4px rgba(0,0,0,0.12)">
          {description}
        </Box>
      </motion.div>
    </motion.div>
  );
};

ModernLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(ModernLocationCard);
