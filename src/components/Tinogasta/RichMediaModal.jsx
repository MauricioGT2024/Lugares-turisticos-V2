import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	IconButton,
	Image,
	Text,
	Box,
	Link,
	Flex,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaWikipediaW, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Convertir los componentes Chakra en componentes animados con Framer Motion
const MotionModalContent = motion(ModalContent);
const MotionModalHeader = motion(ModalHeader);
const MotionModalBody = motion(ModalBody);
const MotionModalFooter = motion(ModalFooter);

const RichMediaModal = ({ location, onClose }) => (
	<Modal isOpen onClose={onClose} size='lg' isCentered>
		<ModalOverlay />
		{/* ModalContent con animación */}
		<MotionModalContent
			bg='gray.900'
			color='white'
			maxW='400px'
			w='auto'
			height='auto'
			rounded='lg'
			overflow='hidden'
			boxShadow='lg'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.3 }}
		>
			{/* Header: Imagen con animación de entrada */}
			<MotionModalHeader
				p={0}
				bg='transparent'
				boxShadow='sm'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Image
					src={location.imgSrc}
					alt={location.name}
					objectFit='cover'
					width='100%'
					height='auto'
					borderTopRadius='lg'
				/>
			</MotionModalHeader>

			{/* Body: Contenido con animación */}
			<MotionModalBody
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* Layout con Flex: Izquierda (Descripción) y Derecha (Iframe Embed) */}
				<Flex
					direction={{ base: 'column', md: 'row' }}
					justify='space-between'
					align='center'
					gap={8}
				>
					{/* Descripción */}
					<Box flex='1' maxW='500px'>
						<Text fontSize='lg' mb={4} noOfLines={5}>
							{location.descriptionLong || location.description}
						</Text>
					</Box>

					{/* Iframe Embed */}
					<Box
						flex='1'
						rounded='lg'
						overflow='hidden'
						border='1px'
						borderColor='whiteAlpha.200'
					>
						<iframe
							src={location.iframe}
							title={location.name}
							className='w-full h-[250px]'
							style={{ border: 0 }}
							allowFullScreen
						/>
					</Box>
				</Flex>
			</MotionModalBody>

			{/* Footer: Botones de interacción */}
			<MotionModalFooter
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				gap={3}
			>
				{location.wiki && (
					<IconButton
						as={Link}
						href={location.wiki}
						aria-label='Wikipedia'
						icon={<FaWikipediaW />}
						isExternal
						variant='ghost'
						colorScheme='purple'
					/>
				)}
				{location.mapUrl && (
					<IconButton
						as={Link}
						href={location.mapUrl}
						aria-label='Ver en Google Maps'
						icon={<FaMapMarkerAlt />}
						isExternal
						variant='ghost'
						colorScheme='blue'
					/>
				)}
				<IconButton
					onClick={onClose}
					aria-label='Cerrar'
					icon={<FaTimes />}
					variant='ghost'
					colorScheme='red'
				/>
			</MotionModalFooter>
		</MotionModalContent>
	</Modal>
);

RichMediaModal.propTypes = {
	location: PropTypes.shape({
		name: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		descriptionLong: PropTypes.string,
		iframe: PropTypes.string.isRequired,
		wiki: PropTypes.string,
		mapUrl: PropTypes.string,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};
RichMediaModal.displayName = 'RichMediaModal';

export default RichMediaModal;
