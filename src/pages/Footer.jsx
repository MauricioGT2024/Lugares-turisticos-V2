import { motion } from "framer-motion";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Link,
  Image,
  useColorModeValue,
  Icon,
  Flex,
  VStack,
  Button,
  Divider,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkedAlt,
  FaHotel,
  FaInfoCircle,
  FaHome,
  FaHeart,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const SocialLink = ({ icon, href, label }) => {
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Tooltip label={label} hasArrow>
      <MotionBox
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Link href={href} isExternal>
          <Icon
            as={icon}
            w={6}
            h={6}
            color={iconColor}
            _hover={{ color: hoverColor }}
            transition="all 0.3s"
          />
        </Link>
      </MotionBox>
    </Tooltip>
  );
};

const NavButton = ({ icon, label, to }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Button
      as={RouterLink}
      to={to}
      variant="ghost"
      size="sm"
      leftIcon={<Icon as={icon} />}
      color={textColor}
      _hover={{
        color: hoverColor,
        transform: "translateX(4px)",
      }}
      transition="all 0.3s"
    >
      {label}
    </Button>
  );
};

const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.700", "gray.200");

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/TurismoCatamarca/?locale=es_LA", label: "Facebook" },
    { icon: FaTwitter, href: "https://x.com/catamarcatur?lang=es", label: "Twitter" },
    { icon: FaInstagram, href: "https://www.instagram.com/turismocatamarca/?hl=es-la", label: "Instagram" },
  ];

  const navLinks = [
    { icon: FaHome, label: "Inicio", to: "/" },
    { icon: FaMapMarkedAlt, label: "Provincia", to: "/provincia" },
    { icon: FaHotel, label: "Hospedaje", to: "/hospedaje" },
    { icon: FaInfoCircle, label: "Sobre Nosotros", to: "/about" },
  ];

  return (
    <Box bg={bgColor} borderTopWidth="1px" borderColor={borderColor}>
      <Container maxW="8xl" py={10}>
        <SimpleGrid
          templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }}
          spacing={{ base: 8, md: 12 }}
        >
          {/* Logo y descripción */}
          <VStack align="start" spacing={6}>
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <RouterLink to="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  height="60px"
                  objectFit="contain"
                />
              </RouterLink>
            </MotionBox>
            
            <Text fontSize="sm" color={textColor} maxW="md">
              Descubre la magia de Catamarca con nosotros. Tu guía definitiva para explorar 
              los tesoros ocultos de esta hermosa provincia argentina.
            </Text>

            <HStack spacing={4}>
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </HStack>
          </VStack>

          {/* Enlaces rápidos */}
          <VStack align="start" spacing={4}>
            <Text
              fontWeight="600"
              fontSize="lg"
              color={headingColor}
              borderBottom="2px"
              borderColor="teal.500"
              pb={2}
            >
              Enlaces Rápidos
            </Text>
            
            <VStack align="start" spacing={2} width="full">
              {navLinks.map((link) => (
                <NavButton key={link.label} {...link} />
              ))}
            </VStack>
          </VStack>

          {/* Copyright */}
          <VStack align="start" spacing={4}>
            <Text
              fontWeight="600"
              fontSize="lg"
              color={headingColor}
              borderBottom="2px"
              borderColor="teal.500"
              pb={2}
            >
              Desarrollado Por
            </Text>
            <Text fontSize="md" color={textColor}>
              Mauricio Sierra
            </Text>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor={borderColor} />

        <MotionFlex
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="center"
          color={textColor}
          fontSize="sm"
          gap={2}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text>© {new Date().getFullYear()} Catamarca Turismo.</Text>
          <HStack spacing={1}>
            <Text>Hecho con</Text>
            <Icon as={FaHeart} color="red.400" w={4} h={4} />
            <Text>en Argentina</Text>
          </HStack>
        </MotionFlex>
      </Container>
    </Box>
  );
};

export default Footer;
