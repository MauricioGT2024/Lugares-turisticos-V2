import React from 'react';
import {
  VStack,
  Box,
  Text,
  Select,
  useColorModeValue,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMapMarkedAlt, FaHotel } from "react-icons/fa";
import PropTypes from "prop-types";

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

const HospedajeFilter = ({ selectedDepartment, setSelectedDepartment, departments }) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, whiteAlpha.900, whiteAlpha.800)",
    "linear(to-b, blackAlpha.700, blackAlpha.800)"
  );

  return (
    <MotionVStack
      position="sticky"
      top="20"
      spacing={6}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MotionBox
        p={6}
        borderRadius="2xl"
        bgGradient={bgGradient}
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}
        boxShadow="lg"
        _hover={{ transform: "translateY(-2px)" }}
        transition="0.3s ease"
      >
        <VStack spacing={4} align="stretch">
          <Box position="relative">
            <Icon
              as={FaHotel}
              position="absolute"
              right="0"
              top="-10px"
              w={6}
              h={6}
              color="teal.400"
            />
            <Text
              fontSize="lg"
              fontWeight="bold"
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
            >
              Filtrar Hospedajes
            </Text>
          </Box>

          <Box position="relative">
            <Icon
              as={FaSearch}
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="teal.500"
              zIndex={2}
            />
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              pl={10}
              variant="filled"
              bg={useColorModeValue("white", "gray.700")}
              _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
              _focus={{ bg: useColorModeValue("white", "gray.700") }}
              icon={<FaMapMarkedAlt />}
              borderRadius="xl"
              transition="all 0.3s"
            >
              <chakra.option value="all">Todos los lugares</chakra.option>
              <AnimatePresence>
                {departments.map((dept) => (
                  <chakra.option key={dept} value={dept}>
                    {dept}
                  </chakra.option>
                ))}
              </AnimatePresence>
            </Select>
          </Box>
        </VStack>
      </MotionBox>
    </MotionVStack>
  );
};

HospedajeFilter.propTypes = {
  selectedDepartment: PropTypes.string.isRequired,
  setSelectedDepartment: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HospedajeFilter;
