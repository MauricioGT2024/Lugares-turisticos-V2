import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hamburger from "./Hamburger"; // Importa el componente Hamburger
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { FaBed, FaHome, FaInfoCircle, FaMapMarkedAlt, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLink from "../common/NavLink";

const navItems = [
  { path: "/", label: "Inicio", icon: FaHome },
  { path: "/provincia", label: "Departamentos", icon: FaMapMarkedAlt },
  { path: "/hospedaje", label: "Hospedaje", icon: FaBed },
  { path: "/about", label: "Sobre Nosotros", icon: FaInfoCircle },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Detecta el cambio de página

  const toggleSidebar = () => setOpen(!open);

  // Cerrar el sidebar cuando cambie la página
  useEffect(() => {
    setOpen(false); // Cierra el sidebar cuando se cambia la página
  }, [location]);

  return (
    <>
      {/* Hamburger Button */}
      <Hamburger isOpen={open} toggle={toggleSidebar} />

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -300 }} // Sidebar fuera de la pantalla
            animate={{ x: 0 }} // Cuando abre, se anima al centro
            exit={{ x: -300 }} // Cuando se cierra, se mueve fuera
            className="fixed top-0 left-0 w-64 h-full bg-gray-100 text-white z-40 shadow-lg "
          >
            {/* Contenido del Sidebar */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src="/navbar.webp"
                  alt="Logo Lugares Turísticos Catamarca"
                  className="h-10 w-auto rounded shadow"
                  draggable={false}
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Cerrar menú lateral"
              >
                <FaTimes className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col gap-1 px-2 py-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => setOpen(false)}
                  sidebar
                />
              ))}
            </nav>
           
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
