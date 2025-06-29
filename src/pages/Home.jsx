import React, { memo } from "react";
import { motion } from "framer-motion";
import HomeCard from "../components/Home/HomeCard";
import { places } from "../data/home";
import { useNavigate } from "react-router-dom";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sección de héroe con fade-in */}
      <motion.section
        className="relative h-screen flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <img
            src="/hero-catamarca.webp"
            alt="Paisaje de Catamarca"
            className="h-full w-full object-cover filter brightness-50"
          />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Descubre Catamarca
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Explora la magia de nuestra tierra, donde las montañas se elevan y
            la historia cobra vida.
          </p>
        </div>
      </motion.section>

      {/* Sección de Destinos con animación en cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Destinos Destacados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Lugares fascinantes para explorar en nuestra provincia
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {places.map((place) => (
              <motion.div key={place.name} variants={cardVariants}>
                <HomeCard
                  image={place.image}
                  title={place.name}
                  description={place.description}
                  onClick={() => navigate(place.path)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default memo(Home);
