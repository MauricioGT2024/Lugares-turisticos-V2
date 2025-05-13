import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Box, Image, Badge, useColorModeValue } from '@chakra-ui/react';

const LocationCard = ({ location, config, onClick }) => {
  const { title, description, category, imgSrc } = location;
  const Icon = config.icon;
  const MemoizedIcon = React.memo(Icon);
  const badgeBg = useColorModeValue('teal.500', 'teal.300');
  const gradient = useColorModeValue(
	'linear-gradient(135deg, rgba(32, 201, 151, 0.85) 0%, rgba(66, 153, 225, 0.85) 100%)',
	'linear-gradient(135deg, rgba(56, 189, 248, 0.85) 0%, rgba(16, 185, 129, 0.85) 100%)'
  );
  return (
	<motion.div
	  whileHover={{ y: -12, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,0,0,0.10)' }}
	  whileTap={{ scale: 0.98 }}
	  style={{
		position: 'relative',
		height: 400,
		borderRadius: 24,
		overflow: 'hidden',
		cursor: 'pointer',
		background: 'rgba(255,255,255,0.08)',
		backdropFilter: 'blur(8px)',
		border: '1.5px solid rgba(255,255,255,0.12)',
		boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
		transition: 'box-shadow 0.3s',
	  }}
	  onClick={onClick}
	>
	  <Box position='absolute' inset={0} zIndex={1}>
		<motion.div
		  style={{ width: '100%', height: '100%' }}
		  whileHover={{ scale: 1.08 }}
		  transition={{ duration: 0.4 }}
		>
		  <Image
			src={imgSrc}
			alt={title}
			width='100%'
			height='100%'
			objectFit='cover'
			loading='lazy'
			borderRadius='24px'
			style={{ filter: 'brightness(0.92) saturate(1.1)' }}
		  />
		</motion.div>
		<Box
		  position='absolute'
		  inset={0}
		  bgGradient={gradient}
		  opacity={0.55}
		  transition='opacity 0.3s'
		/>
	  </Box>
	  <Badge
		position='absolute'
		top={5}
		right={5}
		px={5}
		py={2}
		borderRadius='full'
		bg={badgeBg}
		color='white'
		fontSize='md'
		fontWeight='bold'
		boxShadow='xl'
		backdropFilter='blur(6px)'
		display='flex'
		alignItems='center'
		gap={2}
		zIndex={2}
		style={{ letterSpacing: 1 }}
	  >
		{Icon && <MemoizedIcon style={{ width: 20, height: 20 }} />}
		{category}
	  </Badge>
	  <motion.div
		style={{
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  bottom: 0,
		  padding: 28,
		  background: 'rgba(0,0,0,0.32)',
		  borderBottomLeftRadius: 24,
		  borderBottomRightRadius: 24,
		  transform: 'translateY(24px)',
		  opacity: 0,
		  transition: 'all 0.35s',
		}}
		className='group-hover:translate-y-0 group-hover:opacity-100'
	  >
		<Box as='h2' fontSize='2xl' fontWeight='extrabold' color='white' mb={2} letterSpacing={1} textShadow='0 2px 8px rgba(0,0,0,0.18)'>
		  {title}
		</Box>
		<Box as='p' color='gray.100' noOfLines={2} fontSize='md' textShadow='0 1px 4px rgba(0,0,0,0.12)'>
		  {description}
		</Box>
	  </motion.div>
	</motion.div>
  );
};

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		mapSrc: PropTypes.string,
		path: PropTypes.string,
		wiki: PropTypes.string,
		category: PropTypes.string,
		area: PropTypes.string,
	}).isRequired,
	config: PropTypes.shape({
		spinnerColor: PropTypes.string,
		badgeClass: PropTypes.string,
		iconClass: PropTypes.string,
		icon: PropTypes.elementType,
		category: PropTypes.string,
		gradient: PropTypes.string,
	}).isRequired,
	onClick: PropTypes.func,
};

export default React.memo(LocationCard);
