import React from 'react';
import { Box, Stack, Heading, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBed, FaCompass } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HospedajeHeader = () => {
  return (
    <Stack spacing={6} textAlign="center" position="relative">
      <MotionBox
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        position="relative"
      >
        <Icon
          as={FaBed}
          position="absolute"
          top="-20px"
          right="20%"
          w={10}
          h={10}
          color="teal.400"
          opacity={0.3}
        />
        <Icon
          as={FaCompass}
          position="absolute"
          bottom="-20px"
          left="20%"
          w={8}
          h={8}
          color="blue.400"
          opacity={0.3}
        />
        <MotionHeading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
          letterSpacing="tight"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Descubre tu Hospedaje Ideal
        </MotionHeading>
      </MotionBox>

      <MotionText
        fontSize="xl"
        color={useColorModeValue("gray.600", "gray.300")}
        maxW="2xl"
        mx="auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explora los mejores alojamientos en Catamarca y vive una experiencia única
      </MotionText>
    </Stack>
  );
};

export default HospedajeHeader;
