import { memo, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaMapMarkedAlt, FaBed, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import PropTypes from 'prop-types';

const navItems = [
  { path: "/", label: "Inicio", icon: FaHome },
  {
    label: "Departamentos",
    path: "/provincia",
    icon: FaMapMarkedAlt,
  },
  { path: "/hospedaje", label: "Hospedaje", icon: FaBed },
  { path: "/about", label: "Sobre Nosotros", icon: FaInfoCircle },
];
const NavLink = memo(({ item, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const { colorMode } = useColorMode();

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 
      ${isActive 
        ? 'bg-teal-500 text-white' 
        : colorMode === 'light' 
          ? 'text-gray-700 hover:bg-teal-100' 
          : 'text-gray-200 hover:bg-teal-800'}`}
    >
      <item.icon className="w-5 h-5 mr-2" />
      <span>{item.label}</span>
    </Link>
  );
});

NavLink.displayName = "NavLink";

NavLink.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired
  }).isRequired,
  onClick: PropTypes.func
};

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const { colorMode } = useColorMode();

  return (
    <nav className={`sticky top-0 z-50 w-full backdrop-blur-md ${
      colorMode === 'light' 
        ? 'bg-white/90 border-gray-200' 
        : 'bg-gray-800/90 border-gray-700'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="/navbar.webp"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink item={item} />
              </motion.div>
            ))}
            <ColorModeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <ColorModeSwitcher />
            <button
              onClick={toggleMenu}
              className={`ml-2 p-2 rounded-md ${
                colorMode === 'light'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-200 hover:bg-gray-700'
              }`}
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    item={item}
                    onClick={toggleMenu}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
