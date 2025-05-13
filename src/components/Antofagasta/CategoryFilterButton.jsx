import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useColorModeValue } from '@chakra-ui/react';

const CategoryFilterButton = ({ item, selected, onClick }) => {
	const bg = useColorModeValue('gray.200', 'gray.700');
	const hoverBg = useColorModeValue('gray.300', 'gray.600');
	const unselectedColor = useColorModeValue('gray.700', 'gray.300');

	const selectedBg = 'blue.600';
	const selectedHoverBg = 'blue.700';

	return (
		<Button
			onClick={onClick}
			aria-pressed={selected}
			px={5}
			py={2}
			borderRadius='full'
			fontWeight='medium'
			fontSize='sm'
			variant='solid'
			bg={selected ? selectedBg : bg}
			color={selected ? 'white' : unselectedColor}
			_hover={{ bg: selected ? selectedHoverBg : hoverBg }}
			_focus={{ boxShadow: 'outline' }}
			boxShadow={selected ? 'md' : 'sm'}
		>
			{item}
		</Button>
	);
};

CategoryFilterButton.propTypes = {
	item: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default CategoryFilterButton;
