import { memo } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import HospedajeList from "../components/Hospedaje/HospedajeList";
import { hospedajes } from "../data/hospedaje";

const useTheme = (colorMode) => ({
  bg: colorMode === "dark" ? "bg-gray-900" : "bg-white",
  text: {
    primary: colorMode === "dark" ? "text-white" : "text-gray-900",
    secondary: colorMode === "dark" ? "text-gray-400" : "text-gray-600",
  },
});

const Hospedaje = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme(colorMode);

  return (
    <div className={`min-h-screen w-full flex flex-col ${theme.bg} transition-colors duration-300`}>
      <section className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className={`text-2xl md:text-4xl font-semibold mb-3 ${theme.text.primary}`}>
            Hospedajes en Catamarca
          </h2>
          <p className={`text-base md:text-lg ${theme.text.secondary}`}>
            Encuentra el alojamiento ideal para tu estadía
          </p>
        </motion.div>
        <HospedajeList hospedajes={hospedajes} />
      </section>
    </div>
  );
};

Hospedaje.displayName = "Hospedaje";
export default memo(Hospedaje);
