/* eslint-disable react-hooks/rules-of-hooks */
// components/Tinogasta/TinogastaModal.jsx
import * as Dialog from '@radix-ui/react-dialog';
import { useColorModeValue } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TinogastaModal = ({ location, onClose }) => {
	const bgColor = useColorModeValue('#ffffff', '#1a202c');
	const textColor = useColorModeValue('#1a202c', '#e2e8f0');

	if (!location) return null;

	return (
		<Dialog.Root open={!!location} onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						position: 'fixed',
						inset: 0,
						zIndex: 50,
					}}
				/>

				<Dialog.Content
					style={{
						backgroundColor: bgColor,
						color: textColor,
						borderRadius: '12px',
						padding: '24px',
						width: '90%',
						maxWidth: '720px',
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
						zIndex: 100,
					}}
				>
					<Dialog.Title
						style={{
							fontSize: '24px',
							fontWeight: 'bold',
							marginBottom: '12px',
						}}
					>
						{location.name}
					</Dialog.Title>

					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
					>
						<img
							src={location.imgSrc}
							alt={location.name}
							style={{
								width: '100%',
								maxHeight: '280px',
								objectFit: 'cover',
								borderRadius: '8px',
							}}
						/>

						<p style={{ lineHeight: 1.6 }}>{location.description}</p>

						<iframe
							src={location.iframe}
							title={location.name}
							loading='lazy'
							style={{
								width: '100%',
								height: '240px',
								border: 0,
								borderRadius: '8px',
							}}
							allowFullScreen
						/>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: '24px',
							gap: '12px',
						}}
					>
						{location.wikipedia && (
							<a
								href={location.wikipedia}
								target='_blank'
								rel='noopener noreferrer'
								style={{
									padding: '10px 16px',
									borderRadius: '8px',
									background: 'linear-gradient(to right, #2563eb, #60a5fa)',
									color: '#fff',
									textDecoration: 'none',
									fontWeight: '500',
								}}
							>
								Ver Wikipedia
							</a>
						)}
						{location.path && (
							<a
								href={location.path}
								target='_blank'
								rel='noopener noreferrer'
								style={{
									padding: '10px 16px',
									borderRadius: '8px',
									background: 'linear-gradient(to right, #D97706, #F59E0B)',
									color: '#fff',
									textDecoration: 'none',
									fontWeight: '500',
								}}
							>
								Ver en el Mapa
							</a>
						)}
						<Dialog.Close asChild>
							<button
								onClick={onClose}
								style={{
									padding: '10px 16px',
									backgroundColor: useColorModeValue('#edf2f7', '#2d3748'),
									color: textColor,
									borderRadius: '8px',
									border: 'none',
									fontWeight: '500',
								}}
							>
								Cerrar
							</button>
						</Dialog.Close>
					</div>

					<Dialog.Close asChild>
						<button
							aria-label='Close'
							style={{
								position: 'absolute',
								top: '16px',
								right: '16px',
								background: 'transparent',
								border: 'none',
								color: textColor,
								fontSize: '18px',
								cursor: 'pointer',
							}}
						>
							<FaTimes />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

TinogastaModal.propTypes = {
	location: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
		imgSrc: PropTypes.string,
		iframe: PropTypes.string,
		path: PropTypes.string,
		wikipedia: PropTypes.string,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default TinogastaModal;
