import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHeart,
  FaLinkedin,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";

const linkClass =
  "text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors";

const SocialLink = memo(({ Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
    aria-label={label}
  >
    <Icon className="w-5 h-5" title={label} />
  </motion.a>
));

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
  >
    {children}
  </Link>
);

const Footer = memo(() => {
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

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img src="/logo.png" alt="Catamarca Turismo" className="h-12" />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Descubre la magia de Catamarca con nosotros. Tu guía definitiva
              para explorar los tesoros ocultos de esta hermosa provincia
              argentina.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
    Enlaces Rápidos
  </h3>
  <nav className="flex flex-col gap-2 text-sm">
    <NavLink to="/">🏠 Inicio</NavLink>
    <NavLink to="/provincia">🗺️ Provincia</NavLink>
    <NavLink to="/hospedaje">🏨 Hospedaje</NavLink>
    <NavLink to="/about">ℹ️ Sobre Nosotros</NavLink>
  </nav>
</div>

          {/* Columna 3: Desarrollador */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Desarrollador
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mauricio Sierra
            </p>
            <div className="flex space-x-4">
              {developerLinks.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Catamarca Turismo. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mt-4 sm:mt-0">
              <span>Hecho con</span>
              <FaHeart className="w-4 h-4 text-red-500" />
              <span>en Argentina</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
