const AntofagastaHero = ({ badge, title, subtitle }) => (
  <section className="relative py-16 px-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-900 dark:from-yellow-800 dark:via-red-800 dark:to-pink-900  rounded-lg text-white text-center max-w-4xl mx-auto">
    {badge && (
      <span className="inline-block bg-white/30 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wider mb-4">
        {badge}
      </span>
    )}
    <h1 className="text-4xl font-bold mb-3">{title}</h1>
    <p className="text-lg max-w-3xl mx-auto">{subtitle}</p>
  </section>
);

export default AntofagastaHero;
