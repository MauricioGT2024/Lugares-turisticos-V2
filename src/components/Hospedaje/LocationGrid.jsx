export const LocationGrid = ({ locations, onLocationClick }) => (
	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
		{locations.map((location) => (
			<div
				key={location.id}
				onClick={() => onLocationClick(location.id)}
				className='group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer'
			>
				<div className='relative w-full pb-[56.25%]'>
					<img
						src={location.image}
						alt={location.title}
						className='absolute top-0 left-0 w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105'
					/>
				</div>
				<div className='p-5 space-y-3'>
					<h3 className='text-xl font-bold text-gray-800 dark:text-white'>
						{location.title}
					</h3>
					<p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-2'>
						{location.description}
					</p>
					<div className='flex items-center'>
						<span className='text-sm text-gray-500 dark:text-gray-400'>
							{location.category}
						</span>
					</div>
				</div>
			</div>
		))}
	</div>
);
