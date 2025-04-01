import {
  VStack,
  Box,
  Text,
  Select,
  useColorModeValue,
  Icon,
  HStack, // Añadido HStack
  // chakra eliminado
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkedAlt, FaHotel } from "react-icons/fa";
import PropTypes from "prop-types";

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

const HospedajeFilter = ({ selectedDepartment, setSelectedDepartment, departments }) => {
  const bgColor = useColorModeValue("white", "gray.800"); // Color sólido
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const selectBg = useColorModeValue("gray.100", "gray.700");
  const selectHoverBg = useColorModeValue("gray.200", "gray.600");

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
        p={5} // Padding ajustado
        borderRadius="xl" // Menos redondeado
        bg={bgColor}
        // backdropFilter eliminado para fondo sólido
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="md" // Sombra ajustada
        // _hover eliminado para elemento sticky
        transition="0.3s ease"
      >
        <VStack spacing={5} align="stretch"> {/* Espaciado ajustado */}
          <HStack spacing={3}> {/* HStack para icono y texto */}
            <Icon as={FaHotel} w={5} h={5} color="teal.500" />
            <Text fontSize="md" fontWeight="semibold" color={useColorModeValue("gray.700", "gray.200")}>
              Filtrar por Ubicación
            </Text>
          </HStack>

          <Box position="relative" pt={1}> {/* Padding top añadido */}
            <Icon
              as={FaSearch}
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color={useColorModeValue("gray.500", "gray.400")} // Icono más sutil
              zIndex={1} // zIndex ajustado
            />
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              pl={10}
              variant="outline" // Variante outline
              bg={selectBg}
              borderColor={borderColor} // Borde igual al contenedor
              _hover={{ bg: selectHoverBg, borderColor: useColorModeValue("gray.300", "gray.600") }}
              _focus={{ bg: selectBg, borderColor: "teal.500", boxShadow: `0 0 0 1px var(--chakra-colors-teal-500)` }} // Focus estilo Chakra
              icon={<Icon as={FaMapMarkedAlt} color="gray.500" />} // Icono del select
              borderRadius="lg" // Menos redondeado
              transition="all 0.2s" // Transición más rápida
              size="md" // Tamaño ajustado
            >
              <option value="all">Todos los lugares</option> {/* Usar option nativo */}
              {departments.map((dept) => (
                <option key={dept} value={dept}> {/* Usar option nativo */}
                  {dept}
                </option>
              ))}
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
