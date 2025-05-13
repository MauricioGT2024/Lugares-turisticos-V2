// TinogastaComponents.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaTimes, FaFilter } from 'react-icons/fa';
import {
	Box,
	Image,
	Text,
	Badge,
	Button,
	IconButton,
	SimpleGrid,
	Flex,
} from '@chakra-ui/react';
import { useTinogastaCategories } from './config';

// Chakra-wrapped motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);

// -----------------------------
// 📸 ImageHoverCard
// -----------------------------
const ImageHoverCard = ({ image, title, description, category, onClick }) => (
	<motion.article
		whileHover='hover'
		initial='initial'
		animate='animate'
		variants={{
			hover: {
				y: -8,
				boxShadow: '0 8px 32px rgba(80,0,120,0.18), 0 2px 8px rgba(0,0,0,0.10)',
				transition: { duration: 0.3, ease: 'easeOut' },
			},
		}}
		onClick={onClick}
		style={{ cursor: 'pointer' }}
	>
		<Box
			position='relative'
			h='420px'
			rounded='2xl'
			overflow='hidden'
			shadow='xl'
			bgGradient='linear(to-br, purple.900Alpha.80, purple.700Alpha.60, pink.500Alpha.40)'
			border='1px solid'
			borderColor='whiteAlpha.200'
			transition='all 0.3s'
			_hover={{ borderColor: 'purple.400Alpha.30' }}
		>
			<motion.div
				style={{ position: 'absolute', inset: 0 }}
				variants={{ hover: { scale: 1.05, transition: { duration: 0.6 } } }}
			>
				<Image
					src={image}
					alt={title}
					objectFit='cover'
					boxSize='100%'
					transition='transform 0.7s'
					_hover={{ transform: 'scale(1.10)' }}
					loading='lazy'
				/>
			</motion.div>

			{/* Overlay */}
			<motion.div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)',
					opacity: 0.8,
				}}
				variants={{ hover: { opacity: 0.9 } }}
			/>

			{/* Category badge */}
			<Box position='absolute' top='4' right='4'>
				<Badge
					px='4'
					py='1.5'
					bgGradient='linear(to-r, purple.500, pink.500)'
					color='white'
					fontSize='sm'
					fontWeight='semibold'
					rounded='full'
					shadow='lg'
					textTransform='uppercase'
					backdropFilter='blur(8px)'
					transition='transform 0.3s'
					_hover={{ transform: 'scale(1.05)' }}
				>
					{category}
				</Badge>
			</Box>

			{/* Title & description */}
			<motion.div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					padding: '2rem',
				}}
				variants={{
					hover: {
						y: 0,
						opacity: 1,
						transition: { duration: 0.4 },
					},
					initial: { y: 24, opacity: 0 },
				}}
			>
				<Text fontSize='3xl' fontWeight='extrabold' color='white' mb='2'>
					{title}
				</Text>
				<Text fontSize='lg' color='gray.200' noOfLines={2}>
					{description}
				</Text>
			</motion.div>
		</Box>
	</motion.article>
);

ImageHoverCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

// -----------------------------
// 📍 LocationCard
// -----------------------------
export const LocationCard = ({ location, onShowDetails }) => (
	<ImageHoverCard
		image={location.imgSrc}
		title={location.name}
		description={location.description}
		category={location.category}
		onClick={() => onShowDetails(location)}
	/>
);

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

// -----------------------------
// 🧭 AreaFilter
// -----------------------------
export const AreaFilter = memo(({ areaFilter, setAreaFilter }) => {
	const { categories } = useTinogastaCategories();

	return (
		<Box py={8} px={4}>
			<MotionBox
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				maxW='6xl'
				mx='auto'
				p={8}
				rounded='2xl'
				bgGradient='linear(to-br, purple.900Alpha.80, purple.700Alpha.60, pink.500Alpha.40)'
				border='1px solid'
				borderColor='whiteAlpha.200'
				shadow='2xl'
				backdropFilter='blur(16px)'
			>
				<Flex justify='space-between' align='center' mb={8}>
					<Flex align='center' gap={3}>
						<FaFilter size={20} color='rgba(196,150,255,0.9)' />
						<Text fontSize='2xl' fontWeight='bold' color='white'>
							Filtrar por categoría
						</Text>
					</Flex>

					{areaFilter && (
						<IconButton
							icon={<FaTimes />}
							onClick={() => setAreaFilter('')}
							aria-label='Quitar filtro'
							variant='ghost'
							colorScheme='pink'
							size='sm'
						/>
					)}
				</Flex>

				<SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
					{categories.map((cat) => (
						<MotionButton
							key={cat}
							onClick={() => setAreaFilter(cat)}
							whileHover={{ scale: 1.06 }}
							whileTap={{ scale: 0.98 }}
							variant='solid'
							w='full'
							px={5}
							py={4}
							fontWeight='semibold'
							fontSize='md'
							borderRadius='xl'
							colorScheme={areaFilter === cat ? 'pink' : 'gray'}
							bgGradient={
								areaFilter === cat
									? 'linear(to-r, purple.500, pink.500)'
									: 'rgba(255,255,255,0.05)'
							}
							color={areaFilter === cat ? 'white' : 'gray.200'}
							border={
								areaFilter === cat
									? '2px solid pink.400'
									: '1px solid whiteAlpha.200'
							}
						>
							{cat}
						</MotionButton>
					))}
				</SimpleGrid>
			</MotionBox>
		</Box>
	);
});

AreaFilter.displayName = 'AreaFilter';

AreaFilter.propTypes = {
	areaFilter: PropTypes.string.isRequired,
	setAreaFilter: PropTypes.func.isRequired,
};
