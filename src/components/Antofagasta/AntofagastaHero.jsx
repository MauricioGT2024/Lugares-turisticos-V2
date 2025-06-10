import { motion } from 'framer-motion';

const AntofagastaHero = ({ title, subtitle, image }) => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Fondo de la imagen con gradiente */}
      <div
        className="absolute inset-0 bg-cover bg-center dark:bg-opacity-70"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/60 to-transparent dark:from-gray-900/80 dark:via-gray-800/60 dark:to-transparent" />
      </div>
      
      {/* Contenido principal */}
      <div className="relative h-full flex flex-col justify-center items-start px-8 md:px-16 max-w-7xl mx-auto">
        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wider dark:text-white"
        >
          {title}
        </motion.h1>
        
        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-teal-50 max-w-2xl dark:text-teal-200"
        >
          {subtitle}
        </motion.p>

       
      </div>
      
      {/* Fondo de la parte inferior con gradiente */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-900/40 dark:to-transparent" />
    </div>
  );
};

export default AntofagastaHero;
