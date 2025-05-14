import { motion } from 'framer-motion';
import {
	FaMapMarkedAlt,
	FaBook,
	FaHiking,
	FaHotel,
	FaCalendarAlt,
	FaInfoCircle,
	FaExternalLinkAlt,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const FeatureCard = ({ icon: Icon, title, description }) => (
	<motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
		<div className=' dark:bg-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden'>
			<div className='bg-teal-100 dark:bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center mb-4'>
				<Icon className='w-6 h-6 text-teal-500' />
			</div>
			<h3 className='text-teal-500 text-lg font-semibold mb-3'>{title}</h3>
			<p className='text-gray-600 dark:text-gray-300'>{description}</p>
		</div>
	</motion.div>
);

FeatureCard.propTypes = {
	icon: PropTypes.elementType.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

const ImageCard = ({ image, title, description }) => (
	<motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
		<div className=' dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg'>
			<div className='relative h-64'>
				<img
					src={image}
					alt={title}
					className='object-cover w-full h-full transition-transform duration-300 hover:scale-110'
				/>
				<span className='absolute top-4 right-4 bg-teal-500 text-white text-xs px-3 py-1 rounded-full'>
					Explorar
				</span>
			</div>
			<div className='p-6'>
				<h3 className='text-lg font-semibold mb-2'>{title}</h3>
				<p className='text-gray-600 dark:text-gray-300'>{description}</p>
			</div>
		</div>
	</motion.div>
);

ImageCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

const About = () => {
	const features = [
		{
			icon: FaBook,
			title: 'Guías Completas',
			description:
				'Información detallada y actualizada sobre destinos turísticos.',
		},
		{
			icon: FaMapMarkedAlt,
			title: 'Mapas Interactivos',
			description: 'Ubicaciones precisas y rutas recomendadas para tu viaje.',
		},
		{
			icon: FaHotel,
			title: 'Alojamiento',
			description: 'Las mejores opciones de hospedaje para cada presupuesto.',
		},
		{
			icon: FaCalendarAlt,
			title: 'Eventos Locales',
			description: 'Calendario actualizado de festivales y eventos culturales.',
		},
		{
			icon: FaHiking,
			title: 'Actividades',
			description: 'Experiencias únicas y aventuras al aire libre.',
		},
		{
			icon: FaInfoCircle,
			title: 'Información Cultural',
			description: 'Historia, tradiciones y consejos para viajeros.',
		},
	];

	return (
		<div className=' dark:bg-gray-900 min-h-screen py-12'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='text-center mb-12'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className='text-4xl font-extrabold text-teal-500 mb-4'>
							Acerca de Catamarca Turismo
						</h1>
						<p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
							Tu guía definitiva para explorar las maravillas de Catamarca.
							Descubre paisajes impresionantes, rica cultura y experiencias
							únicas.
						</p>
					</motion.div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<FeatureCard {...feature} />
						</motion.div>
					))}
				</div>

				<div className='my-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<ImageCard
							image='https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d'
							title='Paisajes Majestuosos'
							description='Explora las impresionantes montañas de los Andes y descubre maravillas naturales únicas.'
						/>
						<ImageCard
							image='https://images.unsplash.com/photo-1503220317375-aaad61436b1b'
							title='Aventuras Sin Límites'
							description='Vive experiencias inolvidables con actividades al aire libre y deportes de aventura.'
						/>
					</div>
				</div>

				<div className='text-center mt-8'>
					<h3 className='text-2xl text-teal-500 mb-6'>¿Listo para explorar?</h3>
					<a
						href='https://turismo.catamarca.gob.ar/'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center px-6 py-3 bg-teal-500 text-white text-lg rounded-full hover:bg-teal-600 transition-transform transform hover:scale-105'
					>
						Sitio Oficial
						<FaExternalLinkAlt className='ml-2' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default About;
