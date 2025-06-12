import AntofagastaCard from './AntofagastaCard';

const AntofagastaGrid = ({ locations, onLocationClick }) => (
  <section aria-label="Listado de ubicaciones turísticas" className="my-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {locations.map(location => (
        <AntofagastaCard
          key={location.id}
          item={location}
          onClick={onLocationClick}
        />
      ))}
    </div>
  </section>
);

export default AntofagastaGrid;

