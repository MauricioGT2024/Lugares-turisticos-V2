import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  HStack,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaWikipediaW } from "react-icons/fa";
import PropTypes from "prop-types";

const LocationCard = ({ location }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBgColor = useColorModeValue("white", "gray.700");
  const modalBgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.100");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={cardBgColor}
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
      >
        <Image src={location.imgSrc} alt={location.name} h="200px" w="100%" objectFit="cover" />
        <VStack p={4} align="start">
          <Heading size="sm" fontWeight="bold" color={textColor}>
            {location.name}
          </Heading>
          <Text color={textColor} fontSize="sm" noOfLines={3}>
            {location.description}
          </Text>
          <Button size="xs" onClick={onOpen} colorScheme="purple">
            Ver más
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg={modalBgColor} color={textColor}>
          <ModalHeader>{location.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={location.imgSrc} alt={location.name} borderRadius="md" mb={2} />
            <Text mb={4}>{location.description}</Text>
            <Box borderRadius="md" overflow="hidden">
              <iframe
                src={location.iframe}
                width="100%"
                height="300px"
                style={{ border: 0 }}
                allowFullScreen
                title={location.name}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Tooltip label="Ver en Wikipedia">
                <IconButton
                  as="a"
                  href={location.wiki}
                  isExternal
                  icon={<FaWikipediaW />}
                  aria-label="Wikipedia"
                  colorScheme="gray"
                />
              </Tooltip>
              <Tooltip label="Ver en Google Maps">
                <IconButton
                  as="a"
                  href={location.mapUrl}
                  isExternal
                  icon={<FaMapMarkerAlt />}
                  aria-label="Google Maps"
                  colorScheme="blue"
                />
              </Tooltip>
              <Button colorScheme="red" onClick={onClose}>
                Cerrar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    wiki: PropTypes.string.isRequired,
    iframe: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(LocationCard);
