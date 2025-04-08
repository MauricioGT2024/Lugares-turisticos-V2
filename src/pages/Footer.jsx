import { memo } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkedAlt,
  FaHotel,
  FaInfoCircle,
  FaHome,
  FaHeart,
  FaExternalLinkAlt,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import PropTypes from "prop-types";

// Componentes Memorizados
const SocialLink = memo(({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, rotate: 5 }}
    transition={{ duration: 0.2 }}
    className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors"
    aria-label={label}
  >
    <Icon className="w-6 h-6" />
  </motion.a>
));

SocialLink.displayName = "SocialLink";

SocialLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const NavLink = memo(({ icon: Icon, label, to }) => (
  <motion.div whileHover={{ x: 4 }} className="w-full">
    <RouterLink
      to={to}
      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-300 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </RouterLink>
  </motion.div>
));

NavLink.displayName = "NavLink";

NavLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const Footer = memo(() => {
  const { colorMode } = useColorMode();

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/TurismoCatamarca/?locale=es_LA",
      label: "Facebook de Turismo Catamarca",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/catamarcatur?lang=es",
      label: "Twitter de Turismo Catamarca",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/turismocatamarca/?hl=es-la",
      label: "Instagram de Turismo Catamarca",
    },
  ];

  const developerLink = [
    {
      icon: DiGithubBadge,
      href: "https://github.com/MauricioGT2024",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mauricio-sierra/",
      label: "Linkedin",
    },
    {
      icon: FaDiscord,
      href: "https://discord.com/users/mauricio0392",
      label: "Discord",
    },
  ];

  const navLinks = [
    { icon: FaHome, label: "Inicio", to: "/" },
    { icon: FaMapMarkedAlt, label: "Provincia", to: "/provincia" },
    { icon: FaHotel, label: "Hospedaje", to: "/hospedaje" },
    { icon: FaInfoCircle, label: "Sobre Nosotros", to: "/about" },
  ];

  return (
    <footer className={`relative z-10 ${
      colorMode === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
    } border-t`}>
      <div className="container mx-auto max-w-8xl py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-8 md:gap-12">
          {/* Logo y Descripción */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RouterLink to="/">
                <img
                  src="/logo.png"
                  alt="Logo de Catamarca Turismo"
                  className="h-[60px] object-contain"
                  loading="lazy"
                />
              </RouterLink>
            </motion.div>

            <p className={`text-sm max-w-md leading-relaxed ${
              colorMode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Descubre la magia de Catamarca con nosotros. Tu guía definitiva
              para explorar los tesoros ocultos de esta hermosa provincia
              argentina.
            </p>

            <div className="flex space-x-4 flex-wrap">
              {socialLinks.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>

            <a
              href="https://www.visitcatamarca.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 transition-colors"
            >
              <span>Sitio Oficial</span>
              <FaExternalLinkAlt className="w-3 h-3" />
            </a>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold border-b-2 border-teal-500 pb-2 inline-block ${
              colorMode === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Enlaces Rápidos
            </h3>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </div>
          </div>

          {/* Desarrollador */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold border-b-2 border-teal-500 pb-2 inline-block ${
              colorMode === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Desarrollado Por
            </h3>
            <p className={`text-md ${
              colorMode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Mauricio Sierra
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redes Sociales y Contacto:
            </p>
            <div className="flex space-x-4 flex-wrap">
              {developerLink.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>
          </div>
        </div>

        <hr className={`my-8 ${
          colorMode === "dark" ? "border-gray-700" : "border-gray-200"
        }`} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-sm text-gray-600 dark:text-gray-400"
        >
          <span>© {new Date().getFullYear()} Catamarca Turismo.</span>
          <div className="flex items-center space-x-1">
            <span>Hecho con</span>
            <FaHeart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>en Argentina</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
