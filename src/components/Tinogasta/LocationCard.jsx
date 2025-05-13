import PropTypes from 'prop-types';

const LocationCard = ({ location, onClick }) => (
	<article
		onClick={onClick}
		className='bg-white/5 rounded-2xl overflow-hidden shadow-xl border border-white/10 cursor-pointer hover:scale-[1.02] transition-transform'
		role='button'
		tabIndex={0}
		onKeyPress={(e) => e.key === 'Enter' && onClick()}
	>
		<div className='h-60 overflow-hidden'>
			<img
				src={location.imgSrc}
				alt={location.name}
				className='w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110'
				loading='lazy'
			/>
		</div>
		<div className='p-5'>
			<h2 className='text-2xl font-bold mb-2'>{location.name}</h2>
			<p className='text-white/80 text-sm'>{location.description}</p>
			<span className='inline-block mt-4 px-3 py-1 bg-purple-600/60 text-sm rounded-full uppercase tracking-wide font-semibold'>
				{location.category}
			</span>
		</div>
	</article>
);

LocationCard.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LocationCard;
