export const Hero = ({ badge, title, subtitle }) => (
	<div className='text-center space-y-4'>
		<span className='inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800 transition-colors duration-300 dark:bg-blue-900/50 dark:text-blue-200'>
			{badge}
		</span>
		<div className='text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300 md:text-5xl'>
			{title}
		</div>
		<div className='mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300'>
			{subtitle}
		</div>
	</div>
);
