import { motion } from 'framer-motion';
import { FaBed, FaCompass, FaHotel } from 'react-icons/fa';
import PropTypes from 'prop-types';
import FloatingButton from '@/components/common/FloatingButton'; // Componente nuevo

const iconMotion = {
	initial: { rotate: 0 },
	animate: { rotate: [0, 5, -5, 0] },
	transition: { duration: 5, repeat: Infinity },
};

const HospedajeHeader = ({ onOpenFilter }) => {
	return (
		<header className='relative py-16 sm:py-24 overflow-hidden'>
			<div className='absolute inset-0 -z-10'>
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute rounded-full mix-blend-multiply blur-xl opacity-70 bg-teal-300 dark:bg-teal-900'
						animate={{
							x: [0, 100, 0],
							y: [0, -100, 0],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 10 + i,
							repeat: Infinity,
							delay: i * 0.5,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							width: `${150 + Math.random() * 200}px`,
							height: `${150 + Math.random() * 200}px`,
						}}
					/>
				))}
			</div>

			<div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<motion.div
						className='flex justify-center gap-4 mb-6'
						{...iconMotion}
					>
						<FaBed className='text-3xl text-teal-600 dark:text-teal-400' />
						<FaHotel className='text-3xl text-blue-600 dark:text-blue-400' />
						<FaCompass className='text-3xl text-cyan-600 dark:text-cyan-400' />
					</motion.div>

					<h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
						<span className='block'>Encuentra el Mejor</span>
						<span className='block text-teal-600 dark:text-teal-400'>
							Hospedaje para Ti
						</span>
					</h1>

					<p className='mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300'>
						Explora nuestra selección de alojamientos premium en Catamarca.
					</p>

					<div className='fixed bottom-6 right-6 z-50'>
						<FloatingButton onClick={onOpenFilter} />
					</div>
				</motion.div>
			</div>
		</header>
	);
};

HospedajeHeader.propTypes = {
	onOpenFilter: PropTypes.func.isRequired,
};
HospedajeHeader.defaultProps = {
	onOpenFilter: () => {},
};
HospedajeHeader.displayName = 'HospedajeHeader';
export default HospedajeHeader;
