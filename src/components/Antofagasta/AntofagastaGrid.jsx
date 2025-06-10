import AntofagastaCard from "./AntofagastaCard";

const AntofagastaGrid = ({ locations, onLocationClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-teal-600 dark:text-teal-300">Cargando...</p>
      </div>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <p className="text-center text-teal-600 dark:text-teal-300">
        No hay lugares disponibles en este momento.
      </p>
    );
  }

  return (
    <div className="bg-gradient-to-br bg-gray-50 to-white py-12 dark:bg-gray-800 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <AntofagastaCard
              key={location.id}
              item={location}
              onClick={() => onLocationClick(location.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AntofagastaGrid;
