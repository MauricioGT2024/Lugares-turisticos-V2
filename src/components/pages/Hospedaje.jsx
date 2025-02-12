import { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Collapse,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { hospedajes } from "../../data/hospedajes";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const AnimatedCard = ({
  image,
  title,
  description,
  onToggle,
  showCollapse,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "gray.800" : "whiteAlpha.900";

  return (
    <MotionBox
      borderWidth="0px"
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      display="flex"
      flexDirection="column"
      boxShadow="xl"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "2xl",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      transition="all 0.3s ease"
      mb={{ base: 4, md: 6 }}
    >
      <Box
        height={{ base: "200px", md: "300px", lg: "400px" }}
        width="100%"
        position="relative"
        overflow="hidden"
      >
        <MotionImage
          src={image}
          alt={title}
          objectFit="cover"
          height="100%"
          width="100%"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition="all 0.3s ease"
        />
      </Box>

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color={textColor}
        width="100%"
      >
        <Heading
          size="md"
          fontWeight="bold"
          mb={2}
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        >
          {title}
        </Heading>
        <Text mb={3} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
          {description}
        </Text>
        <Button
          colorScheme="teal"
          onClick={onToggle}
          size="sm"
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          variant="solid"
        >
          {showCollapse ? "Ocultar Mapa" : "Ver Mapa"}
        </Button>
      </Box>
    </MotionBox>
  );
};

const CardContainer = () => {
  const [collapseStates, setCollapseStates] = useState(
    new Array(hospedajes.length).fill(false)
  );

  const toggleCollapse = (index) => {
    setCollapseStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
      mt={10}
      mx="auto"
      maxWidth="1200px"
      px={{ base: 4, md: 4 }}
    >
      {hospedajes.map((card, index) => (
        <Box key={index}>
          <AnimatedCard
            image={card.image}
            title={card.title}
            description={card.description}
            iframe={card.iframe}
            onToggle={() => toggleCollapse(index)}
            showCollapse={collapseStates[index]}
          />
          <Collapse in={collapseStates[index]} animateOpacity>
            <Box p="1rem" mt="4" bg="gray.50" rounded="md" shadow="md">
              <iframe
                src={card.iframe}
                width="100%"
                height="300"
                style={{ border: "none" }}
                loading="lazy"
                title={`Mapa de ${card.title}`}
              />
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default CardContainer;
