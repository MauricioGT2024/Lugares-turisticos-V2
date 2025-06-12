import TinogastaCard from './TinogastaCard';

const TinogastaGrid = ({ locations, onLocationClick }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {locations.map((location) => (
        <TinogastaCard
          key={location.id}
          location={location}
          onClick={() => onLocationClick(location.id)}
        />
      ))}
    </section>
  );
};

export default TinogastaGrid;
