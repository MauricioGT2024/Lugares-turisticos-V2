import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaMapMarkedAlt,
  FaBed,
  FaInfoCircle,
  FaHeart,
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Inicio", path: "/", icon: FaHome },
  { label: "Departamentos", path: "/provincia", icon: FaMapMarkedAlt },
  { label: "Hospedaje", path: "/hospedaje", icon: FaBed },
  { label: "Sobre Nosotros", path: "/about", icon: FaInfoCircle },
];

const socialLinks = [
  {
    Icon: FaFacebook,
    href: "https://facebook.com/TurismoCatamarca",
    label: "Facebook",
  },
  {
    Icon: FaTwitter,
    href: "https://twitter.com/catamarcatur",
    label: "Twitter",
  },
  {
    Icon: FaInstagram,
    href: "https://instagram.com/turismocatamarca",
    label: "Instagram",
  },
];

const developerLinks = [
  {
    Icon: FaGithub,
    href: "https://github.com/MauricioGT2024",
    label: "GitHub",
  },
  {
    Icon: FaLinkedin,
    href: "https://linkedin.com/in/mauricio-sierra",
    label: "LinkedIn",
  },
  {
    Icon: FaDiscord,
    href: "https://discord.com/users/mauricio0392",
    label: "Discord",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const { isDark } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsMobileOpen(false);
  }, [pathname, isMobile]);

  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const ToggleButton = ({ onClick, isOpen, className = "" }) => (
    <motion.button
      onClick={onClick}
      className={`p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition ml ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle sidebar"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </motion.div>
    </motion.button>
  );

  const SidebarContent = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${bgColor} ${textColor} p-4`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!mobile && isOpen && (
          <img src="/navbar.png" alt="Logo" className="h-10" />
        )}
        <ToggleButton
          isOpen={mobile ? isMobileOpen : isOpen}
          onClick={() => (mobile ? setIsMobileOpen(false) : setIsOpen(!isOpen))}
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {navLinks.map(({ label, path, icon: Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-teal-500 text-white"
                  : "hover:bg-teal-100 dark:hover:bg-teal-700 text-gray-600 dark:text-gray-300"
              } ${!isOpen && !mobile ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5" /> {/* Tamaño igualado */}
              <AnimatePresence>
                {(isOpen || mobile) && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-40 pt-4 border-t border-gray-300 dark:border-gray-700">
        {/* Developer Text */}
        {(isOpen || mobile) && (
          <p className="text-xs text-gray-500 text-center mb-2">
            Creado por Mauricio Sierra ↓
          </p>
        )}
        {/* Developer Links */}
        <div
          className={`flex items-center justify-center gap-4 flex-wrap mb-4 ${
            !isOpen && !mobile ? "flex-col" : "flex-row"
          }`}
        >
          {developerLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className={`flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors ${
                !isOpen && !mobile ? "justify-center" : ""
              }`}
              title={label}
            >
              <Icon className="w-5 h-5" />
              <AnimatePresence>
                {(isOpen || mobile) && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="text-sm"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>

        {/* Social Text */}
        {(isOpen || mobile) && (
          <p className="text-xs text-gray-500 text-center mb-2">
            Catamarca Turismo ↓
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 flex-wrap">
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              title={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Bottom Phrase */}
        {(isOpen || mobile) && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-xs text-gray-400 mt-3 text-center"
          >
            Hecho con <FaHeart className="inline text-red-500 mx-1 w-3 h-3" />{" "}
            en Argentina
          </motion.p>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside
          className={`fixed top-0 left-0 h-full shadow-lg z-40 transition-all duration-300 ${
            isOpen ? "w-60" : "w-16"
          }`}
        >
          <SidebarContent />
        </aside>
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <>
          {!isMobileOpen && (
            <ToggleButton
              isOpen={false}
              onClick={() => setIsMobileOpen(true)}
              className="fixed top-4 left-4 z-50"
            />
          )}

          {/* Sidebar móvil */}
          <AnimatePresence>
            {isMobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-40"
                  onClick={() => setIsMobileOpen(false)}
                />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 20 }}
                  className="fixed top-0 left-0 w-64 h-full shadow-lg z-50 bg-white dark:bg-gray-900"
                >
                  {/* Botón toggle para cerrar dentro del sidebar */}
                  <div className="flex justify-end p-4">
                    <ToggleButton
                      isOpen={true}
                      onClick={() => setIsMobileOpen(false)}
                    />
                  </div>

                  <SidebarContent mobile />
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 left-0 w-64 h-full shadow-lg z-50"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
