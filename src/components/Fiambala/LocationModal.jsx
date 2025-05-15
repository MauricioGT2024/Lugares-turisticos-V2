import * as Dialog from '@radix-ui/react-dialog';
import PropTypes from 'prop-types';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useColorModeValue } from '@chakra-ui/react';
import { CATEGORY_CONFIG } from '@/components/Fiambala/config';

export const LocationModal = ({ isOpen, onClose, location }) => {
	const bgColor = useColorModeValue('white', '#1A202C');
	const textPrimary = useColorModeValue('#1A202C', '#F7FAFC');
	const textSecondary = useColorModeValue('#4A5568', '#A0AEC0');
	const borderColor = useColorModeValue('#E2E8F0', '#2D3748');

	if (!location) return null;

	const { title, description, imgSrc, mapSrc, category, path } = location;

	// ✅ Chakra color tokens

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40' />
				<Dialog.Content
					style={{ backgroundColor: bgColor, borderColor }}
					className={`fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-5xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl border overflow-hidden animate-fadeIn transition-all`}
				>
					{/* Imagen encabezado */}
					<div className='relative h-[200px] overflow-hidden'>
						<img
							src={imgSrc}
							alt={`Imagen de ${title}`}
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
						<div className='absolute bottom-4 left-6 text-white z-10'>
							{category && (
								<span
									className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-1 ${
										CATEGORY_CONFIG[category]?.bgClass || 'bg-amber-500'
									}`}
								>
									{category}
								</span>
							)}
							<h2 className="text-2xl font-bold font-['JetBrains_Mono']">
								{title}
							</h2>
						</div>
						<Dialog.Close asChild>
							<button
								className='absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition'
								aria-label='Cerrar'
							>
								<FaTimes size={18} />
							</button>
						</Dialog.Close>
					</div>

					{/* Contenido */}
					<div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div>
							<h3
								style={{ color: textSecondary }}
								className='text-lg font-semibold mb-2'
							>
								Descripción
							</h3>
							<p
								style={{ color: textPrimary }}
								className='leading-relaxed text-base'
							>
								{description}
							</p>
						</div>
						<div>
							<h3
								style={{ color: textSecondary }}
								className='text-lg font-semibold mb-2'
							>
								Ubicación
							</h3>
							<div
								style={{ borderColor }}
								className='h-[300px] rounded-xl overflow-hidden shadow-lg border'
							>
								<iframe
									title={title}
									src={mapSrc}
									className='w-full h-full border-0'
									loading='lazy'
								/>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div
						style={{ borderTop: `1px solid ${borderColor}` }}
						className='px-8 py-6 flex justify-between items-center'
					>
						<div
							className='flex items-center text-sm gap-2'
							style={{ color: textSecondary }}
						>
							<FaInfoCircle />
							<span>Información actualizada</span>
						</div>
						<div className='space-x-3'>
							{path && (
								<a
									href={path}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition'
								>
									<FaInfoCircle className='mr-2' />
									Más Información
								</a>
							)}
							<Dialog.Close asChild>
								<button
									style={{ background: bgColor, borderColor }}
									className='px-5 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition'
								>
									Cerrar
								</button>
							</Dialog.Close>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

LocationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	location: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		imgSrc: PropTypes.string,
		mapSrc: PropTypes.string,
		category: PropTypes.string,
		path: PropTypes.string,
	}),
};
