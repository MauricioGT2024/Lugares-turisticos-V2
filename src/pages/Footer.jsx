import { motion } from "framer-motion";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
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
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaMapMarkedAlt,
  FaHotel,
  FaInfoCircle,
  FaHome,
  FaHeart,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/TurismoCatamarca/?locale=es_LA",
      label: "Facebook",
    },
    { 
      icon: FaTwitter, 
      href: "https://x.com/catamarcatur?lang=es",
      label: "Twitter",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/turismocatamarca/?hl=es-la",
      label: "Instagram",
    },
  ];

  const navLinks = [
    { path: "/", label: "Inicio", icon: FaHome },
    { path: "/provincia", label: "Provincia", icon: FaMapMarkedAlt },
    { path: "/hospedaje", label: "Hospedaje", icon: FaHotel },
    { path: "/about", label: "Sobre Nosotros", icon: FaInfoCircle },
  ];

  return (
    <Box bg={bgColor} borderTopWidth="1px" borderColor={borderColor}>
      <Container maxW="8xl" py={10}>
        <SimpleGrid
          templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }}
          spacing={{ base: 8, md: 12 }}
        >
          <VStack align="start" spacing={6}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RouterLink to="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  height="60px"
                  objectFit="contain"
                />
              </RouterLink>
            </motion.div>
            
            <Text fontSize="sm" color={textColor} maxW="md">
              Descubre la magia de Catamarca con nosotros. Tu guía definitiva para explorar 
              los tesoros ocultos de esta hermosa provincia argentina.
            </Text>

            <HStack spacing={4}>
              {socialLinks.map((link, index) => (
                <Tooltip key={index} label={link.label} hasArrow>
                  <Box>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link href={link.href} isExternal>
                        <Icon
                          as={link.icon}
                          w={6}
                          h={6}
                          color={textColor}
                          _hover={{ color: hoverColor }}
                          transition="all 0.3s"
                        />
                      </Link>
                    </motion.div>
                  </Box>
                </Tooltip>
              ))}
            </HStack>
          </VStack>

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
            
            {navLinks.map((link) => (
              <Button
                key={link.path}
                as={RouterLink}
                to={link.path}
                variant="ghost"
                size="sm"
                leftIcon={<Icon as={link.icon} />}
                color={textColor}
                _hover={{
                  color: hoverColor,
                  transform: "translateX(4px)",
                }}
                transition="all 0.3s"
              >
                {link.label}
              </Button>
            ))}
          </VStack>

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
            
            <VStack align="start" spacing={2}>
              <Text fontSize="md" color={textColor}>
                Mauricio Sierra
              </Text>
              <HStack spacing={3}>
                <Link href="https://github.com/MauricioGT2024" isExternal>
                  <Icon
                    as={FaGithub}
                    w={5}
                    h={5}
                    color={textColor}
                    _hover={{ color: hoverColor }}
                  />
                </Link>
                <Link href="https://linkedin.com/in/creator" isExternal>
                  <Icon
                    as={FaLinkedin}
                    w={5}
                    h={5}
                    color={textColor}
                    _hover={{ color: hoverColor }}
                  />
                </Link>
                <Link href="https://discord.com/channels/@mauricio0392" isExternal>
                  <Icon
                    as={FaDiscord}
                    w={5}
                    h={5}
                    color={textColor}
                    _hover={{ color: hoverColor }}
                  />
                </Link>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor={borderColor} />

        <Flex
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
            <Icon as={FaHeart} color="red.400" w={4} h={4} />
            <Text>en Argentina</Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
