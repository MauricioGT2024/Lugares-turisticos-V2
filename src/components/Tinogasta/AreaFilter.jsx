import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  useColorModeValue,
  Stack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useCategoryConfig } from '../Locations/useCategoryConfig';

const MotionButton = motion(Button);

const AreaFilter = memo(({ areaFilter, setAreaFilter }) => {
  const { categories } = useCategoryConfig();
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const selectedBgColor = useColorModeValue('purple.500', 'purple.200');
  const selectedTextColor = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  const clearFilter = () => setAreaFilter('');

  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    tap: { scale: 0.95 },
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      boxSize="auto"
      maxW="100dvh"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Stack
        direction={['row']}
        wrap="wrap"
        spacing={2}
        justifyContent="center"
        align="center"
        width="100%"
      >
        {categories.map((category) => (
          <MotionButton
            key={category}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            size="sm"
            borderRadius="full"
            px={4}
            fontSize="sm"
            fontWeight="medium"
            color={areaFilter === category ? selectedTextColor : textColor}
            bg={areaFilter === category ? selectedBgColor : bgColor}
            _hover={{ bg: hoverColor }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => setAreaFilter(category)}
            aria-label={`Filtrar por ${category}`}
          >
            {category}
          </MotionButton>
        ))}
      </Stack>
      {areaFilter && (
        <Tooltip label="Quitar filtro">
          <IconButton
            aria-label="Quitar filtro"
            icon={<FaTimes />}
            size="sm"
            colorScheme="purple"
            variant="ghost"
            onClick={clearFilter}
            mt={2}
            _hover={{ bg: hoverColor }}
          />
        </Tooltip>
      )}
    </Box>
  );
});

AreaFilter.propTypes = {
  areaFilter: PropTypes.string.isRequired,
  setAreaFilter: PropTypes.func.isRequired,
};

export default AreaFilter;
