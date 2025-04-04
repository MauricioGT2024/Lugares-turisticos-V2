import React, { memo } from 'react';
import {
	Box,
	Stack,
	Button,
	Input,
	Select,
	useColorModeValue,
	Text,
	Icon,
	Tooltip,
} from '@chakra-ui/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FilterConfig, ActiveFilters } from './types';

interface FilterSystemProps {
	filters: FilterConfig[];
	activeFilters: ActiveFilters;
	onFilterChange: (filterId: string, value: string) => void;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onClearAll: () => void;
}

const FilterSystem: React.FC<FilterSystemProps> = ({
	filters,
	activeFilters,
	onFilterChange,
	searchQuery,
	onSearchChange,
	onClearAll,
}) => {
	const bgColor = useColorModeValue('white', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.700');
	const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.200');

	return (
		<Box
			p={4}
			bg={bgColor}
			borderWidth='1px'
			width={'50vh'}
			justifyItems={'flex-start'}
			alignItems={'flex-start'}
			mx={'5px'}
			borderColor={borderColor}
			borderRadius='lg'
			boxShadow='sm'
		>
			<Stack spacing={4}>
				{/* Filter Controls */}
				<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
					{filters.map((filter) => (
						<Box key={filter.id} flex={1}>
							<Text fontSize='sm' mb={2} fontWeight='medium'>
								{filter.label}
							</Text>
							<Select
								placeholder={`Todos los ${filter.label.toLowerCase()}`}
								value={activeFilters[filter.id] || ''}
								onChange={(e) => onFilterChange(filter.id, e.target.value)}
							>
								{filter.options.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Select>
						</Box>
					))}
				</Stack>

				{/* Clear All Button */}
				{Object.values(activeFilters).some(Boolean) || searchQuery ? (
					<Button
						leftIcon={<FaTimes />}
						variant='outline'
						size='sm'
						onClick={onClearAll}
						alignSelf='flex-end'
						_hover={{ bg: hoverBg }}
					>
						Limpiar filtros
					</Button>
				) : null}
			</Stack>
		</Box>
	);
};

export default memo(FilterSystem);
