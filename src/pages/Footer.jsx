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
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/TurismoCatamarca/?locale=es_LA",
    },
    { icon: FaTwitter, href: "https://x.com/catamarcatur?lang=es" },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/turismocatamarca/?hl=es-la",
    },
  ];

  return (
    <Box bg={bgColor} borderTopWidth="1px" borderColor={borderColor}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr", md: "2fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <Box>
                  <Image
                    src="/public/logo.png"
                    alt="Logo"
                    width="150px"
                    mb={4}
                  />
                </Box>
              </Link>
            </motion.div>
            <Text fontSize={"sm"} color={textColor}>
              © 2025 Catamarca Turismo. Todos los derechos reservados.
            </Text>
            <Stack direction={"row"} spacing={6}>
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href={link.href} isExternal>
                    <Icon
                      as={link.icon}
                      w={6}
                      h={6}
                      color={textColor}
                      _hover={{ color: "blue.500" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </Stack>
            <Text fontSize={"sm"} color={textColor}></Text>
          </Stack>

          <Box>
            <Text
              fontWeight={"500"}
              fontSize={"lg"}
              mb={2}
              color={headingColor}
            >
              Desarollado Por Mauricio Sierra
            </Text>
            <Stack direction={"row"} spacing={4}>
              <Link href="https://github.com/MauricioGT2024" isExternal>
                <Icon
                  as={FaGithub}
                  w={6}
                  h={6}
                  color={textColor}
                  _hover={{ color: "blue.500" }}
                />
              </Link>
              <Link href="https://linkedin.com/in/creator" isExternal>
                <Icon
                  as={FaLinkedin}
                  w={6}
                  h={6}
                  color={textColor}
                  _hover={{ color: "blue.500" }}
                />
              </Link>
              <Link href="https://twitter.com/creator" isExternal>
                <Icon
                  as={FaTwitter}
                  w={6}
                  h={6}
                  color={textColor}
                  _hover={{ color: "blue.500" }}
                />
              </Link>
            </Stack>
          </Box>

          <Box>
            <Text
              fontWeight={"500"}
              fontSize={"lg"}
              mb={2}
              color={headingColor}
            >
              Enlaces Rápidos
            </Text>
            <Flex
              display="inline-flex"
              alignItems="center"
              flexWrap="wrap"
              gap={4}
            >
              <Link href={"/about"} color={textColor}>
                Sobre Nosotros
              </Link>
              <Link href={"/provincia"} color={textColor}>
                Provincia
              </Link>
              <Link href={"/hospedaje"} color={textColor}>
                Hospedaje
              </Link>
            </Flex>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
