import { useState, useMemo } from 'react';
import {
	Box,
	Container,
	Heading,
	Text,
	useColorModeValue,
	SimpleGrid,
	VStack,
	Badge,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/tinogasta';
import LocationCard from '../components/Tinogasta/LocationCard';
import { cardAnimation } from '../components/Tinogasta/animations';
import AreaFilter from '../components/Tinogasta/AreaFilter';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
	Image,
	HStack,
	IconButton,
	Tooltip,
	Button,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaWikipediaW } from 'react-icons/fa';

const Tinogasta = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [areaFilter, setAreaFilter] = useState('');
	const bgColor = useColorModeValue('gray.50', 'gray.900');
	const textColor = useColorModeValue('gray.800', 'gray.100');
	const modalBgColor = useColorModeValue('gray.50', 'gray.800');

	const handleShowDetails = (location) => {
		setSelectedLocation(location);
		onOpen();
	};

	const filteredLocations = useMemo(
		() =>
			areaFilter
				? locations.filter((loc) => loc.category === areaFilter)
				: locations,
		[areaFilter]
	);

	return (
		<Box bg={bgColor} minH='100vh' py={12}>
			<Container maxW='8xl' px={{ base: 4, md: 8 }}>
				<VStack spacing={8} align='stretch'>
					<motion.div {...cardAnimation}>
						<VStack spacing={4} textAlign='center' mb={8}>
							<Badge
								colorScheme='purple'
								px={4}
								py={1}
								borderRadius='full'
								fontSize='sm'
							>
								Explora Tinogasta
							</Badge>
							<Heading
								as='h1'
								size='2xl'
								bgGradient='linear(to-r, purple.400, red.400, orange.400)'
								bgClip='text'
								fontFamily='JetBrains Mono'
								letterSpacing='tight'
								mb={2}
								_hover={{
									bgGradient: 'linear(to-r, red.400, orange.400, purple.400)',
								}}
								transition='all 0.3s ease'
							>
								Tinogasta
							</Heading>
							<Text fontSize='xl' color={textColor} maxW='3xl' mx='auto'>
								Descubre Tinogasta, una joya en el oeste de Catamarca, donde la
								tradición vitivinícola se une con paisajes impresionantes y una
								rica historia cultural.
							</Text>
						</VStack>
					</motion.div>

					<AreaFilter areaFilter={areaFilter} setAreaFilter={setAreaFilter} />

					<SimpleGrid
						columns={{ base: 1, lg: 2, xl: 3 }}
						spacing={8}
						as={motion.div}
						layout
					>
						<AnimatePresence mode='wait'>
							{filteredLocations.map((location) => (
								<LocationCard
									key={location.id}
									location={location}
									onShowDetails={() => handleShowDetails(location)}
								/>
							))}
						</AnimatePresence>
					</SimpleGrid>
				</VStack>
				{selectedLocation && (
					<Modal isOpen={isOpen} onClose={onClose} size='lg'>
						<ModalOverlay />
						<ModalContent bg={modalBgColor} color={textColor}>
							<ModalHeader>{selectedLocation.name}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Image
									src={selectedLocation.imgSrc}
									alt={selectedLocation.name}
									borderRadius='md'
									mb={2}
									aria-label={selectedLocation.name}
									transition='0.3s ease-in-out'
								/>
								<Text mb={4}>{selectedLocation.description}</Text>
								<Box borderRadius='md' overflow='hidden'>
									<iframe
										src={selectedLocation.iframe}
										width='100%'
										height='300px'
										style={{ border: 0 }}
										allowFullScreen
										title={selectedLocation.name}
									/>
								</Box>
							</ModalBody>
							<ModalFooter>
								<HStack spacing={4}>
									<Tooltip label='Ver en Wikipedia'>
										<IconButton
											as='a'
											href={selectedLocation.wiki}
											isExternal
											icon={<FaWikipediaW />}
											aria-label='Wikipedia'
											colorScheme='gray'
										/>
									</Tooltip>
									<Tooltip label='Ver en Google Maps'>
										<IconButton
											as='a'
											href={selectedLocation.mapUrl}
											isExternal
											icon={<FaMapMarkerAlt />}
											aria-label='Google Maps'
											colorScheme='blue'
										/>
									</Tooltip>
									<Button colorScheme='red' onClick={onClose}>
										Cerrar
									</Button>
								</HStack>
							</ModalFooter>
						</ModalContent>
					</Modal>
				)}
			</Container>
		</Box>
	);
};

export default Tinogasta;
