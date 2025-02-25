import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Stack,
  IconButton,
  useDisclosure,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ColorModeSwitcher from "./ColorModeSwitcher";

const navItems = [
  { path: "/", label: "Inicio" },
  { path: "/about", label: "Sobre Nosotros" },
  { path: "/hospedaje", label: "Hospedaje" },
  { path: "/provincia", label: "Provincia" },
];

const NavButton = ({ path, label }) => {
  NavButton.propTypes = {
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <Link to={path}>
      <Button
        colorScheme="teal"
        variant="solid"
        color="white"
        _hover={{
          bg: "teal.600",
          transform: "scale(1.05)",
          transition: "all 0.2s ease",
        }}
        _active={{
          bg: "teal.700",
        }}
        borderRadius="md"
        px={6}
        py={3}
      >
        {label}
      </Button>
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="teal.500" p={4}>
      <Flex
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <Heading
            as={motion.h1}
            whileHover={{ scale: 1.1 }}
            color="white"
            size="md"
          >
            <Image
              src="/navbar.png"
              width="28"
              alt="Navbar logo"
              rounded="base"
            />
          </Heading>
        </Link>

        <Spacer />

        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle navigation"
          onClick={onToggle}
          colorScheme="teal"
          variant="outline"
          display={{ md: "none" }}
        />

        <Stack
          direction="row"
          spacing={4}
          display={{ base: "none", md: "flex" }}
        >
          {navItems.map((item) => (
            <NavButton key={item.path} {...item} />
          ))}
        </Stack>

        <ColorModeSwitcher />
      </Flex>

      {isOpen && (
        <VStack spacing={4} align="stretch" display={{ md: "none" }} mt={4}>
          {navItems.map((item) => (
            <NavButton key={item.path} {...item} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
