import { memo } from "react";
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
  VStack,
  Button,
  Divider,
  Tooltip,
  HStack,
  chakra,
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
  FaExternalLinkAlt,
  FaLinkedin,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { DiGithubBadge } from "react-icons/di";
import PropTypes from "prop-types";
import { FaDiscord } from "react-icons/fa6";

// Componentes Motion optimizados
const MotionBox = chakra(motion.div);
const MotionFlex = chakra(motion.div, {
  baseStyle: { display: "flex" },
});

// Animaciones reutilizables
const animations = {
  socialHover: {
    scale: 1.2,
    rotate: 5,
    transition: { duration: 0.2 },
  },
  linkHover: {
    x: 4,
    transition: { duration: 0.2 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
};

// Componente SocialLink optimizado
const SocialLink = memo(({ icon, href, label }) => {
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Tooltip label={label} hasArrow placement="top">
      <MotionBox
        whileHover={animations.socialHover}
        display="inline-block"
        aria-label={label}
      >
        <Link
          href={href}
          isExternal
          display="flex"
          alignItems="center"
          aria-label={`Visitar ${label}`}
        >
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
});
SocialLink.displayName = "SocialLink";

SocialLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

// Componente DeveloperLink memoizado
const DeveloperLink = memo(({ icon, href, label }) => {
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Tooltip label={label} hasArrow placement="top">
      <MotionBox
        whileHover={animations.socialHover}
        display="inline-block"
        aria-label={label}
      >
        <Link
          href={href}
          isExternal
          display="flex"
          alignItems="center"
          aria-label={`Visitar ${label}`}
        >
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
});

DeveloperLink.displayName = "DeveloperLink";

DeveloperLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

// Componente NavLink optimizado
 const NavLink = memo(({ icon, label, to }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  return (
    <MotionBox whileHover={animations.linkHover}>
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
          bg: useColorModeValue("gray.100", "gray.700"),
        }}
        transition="all 0.3s"
        aria-label={label}
      >
        {label}
      </Button>
    </MotionBox>
  );
});
NavLink.displayName = "NavLink";

NavLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

// Componente Footer principal
const Footer = memo(() => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.700", "gray.200");

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/TurismoCatamarca/?locale=es_LA",
      label: "Facebook de Turismo Catamarca",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/catamarcatur?lang=es",
      label: "Twitter de Turismo Catamarca",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/turismocatamarca/?hl=es-la",
      label: "Instagram de Turismo Catamarca",
    },
  ];

  const developerLink = [
    {
      icon: DiGithubBadge,
      href: "https://github.com/MauricioGT2024",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mauricio-sierra/",
      label: "Linkedin",
    },
    {
      icon: FaDiscord,
      href: "https://discord.com/users/mauricio0392",
      label: "Discord",
    },
  ];

  const navLinks = [
    { icon: FaHome, label: "Inicio", to: "/" },
    { icon: FaMapMarkedAlt, label: "Provincia", to: "/provincia" },
    { icon: FaHotel, label: "Hospedaje", to: "/hospedaje" },
    { icon: FaInfoCircle, label: "Sobre Nosotros", to: "/about" },
  ];

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTopWidth="1px"
      borderColor={borderColor}
      position="relative"
      zIndex={2}
    >
      <Container maxW="8xl" py={10}>
        <SimpleGrid
          templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }}
          spacing={{ base: 8, md: 12 }}
        >
          {/* Sección Logo y Descripción */}
          <VStack align="start" spacing={6}>
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <RouterLink to="/">
                <Image
                  src="/logo.png"
                  alt="Logo de Catamarca Turismo"
                  height="60px"
                  objectFit="contain"
                  loading="lazy"
                />
              </RouterLink>
            </MotionBox>

            <Text fontSize="sm" color={textColor} maxW="md" lineHeight="tall">
              Descubre la magia de Catamarca con nosotros. Tu guía definitiva
              para explorar los tesoros ocultos de esta hermosa provincia
              argentina.
            </Text>

            <HStack spacing={4} wrap="wrap">
              {socialLinks.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </HStack>
            <Link
              href="https://www.visitcatamarca.com/"
              isExternal
              color={textColor}
              _hover={{ color: "teal.500" }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              Sitio Oficial <Icon as={FaExternalLinkAlt} w={3} h={3} />
            </Link>
          </VStack>

          {/* Enlaces Rápidos */}
          <VStack align="start" spacing={4}>
            <Text
              fontWeight="600"
              fontSize="lg"
              color={headingColor}
              borderBottom="2px"
              borderColor="teal.500"
              pb={2}
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-2px",
                left: "0",
                width: "30%",
                height: "2px",
                bg: "teal.500",
                transition: "width 0.3s ease",
              }}
              _hover={{
                _after: {
                  width: "100%",
                },
              }}
            >
              Enlaces Rápidos
            </Text>

            <VStack align="start" spacing={2} width="full">
              {navLinks.map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </VStack>
          </VStack>

          {/* Sección Desarrollador */}
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
            <Text fontSize="sm" color={textColor}>
              Redes Sociales y Contacto: 
            </Text>
            <HStack spacing={4} wrap="wrap">
              {developerLink.map((link) => (
                <DeveloperLink key={link.href} {...link} />
              ))}
            </HStack>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor={borderColor} />

        <MotionFlex
          {...animations.fadeInUp}
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="center"
          color={textColor}
          fontSize="sm"
          gap={2}
        >
          <Text>© {new Date().getFullYear()} Catamarca Turismo.</Text>
          <HStack spacing={1}>
            <Text>Hecho con</Text>
            <Icon
              as={FaHeart}
              color="red.400"
              w={4}
              h={4}
              animation="pulse 1.5s infinite"
              sx={{
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.2)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
            <Text>en Argentina</Text>
          </HStack>
        </MotionFlex>
      </Container>
    </Box>
  );
});

Footer.displayName = "Footer";
export default Footer;
