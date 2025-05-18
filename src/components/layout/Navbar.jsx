import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hamburger from "./Hamburger";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaHome,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLink from "../common/NavLink";
import ThemeSwitcher from "../common/ThemeSwitcher";

const navItems = [
  { path: "/", label: "Inicio", icon: FaHome },
  { path: "/provincia", label: "Departamentos", icon: FaMapMarkedAlt },
  { path: "/hospedaje", label: "Hospedaje", icon: FaBed },
  { path: "/about", label: "Sobre Nosotros", icon: FaInfoCircle },
];

export default function Navbar() {
  const [open, setOpen] = useState(() => {
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    return savedSidebarState === "true";
  });

  const location = useLocation();

  const toggleSidebar = () => setOpen(!open);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", open);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <Hamburger isOpen={open} toggle={toggleSidebar} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            // Added dark mode text classes
            className="fixed top-0 left-0 w-64 h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white z-40 shadow-lg"
          >
            {/* Header del Sidebar */}
            <div className="flex items-center justify-end px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 justify-end"
              >
                <img
                  src="/navbar.webp"
                  alt="Logo Lugares Turísticos Catamarca"
                  className="h-10 w-auto rounded shadow justify-end"
                  draggable={false}
                />
              </Link>
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

            {/* ThemeSwitcher */}
            <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-center">
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
