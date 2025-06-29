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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Provincia() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <section className="container mx-auto">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Explora los Departamentos
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubrí la belleza y diversidad de cada rincón de la provincia.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
