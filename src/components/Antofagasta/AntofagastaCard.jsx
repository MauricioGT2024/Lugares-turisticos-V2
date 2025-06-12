const AntofagastaCard = ({ item: { title, categoria, imgSrc, id  }, onClick }) => (
  <article
    role="button"
    tabIndex={0}
    onClick={() => onClick(id)}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') onClick(id);
    }}
    className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
    aria-label={`Ver detalles de ${title}`}
  >
    <img
      src={imgSrc}
      alt={title}
      loading="lazy"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{categoria}</p>
    </div>
  </article>
);

export default AntofagastaCard;
