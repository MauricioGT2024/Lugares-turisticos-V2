import { motion, AnimatePresence } from 'framer-motion';
import LocationCard from './LocationCard';

const LocationGrid = ({ locations, onLocationClick }) => {
  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <LocationCard location={loc} onClick={() => onLocationClick(loc)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default LocationGrid;
