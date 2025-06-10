import { motion } from 'framer-motion';
import CatamarcaCard from './CatamarcaCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CatamarcaGrid = ({ locations, onLocationClick }) => {
  if (!locations || locations.length === 0) return null;

  // Handler para clic y teclado
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onLocationClick(id);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {locations.map((location) => (
        <motion.div
          key={location.id}
          variants={itemVariants}
          className="h-full"
        >
          <CatamarcaCard
            item={location}
            onClick={() => onLocationClick(location.id)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, location.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CatamarcaGrid;
