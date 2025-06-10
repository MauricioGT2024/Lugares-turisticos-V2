import { useState } from 'react';
import TinogastaCard from './TinogastaCard';
import TinogastaModal from './TinogastaModal';

const TinogastaGrid = ({ locations, onLocationClick }) => {
  if (!locations) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLocationClick = (id) => {
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      setSelectedItem(location);
      setIsModalOpen(true);
    }
  }
  
  
  if (!locations || locations.length === 0) {
    return <div className="text-center text-gray-500">No locations available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-purple-100 to-white">
      {locations.map((location) => (
        <TinogastaCard
          key={location.id}
          location={location}
          onClick={() => onLocationClick(location.id)}
          className="transform hover:scale-105 transition-transform duration-300"
        />
      ))}
      {isModalOpen && (
        <TinogastaModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TinogastaGrid;
