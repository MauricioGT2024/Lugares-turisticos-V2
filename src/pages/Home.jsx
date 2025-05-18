import React from 'react';
import { motion } from 'framer-motion';
import { places } from '@/data/home';
import DestinationCard from '@/components/Home/DestinationCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Variants for Hero Section text
  const heroTextVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: 'url(\/hero-catamarca.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="relative z-10 p-4">
          <motion.h1
            variants={heroTextVariants}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          >
            Descubre Catamarca
          </motion.h1>
          <motion.p
            variants={heroTextVariants}
            initial="initial"
            animate="animate"
            transition={{...heroTextVariants.animate.transition, delay: 0.3}}
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95 drop-shadow-md"
          >
            Explora paisajes asombrosos, rica historia y cultura vibrante en el corazón de Argentina.
          </motion.p>
        </div>
      </section>

      {/* Existing content below Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Use whileInView to trigger animation when section comes into view
          viewport={{ once: true, amount: 0.2 }} // Configure viewport to trigger once
        >
          <section className="mb-10">
            <motion.h2
              variants={itemVariants} // Apply itemVariants for animation
              className="text-3xl font-semibold mb-6 text-center"
            >
              Destinos Principales
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {places.map((dest, index) => (
                <motion.div
                  key={dest.path}
                  variants={itemVariants} // Apply itemVariants for animation
                >
                  <DestinationCard {...dest} />
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/provincia"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                Ver Todos los Departamentos
              </Link>
            </div>
          </section>

          {/* Puedes añadir más secciones aquí si es necesario */}
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
