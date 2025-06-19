const Hero = ({ badge, title, subtitle }) => (
  <div className="text-center space-y-4">
    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-4 py-1.5 rounded-full text-sm font-medium">
      {badge}
    </span>
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
      {title}
    </h1>
    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
      {subtitle}
    </p>
  </div>
);
export default Hero;
