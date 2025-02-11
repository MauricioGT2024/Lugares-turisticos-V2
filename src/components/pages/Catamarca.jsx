import {
  Card,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
  Button,
  Link as ChakraLink,
  ButtonGroup,
  CardBody,
  CardFooter,
  SimpleGrid,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { locations } from '../../data/catamarca'
import { useState } from "react"; // Importamos useState para manejar el estado del mapa

const LocationCard = ({ location }) => {
  const [isMapVisible, setIsMapVisible] = useState(true); // Estado para mostrar/ocultar el mapa

  // Función para ocultar el mapa
  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev); // Cambiar el estado entre true y false
  };

  return (
    <Card maxW="sm" width="100%" height="auto" overflow="hidden">
      <CardBody p={0} display="flex" flexDirection="column" justifyContent="space-between">
        {/* Imagen que cubre todo el espacio disponible sin distorsionarse */}
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <Image
            src={location.imgSrc}
            alt={location.title}
            borderRadius="lg"
            width="100%"
            height="100%"
            objectFit="cover"  // Asegura que la imagen se ajuste sin distorsionarse
            loading="lazy"
          />
        </div>
        
        <Stack mt="6" spacing="3" padding="1rem">
          <Heading size="md">{location.title}</Heading>
          <Text>{location.description}</Text>
        </Stack>
      </CardBody>

      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          {/* Botón para ver el mapa */}
          {isMapVisible && (
            <ChakraLink href={location.path} isExternal>
              <Button variant="solid" colorScheme="blue">
                Visitar Mapa
              </Button>
            </ChakraLink>
          )}
          
          {/* Botón para ocultar el mapa */}
          <Button onClick={toggleMapVisibility} variant="outline" colorScheme="red">
            {isMapVisible ? "Ocultar Mapa" : "Mostrar Mapa"}
          </Button>
        </ButtonGroup>
      </CardFooter>

      {/* Mostrar el mapa solo si isMapVisible es true */}
      {isMapVisible && (
        <div style={{ padding: "1rem" }}>
          <iframe
            src={location.mapSrc}
            width="100%"
            height="300"
            style={{ border: "none" }}
            loading="lazy"
          ></iframe>
        </div>
      )}
    </Card>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired,
};

const Catamarca = () => {
  return (
    <div className="catamarca-details">
      <SimpleGrid columns={3} gap={7}>
        {locations.map((location, index) => (
          <CSSTransition key={index} timeout={500} classNames="card" appear={true}>
            <LocationCard location={location} />
          </CSSTransition>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Catamarca;
