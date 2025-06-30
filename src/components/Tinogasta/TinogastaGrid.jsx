import TinogastaCard from './TinogastaCard';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const TinogastaGrid = ({ locations, onLocationClick }) => {
  return (
    <motion.section 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {locations.map((location) => (
        <motion.div key={location.id} variants={itemVariants}>
          <TinogastaCard
            location={location}
            onClick={() => onLocationClick(location.id)}
          />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default TinogastaGrid;
