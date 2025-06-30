import { motion } from "framer-motion";
import DepartamentoCard from "../components/Provincia/DepartamentoCard";
import { departamentos } from "../data/departamentos";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Provincia() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <section className="container mx-auto">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Explora los <span className="text-blue-600 dark:text-blue-400">Departamentos</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubrí la belleza y diversidad de cada rincón de la provincia de Catamarca.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {departamentos.map((loc) => (
            <motion.div key={String(loc.id)} variants={fadeInUp}>
              <DepartamentoCard loc={loc} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
