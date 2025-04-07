import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
	Box,
	Image,
	Heading,
	Text,
	Badge,
	VStack,
	Icon,
	useColorModeValue,
} from '@chakra-ui/react';
import { categoryConfig } from './categoryConfig';
import { ANTOFAGASTA_ANIMATIONS } from './config/animations';

const LocationCard = ({ location, onShowDetails }) => {
	const config = categoryConfig[location.categoria] || categoryConfig.Campo;

	return (
		<Box
			as={motion.div}
			variants={ANTOFAGASTA_ANIMATIONS.cardVariants}
			whileHover='hover'
			role='article'
			cursor='pointer'
			onClick={() => onShowDetails(location.id)}
			position='relative'
			borderRadius='xl'
			overflow='hidden'
			bg={useColorModeValue('white', 'gray.800')}
			boxShadow='xl'
		>
			<Box position='relative' h='250px'>
				<Image
					src={location.imgSrc}
					alt={location.title}
					objectFit='cover'
					w='full'
					h='full'
					transition='transform 0.3s ease'
					_groupHover={{ transform: 'scale(1.05)' }}
				/>
				<Badge
					position='absolute'
					top={4}
					right={4}
					px={3}
					py={1}
					borderRadius='full'
					bgGradient={config.gradient}
					color='white'
					backdropFilter='blur(8px)'
					boxShadow='lg'
				>
					<Icon as={config.icon} mr={2} />
					{location.categoria}
				</Badge>
			</Box>

			<VStack p={6} spacing={3} align='start'>
				<Heading size='md' color={`${config.color}`}>
					{location.title}
				</Heading>
				<Text noOfLines={3} color={useColorModeValue('gray.600', 'gray.300')}>
					{location.description}
				</Text>
			</VStack>
		</Box>
	);
};

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		mapSrc: PropTypes.string.isRequired,
		path: PropTypes.string,
		wiki: PropTypes.string,
		categoria: PropTypes.string.isRequired,
		area: PropTypes.string,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
