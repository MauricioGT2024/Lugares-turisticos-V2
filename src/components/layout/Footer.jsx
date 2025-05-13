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
import NavLink from "../components/UI/NavLink";

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
    <footer className={`w-full border-t transition-colors duration-300 ${
      colorMode === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo y descripción */}
          <div className="flex-1 flex flex-col gap-5 items-start">
            <RouterLink to="/" className="mb-2">
              <motion.img
                src="/logo.webp"
                alt="Logo Catamarca Turismo"
                className="h-14 object-contain"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.2 }}
                loading="lazy"
              />
            </RouterLink>
            <p className={`text-base leading-relaxed max-w-md ${colorMode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Descubre la magia de Catamarca. Tu guía para explorar los tesoros de esta provincia argentina.
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>
            <a
              href="https://www.visitcatamarca.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm mt-2 text-teal-600 dark:text-teal-300 hover:underline"
            >
              Sitio Oficial <FaExternalLinkAlt className="w-3 h-3" />
            </a>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex-1 flex flex-col gap-4">
            <h3 className={`text-lg font-semibold mb-2 ${colorMode === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              Enlaces Rápidos
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} label={link.label} icon={link.icon} />
              ))}
            </nav>
          </div>

          {/* Desarrollador */}
          <div className="flex-1 flex flex-col gap-4">
            <h3 className={`text-lg font-semibold mb-2 ${colorMode === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              Desarrollado por
            </h3>
            <p className={`text-base font-medium ${colorMode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Mauricio Sierra
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">Redes y contacto:</span>
            <div className="flex gap-4">
              {developerLink.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6 mt-6 border-gray-200 dark:border-gray-700">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            © {new Date().getFullYear()} Catamarca Turismo.
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Hecho con <FaHeart className="w-4 h-4 text-red-400 animate-pulse" /> en Argentina
          </motion.div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
