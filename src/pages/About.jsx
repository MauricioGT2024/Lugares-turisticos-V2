import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaBook,
  FaHiking,
  FaHotel,
  FaCalendarAlt,
  FaInfoCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";


const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full transition"
    >
      <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-teal-500" />
      </div>
      <h3 className="text-xl font-semibold text-teal-500 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
    </motion.div>
  );
};
const features = [
  { icon: FaBook, title: "Guías Completas", description: "Información detallada..." },
  { icon: FaMapMarkedAlt, title: "Mapas Interactivos", description: "Ubicaciones precisas..." },
  { icon: FaHotel, title: "Alojamiento", description: "Las mejores opciones..." },
  { icon: FaCalendarAlt, title: "Eventos Locales", description: "Calendario de festivales..." },
  { icon: FaHiking, title: "Actividades", description: "Aventuras al aire libre..." },
  { icon: FaInfoCircle, title: "Información Cultural", description: "Historia y tradiciones..." },
];

const About = () => {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Acerca de Catamarca Turismo
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tu guía definitiva para explorar las maravillas de Catamarca.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-teal-500 mb-4">¿Listo para explorar?</h3>
          <a
            href="https://turismo.catamarca.gob.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Sitio Oficial <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
