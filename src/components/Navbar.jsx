import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Button,
  IconButton,
  useDisclosure,
  Container,
  Stack,
  Image,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { FaHome, FaMapMarkedAlt, FaBed, FaInfoCircle } from "react-icons/fa";
import Hamburger from "./Hamburger";
const navItems = [
  { path: "/", label: "Inicio", icon: FaHome },
  {
    label: "Departamentos",
    path: "/provincia",
    icon: FaMapMarkedAlt,
    children: [
      { path: "/antofagasta", label: "Antofagasta" },
      { path: "/tinogasta", label: "Tinogasta" },
      { path: "/fiambala", label: "Fiambalá" },
      { path: "/catamarca", label: "Catamarca" },
    ],
  },
  { path: "/hospedaje", label: "Hospedaje", icon: FaBed },
  { path: "/about", label: "Sobre Nosotros", icon: FaInfoCircle },
];

const MotionBox = motion.create(Box);

const NavLink = ({ item, isMobile, onClose }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const linkColor = useColorModeValue("gray.700", "white");
  const hoverBg = useColorModeValue("teal.50", "teal.700");
  const activeBg = useColorModeValue("teal.500", "teal.200");
  const activeColor = useColorModeValue("white", "gray.800");

  const handleClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (item.children) {
    return (
      <Menu isLazy>
        <Flex align="center">
          <Link to={item.path} onClick={handleClick}>
            <Button
              variant="ghost"
              color={linkColor}
              leftIcon={<item.icon />}
              _hover={{
                bg: hoverBg,
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
            >
              {item.label}
            </Button>
          </Link>
          <MenuButton
            as={IconButton}
            icon={<ChevronDownIcon />}
            variant="ghost"
            size="sm"
            ml={1}
            _hover={{ bg: hoverBg }}
          />
        </Flex>
        <MenuList>
          {item.children.map((child) => (
            <MenuItem
              key={child.path}
              as={Link}
              to={child.path}
              onClick={handleClick}
              _hover={{ bg: hoverBg }}
            >
              {child.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Tooltip label={`Ir a ${item.label}`} placement="bottom" hasArrow>
      <MotionBox whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
        <Link to={item.path} onClick={handleClick}>
          <Button
            variant={isActive ? "solid" : "ghost"}
            bg={isActive ? activeBg : "transparent"}
            color={isActive ? activeColor : linkColor}
            leftIcon={<item.icon />}
            _hover={{
              bg: hoverBg,
              transform: "translateY(-2px)",
              shadow: "md",
            }}
            transition="all 0.2s"
          >
            {item.label}
          </Button>
        </Link>
      </MotionBox>
    </Tooltip>
  );
};

NavLink.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.func,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isMobile: PropTypes.bool,
  onClose: PropTypes.func,
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const menuBgColor = useColorModeValue("white", "gray.800");

  const MotionFlex = motion(Flex);

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={bgColor}
      boxShadow="sm"
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(8px)"
      backgroundColor={useColorModeValue(
        "rgba(255, 255, 255, 0.8)",
        "rgba(26, 32, 44, 0.8)"
      )}
    >
      <Container maxW="8xl" px={{ base: 2, md: 4 }}>
        <MotionFlex
          h={{ base: "4rem", md: "5rem" }}
          align="center"
          justify="space-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image
                src="/navbar.png"
                alt="Logo"
                h={{ base: "2.5rem", md: "3rem" }}
                objectFit="contain"
              />
            </motion.div>
          </Link>

          <Stack
            direction="row"
            spacing={{ base: 2, md: 4 }}
            align="center"
            display={{ base: "none", md: "flex" }}
          >
            <AnimatePresence>
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavLink item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
            <ColorModeSwitcher />
          </Stack>

          <Hamburger
            isOpen={isOpen}
            toggle={onOpen}
            color={useColorModeValue("gray.800", "white")}
          />
        </MotionFlex>
      </Container>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={{ base: "full", sm: "sm" }}
      >
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent bg={menuBgColor}>
          <DrawerHeader borderBottomWidth="1px" px={4}>
            <Flex justify="space-between" align="center">
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, teal.400, blue.500)"
                bgClip="text"
              >
                Menú Principal
              </Text>
              <DrawerCloseButton
                position="relative"
                right={0}
                top={0}
                _hover={{
                  transform: "rotate(90deg)",
                  color: "teal.500",
                }}
                transition="all 0.3s"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody py={6}>
            <VStack spacing={4} align="stretch">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                >
                  <NavLink item={item} isMobile onClose={onClose} />
                </motion.div>
              ))}
              <Divider my={4} />
              <Box textAlign="center">
                <ColorModeSwitcher
                  size="lg"
                  width="full"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                />
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
