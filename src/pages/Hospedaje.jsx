import { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Collapse,
  useColorMode,
  Select,
  Stack,
  ScaleFade,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { hospedajes } from "../data/hospedajes";
import PropTypes from "prop-types";

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
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      display="grid"
      gridTemplateRows="1fr auto"
      boxShadow="xl"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      mb={{ base: 4, md: 6 }}
      style={{ willChange: "transform" }}
    >
      <ScaleFade initialScale={0.9} in={true}>
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
            _hover={{ transform: "scale(1.1)" }}
            transition="all 0.2s"
          >
            {showCollapse ? "Ocultar Mapa" : "Ver Mapa"}
          </Button>
        </Box>
      </ScaleFade>
    </MotionBox>
  );
};

AnimatedCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  showCollapse: PropTypes.bool.isRequired,
};

const CardContainer = () => {
  const [collapseStates, setCollapseStates] = useState(
    new Array(hospedajes.length).fill(false)
  );
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = [...new Set(hospedajes.map((h) => h.location))];
  const filteredHospedajes =
    selectedDepartment === "all"
      ? hospedajes
      : hospedajes.filter((h) => h.location === selectedDepartment);

  const toggleCollapse = (index) => {
    setCollapseStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

  return (
    <>
      <Stack direction="row" spacing={4} mt={4} mb={8} maxW="15em" mx="auto">
        <Select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          bg={useColorModeValue("white", "gray.700")}
        >
          <option value="all">Todos los departamentos</option>
          {departments.map((dept, i) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </Select>
      </Stack>
      <SimpleGrid
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
        {filteredHospedajes.map((card, index) => (
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
      </SimpleGrid>
    </>
  );
};

export default CardContainer;
