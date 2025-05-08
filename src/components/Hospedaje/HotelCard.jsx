import { motion } from 'framer-motion';
import { Box, Image, Text, Button, Badge } from '@chakra-ui/react';
import { FaStar, FaMapMarkedAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FaLocationDot } from 'react-icons/fa6';

const HotelCard = ({ hotel, onOpenMap }) => {
	const cardStyles = {
		container: {
			position: 'relative',
			borderRadius: 'xl',
			overflow: 'hidden',
			boxShadow: 'lg',
			transition: 'all 0.3s ease',
			_hover: {
				boxShadow: '2xl',
				transform: 'scale(1.05)',
			},
		},
		image: {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		},
		overlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: 'rgba(0, 0, 0, 0.5)',
			opacity: 0,
			transition: 'opacity 0.3s ease',
			_groupHover: {
				opacity: 1,
			},
		},
		content: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			textAlign: 'center',
			color: 'white',
			opacity: 0,
			transition: 'opacity 0.3s ease',
			_groupHover: {
				opacity: 1,
			},
		},
		badge: {
			position: 'absolute',
			top: 4,
			right: 4,
			background:
				'linear-gradient(90deg, rgba(255, 165, 0, 1) 0%, rgba(255, 69, 0, 1) 100%)',
			padding: '0.5rem 1rem',
			borderRadius: 'full',
			fontWeight: 'bold',
			fontSize: 'sm',
			color: 'white',
		},
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
		>
			<Box className='group w-full h-96 object-cover' {...cardStyles.container}>
				<Image src={hotel.image} alt={hotel.title} {...cardStyles.image} />
				<Box {...cardStyles.overlay} />
				<Box {...cardStyles.content}>
					<Text fontSize='xl' fontWeight='bold' mb={2}>
						{hotel.title}
					</Text>
					<Text>{hotel.description}</Text>
					<Button
						onClick={() => onOpenMap(hotel)}
						leftIcon={<FaMapMarkedAlt />}
						mt={4}
						colorScheme='teal'
						variant='outline'
					>
						Ver en mapa
					</Button>
				</Box>
				<Badge {...cardStyles.badge}>
					<FaLocationDot /> {hotel.location}
				</Badge>
				<Badge
					position='absolute'
					top={4}
					left={4}
					background='linear-gradient(90deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%)'
					padding='0.5rem 1rem'
					borderRadius='full'
					fontWeight='bold'
					fontSize='sm'
					color='white'
				>
					<FaStar /> Premium
				</Badge>
			</Box>
		</motion.div>
	);
};

HotelCard.propTypes = {
	hotel: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		mapUrl: PropTypes.string.isRequired,
		iframe: PropTypes.string.isRequired,
	}).isRequired,
	onOpenMap: PropTypes.func.isRequired,
};

export default HotelCard;
