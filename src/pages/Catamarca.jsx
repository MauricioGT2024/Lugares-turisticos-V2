import { useState, useMemo, useCallback } from 'react';
import {
	Box,
	Container,
	SimpleGrid,
	VStack,
	Heading,
	Text,
	Badge,
	useColorModeValue,
	Wrap,
	WrapItem,
	useBreakpointValue,
	chakra,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Link,
} from '@chakra-ui/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import {
	AreaFilter,
	CatamarcaLocationCard as LocationCard,
	ANIMATION_PRESETS as animations,
} from '../components/Catamarca';
import { getAreaTheme } from '../components/Catamarca/config/areaConfig';
import { locations } from '../data/catamarca';
import React from 'react';

const MotionBox = chakra(motion.div);

const Catamarca = () => {
	const [selectedArea, setSelectedArea] = useState('all');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const bgGradient = useColorModeValue(
		'linear(to-b, gray.50, white)',
		'linear(to-b, gray.900, gray.800)'
	);
	const textColor = useColorModeValue('gray.600', 'gray.300');
	const modalBgColor = useColorModeValue('white', 'gray.800');
	const modalTextColor = useColorModeValue('gray.700', 'gray.200');
	const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

	const handleShowDetails = useCallback(
		(id) => {
			const foundLocation = locations.find((loc) => loc.id === id);
			if (foundLocation) {
				setSelectedLocationData(foundLocation);
				onOpen();
			}
		},
		[onOpen]
	);

	const handleCloseModal = () => {
		onClose();
		setSelectedLocationData(null);
	};

	const { filteredLocations, areas } = useMemo(() => {
		const filtered =
			selectedArea === 'all'
				? locations
				: locations.filter((loc) => loc.area === selectedArea);

		const uniqueAreas = [...new Set(locations.map((loc) => loc.area))];
		return { filteredLocations: filtered, areas: uniqueAreas };
	}, [selectedArea]);

	return (
		<LayoutGroup>
			<Box bgGradient={bgGradient} minH='100vh' py={12} role='main'>
				<Container maxW='7xl'>
					<VStack spacing={8}>
						<MotionBox {...animations.fadeIn}>
							<VStack spacing={4} textAlign='center'>
								<Badge
									colorScheme='yellow'
									px={4}
									py={1}
									borderRadius='full'
									fontSize='sm'
								>
									Capital Histórica
								</Badge>

								<Heading
									as={motion.h1}
									size='2xl'
									bgGradient='linear(to-r, yellow.400, green.400, yellow.400)'
									bgClip='text'
									whileHover={{ scale: 1.05 }}
									transition={{ type: 'spring', stiffness: 300 }}
								>
									San Fernando del Valle
								</Heading>

								<Text fontSize='xl' color={textColor} maxW='2xl'>
									Descubre los tesoros escondidos de la capital catamarqueña
								</Text>
							</VStack>
						</MotionBox>

						<Wrap justify='center' spacing={4}>
							<WrapItem>
								<AreaFilter
									area='Todos'
									isSelected={selectedArea === 'all'}
									onClick={() => setSelectedArea('all')}
								/>
							</WrapItem>
							{areas.map((area) => (
								<WrapItem key={area}>
									<AreaFilter
										area={area}
										isSelected={selectedArea === area}
										onClick={() => setSelectedArea(area)}
									/>
								</WrapItem>
							))}
						</Wrap>

						<SimpleGrid
							columns={columns}
							spacing={8}
							w='full'
							as={motion.div}
							layout
						>
							<AnimatePresence mode='popLayout'>
								{filteredLocations.map((location) => (
									<LocationCard
										key={location.id}
										location={location}
										onShowDetails={handleShowDetails}
									/>
								))}
							</AnimatePresence>
						</SimpleGrid>
					</VStack>
				</Container>

				<Modal isOpen={isOpen} onClose={handleCloseModal} size='xl' isCentered>
					<ModalOverlay bg='blackAlpha.700' backdropFilter='blur(5px)' />
					<ModalContent bg={modalBgColor} borderRadius='xl'>
						<ModalHeader
							borderTopRadius='xl'
							bgGradient={
								selectedLocationData
									? (getAreaTheme[selectedLocationData.area] || {}).gradient ||
									  'linear(to-r, gray.400, gray.600)'
									: 'linear(to-r, gray.400, gray.600)'
							}
							color='white'
							py={4}
						>
							{selectedLocationData?.title || 'Detalles'}
						</ModalHeader>
						<ModalCloseButton
							color='white'
							_focus={{ boxShadow: 'none' }}
							_hover={{ bg: 'whiteAlpha.300' }}
						/>
						<ModalBody py={6}>
							{selectedLocationData && (
								<VStack spacing={4} align='stretch'>
									<Box borderRadius='lg' overflow='hidden' h='300px'>
										<iframe
											title={selectedLocationData.title}
											src={selectedLocationData.mapSrc}
											width='100%'
											height='100%'
											style={{ border: 0 }}
											loading='lazy'
										/>
									</Box>
									<Text fontSize='md' color={modalTextColor}>
										{selectedLocationData.description}
									</Text>
								</VStack>
							)}
						</ModalBody>
						<ModalFooter borderBottomRadius='xl'>
							{selectedLocationData?.path && (
								<Button
									as={Link}
									href={selectedLocationData.path}
									target='_blank'
									rel='noopener noreferrer'
									leftIcon={<FaMapMarkerAlt />}
									colorScheme='blue'
									variant='outline'
									mr={3}
									size='sm'
								>
									Ver en Mapa
								</Button>
							)}
							{selectedLocationData?.wiki && (
								<Button
									as={Link}
									href={selectedLocationData.wiki}
									target='_blank'
									rel='noopener noreferrer'
									leftIcon={<FaInfoCircle />}
									colorScheme='teal'
									variant='outline'
									mr={3}
									size='sm'
								>
									Más Info
								</Button>
							)}
							<Button colorScheme='gray' onClick={handleCloseModal} size='sm'>
								Cerrar
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</LayoutGroup>
	);
};

export default React.memo(Catamarca);
