import { memo } from "react";
import { motion } from "framer-motion";
import HospedajeList from '@/components/Hospedaje/HospedajeList';
import { hospedajes } from '@/data/hospedaje';

const Hospedaje = () => {

  return (
		<div
			className={`min-h-screen w-full flex flex-col items-center justify-center dark:bg-gray-900 transition-colors duration-300`}
		>
			<section className='flex-1 w-full max-w-7xl mx-auto py-12 px-4 md:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className='text-center mb-14'
				>
					<h2
						className={`text-2xl md:text-4xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500`}
					>
						Hospedajes en Catamarca
					</h2>
					<p className={`text-base md:text-lg text-gray-600 dark:text-gray-300`}>
						Explora las opciones de hospedaje en la hermosa provincia de
						Catamarca y encuentra el lugar perfecto para tu próxima aventura.
					</p>
				</motion.div>
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7 }}
					className='flex-1 w-full max-w-7xl mx-auto py-12 px-4 md:px-8'
				>
					<HospedajeList hospedajes={hospedajes} />
				</motion.section>
			</section>
		</div>
	);
};

Hospedaje.displayName = "Hospedaje";
export default memo(Hospedaje);
