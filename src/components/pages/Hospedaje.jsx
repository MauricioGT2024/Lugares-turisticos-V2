import PropTypes from "prop-types";
import { useState } from "react";
import { hospedajes } from "../../data/hospedajes";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Collapse,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const Hospedaje = () => {
  const [showMap, setShowMap] = useState(null);

  return (
    <>
      <SimpleGrid columns={3} gap={8}>
        {hospedajes.map((loc, index) => {
          const { image, title, description, location, iframe } = loc;
          return (
            <Card key={index} maxW="sm">
              <CardBody>
                <Image src={image} alt={title} borderRadius="lg" boxSize="100%" objectFit="cover" height="400px"/>
                <div className="hospedaje-card__location">{location}</div>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{title}</Heading>
                  <Text>{description}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    className="hospedaje-card__map-button"
                    onClick={() =>
                      setShowMap(showMap === index ? null : index)
                    }
                  >
                    {showMap === index ? "🗺️ Ocultar Mapa" : "🗺️ Ver Ubicación"}
                  </Button>
                </ButtonGroup>
              </CardFooter>
              <Collapse in={showMap === index} animateOpacity>
                <Box
                  className={`hospedaje-card__map ${
                    showMap === index ? "show" : ""
                  }`}
                  mt={4}
                >
                  <iframe
                    src={iframe}
                    title={`Mapa de ${title}`}
                    loading="lazy"
                    allowFullScreen
                    width="100%"
                    height="400px"
                  />
                </Box>
              </Collapse>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

Hospedaje.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  iframe: PropTypes.string.isRequired,
};

export default Hospedaje;
