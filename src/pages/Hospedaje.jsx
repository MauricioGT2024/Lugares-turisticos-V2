import { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { hospedajes } from "../data/hospedajes";
import AnimatedCard from "../components/Hospedaje/AnimatedCard";
import FilterGroup from '../components/FilterSystem/FilterGroup';
import HospedajeHeader from "../components/Hospedaje/HospedajeHeader";

const locationColorSchemes = {
  "Catamarca": "blue",
  "Tinogasta": "orange",
  "Fiambalá": "purple",
  "Antofagasta de la Sierra": "green",
};

const Hospedaje = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [error, ] = useState(null);
  const { colorMode } = useColorMode();

  const departments = [...new Set(hospedajes.map((h) => h.location))];
  const filteredHospedajes = selectedDepartment === "all" || selectedDepartment === ""
    ? hospedajes
    : hospedajes.filter((h) => h.location === selectedDepartment);

  return (
    <div className={`min-h-screen py-8 md:py-12 ${
      colorMode === "dark" ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-50 to-white"
    }`}>
      <div className="container mx-auto px-4 md:px-8 max-w-8xl">
        <div className="space-y-8">
          <HospedajeHeader />
          
          {/* Filtros centrados */}
          <div className="w-full max-w-2xl mx-auto">
            <FilterGroup
              title="Ubicación"
              items={departments}
              selected={selectedDepartment}
              onSelect={setSelectedDepartment}
              showIcons={true}
            />
          </div>

          {error && (
            <div className={`rounded-lg p-4 ${
              colorMode === "dark" ? "bg-red-900/50 text-red-200" : "bg-red-50 text-red-800"
            }`}>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="wait">
              {filteredHospedajes.map((hospedaje) => (
                <motion.div
                  key={hospedaje.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedCard
                    {...hospedaje}
                    colorScheme={locationColorSchemes[hospedaje.location] || "teal"}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospedaje;
