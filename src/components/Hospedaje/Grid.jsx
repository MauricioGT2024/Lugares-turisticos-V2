const Grid = ({ locations, onLocationClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {locations.map(({ id, image, title, description, category }) => (
      <div
        key={id}
        onClick={() => onLocationClick(id)}
        className="cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
      >
        <div className="relative w-full pb-[56.25%]">
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-5 space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span>
        </div>
      </div>
    ))}
  </div>
);
export default Grid;
