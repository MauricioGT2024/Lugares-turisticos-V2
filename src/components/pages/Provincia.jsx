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
} from "@chakra-ui/react";
import { departamentos } from "../../data/departamentos";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";

import { SimpleGrid } from "@chakra-ui/react";
const Provincia = () => {
  return (
    <>
      <SimpleGrid columns={4} gap={7}>
        {departamentos.map((loc, index) => (
          <Card key={index} maxW="sm">
            <CardBody>
              <Image src={loc.image} alt={loc.id} borderRadius="3xl" />
              <Stack mt="6" spacing="3">
                <Heading size="md">{loc.name}</Heading>
                <Text>{loc.description}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <ChakraLink as={ReactRouterLink} to={loc.path} textDecoration="none" >
                  <Button variant="solid" colorScheme="blue">
                    {` Visitar ${loc.name}`}
                  </Button>
                </ChakraLink>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

Provincia.PropTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  iframe: PropTypes.string.isRequired,
};
export default Provincia;
