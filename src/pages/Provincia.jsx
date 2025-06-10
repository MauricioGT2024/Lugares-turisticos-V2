import { memo } from 'react';
import { motion } from 'framer-motion';
import { departamentos } from '../data/departamentos';
import { useTheme } from '../context/ThemeContext';
import DepartamentoCard from '../components/Provincia/DepartamentoCard';

const Provincia = memo(() => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Explora los Departamentos
          </h1>
          <p className={`max-w-3xl mx-auto text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Descubre la diversidad y belleza de cada rincón de esta hermosa provincia.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {departamentos.map((loc) => (
            <motion.div
              key={loc.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <DepartamentoCard loc={loc} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

Provincia.displayName = 'Provincia';

export default Provincia;
