// src/components/Navbar.jsx
import { Box, Flex, Heading, Button, Spacer, Stack, IconButton, useDisclosure, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'; // Íconos para el menú hamburguesa
import { motion } from 'framer-motion'; // Importar motion de framer-motion
import ColorModeSwitcher from './ColorModeSwitcher';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure(); // Hook para manejar el estado del menú

  return (
    <Box bg="teal.500" p={4}>
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        {/* Logo como enlace a la página de inicio */}
        <Link to="/">
          <Heading color="white" size="md">
            Mi App
          </Heading>
        </Link>

        <Spacer />

        {/* Icono del menú hamburguesa para pantallas pequeñas */}
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle navigation"
          onClick={onToggle}
          colorScheme="teal"
          variant="outline"
          display={{ md: 'none' }} // Mostrar solo en pantallas pequeñas
        />

        {/* Menú de navegación: solo visible en pantallas medianas y grandes */}
        <Stack
          direction="row"
          spacing={4}
          display={{ base: 'none', md: 'flex' }} // Ocultar en pantallas pequeñas
        >
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.1 }} // Efecto de hover: agrandar el botón
              transition={{ duration: 0.3 }}
            >
              <Button
                colorScheme="teal"
                variant="solid"
                color="white"
                _hover={{
                  bg: "teal.600",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease",
                }}
                _active={{
                  bg: "teal.700",
                }}
                borderRadius="md"
                px={6}
                py={3}
              >
                Inicio
              </Button>
            </motion.div>
          </Link>

          <Link to="/hospedaje">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                colorScheme="teal"
                variant="solid"
                color="white"
                _hover={{
                  bg: "teal.600",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease",
                }}
                _active={{
                  bg: "teal.700",
                }}
                borderRadius="md"
                px={6}
                py={3}
              >
                Hospedaje
              </Button>
            </motion.div>
          </Link>

          <Link to="/provincia">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                colorScheme="teal"
                variant="solid"
                color="white"
                _hover={{
                  bg: "teal.600",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease",
                }}
                _active={{
                  bg: "teal.700",
                }}
                borderRadius="md"
                px={6}
                py={3}
              >
                Provincia
              </Button>
            </motion.div>
          </Link>
        </Stack>

        <ColorModeSwitcher /> {/* Botón para alternar el modo de color */}
      </Flex>

      {/* Menú desplegable (hamburguesa) para pantallas pequeñas */}
      {isOpen && (
        <VStack
          spacing={4}
          align="stretch"
          display={{ md: 'none' }} // Solo se muestra en pantallas pequeñas
          mt={4}
        >
          <Link to="/">
            <Button
              colorScheme="teal"
              variant="solid"
              color="white"
              width="full"
              _hover={{
                bg: "teal.600",
              }}
              _active={{
                bg: "teal.700",
              }}
              px={6}
              py={3}
            >
              Inicio
            </Button>
          </Link>

          <Link to="/hospedaje">
            <Button
              colorScheme="teal"
              variant="solid"
              color="white"
              width="full"
              _hover={{
                bg: "teal.600",
              }}
              _active={{
                bg: "teal.700",
              }}
              px={6}
              py={3}
            >
              Hospedaje
            </Button>
          </Link>

          <Link to="/provincia">
            <Button
              colorScheme="teal"
              variant="solid"
              color="white"
              width="full"
              _hover={{
                bg: "teal.600",
              }}
              _active={{
                bg: "teal.700",
              }}
              px={6}
              py={3}
            >
              Provincia
            </Button>
          </Link>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
