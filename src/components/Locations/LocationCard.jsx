import PropTypes from 'prop-types';
import {
  Box,
  Image,
  Text,
  Heading,
  Badge,
  Button,
  Icon
} from '@chakra-ui/react';

const BaseLocationCard = ({ 
  location, 
  onClick,
  config = {},
  bg,
  borderColor
}) => {
  const { name, title, description, imgSrc, category, area } = location;
  const {
    colorScheme = 'blue',
    icon,
    color = `${colorScheme}.500`
  } = config;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg}
      borderColor={borderColor}
      boxShadow="md"
    >
      <Image src={imgSrc} alt={name || title} objectFit="cover" h="200px" w="100%" />

      <Box p="6">
        <Box display="flex" alignItems="center" gap={2}>
          {icon && <Icon as={icon} color={color} />}
          <Badge borderRadius="full" px="2" colorScheme={colorScheme}>
            {category || area}
          </Badge>
        </Box>

        <Heading mt="1" size="md" as="h3">
          {name || title}
        </Heading>

        <Text mt="2" noOfLines={3}>
          {description}
        </Text>

        <Button
          mt="4"
          colorScheme={colorScheme}
          variant="outline"
          onClick={onClick}
        >
          Ver detalles
        </Button>
      </Box>
    </Box>
  );
};

BaseLocationCard.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string,
    area: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  config: PropTypes.shape({
    colorScheme: PropTypes.string,
    icon: PropTypes.any,
    color: PropTypes.string,
  }),
  bg: PropTypes.string,
  borderColor: PropTypes.string,
};

export default BaseLocationCard;
