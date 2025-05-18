import { memo } from "react";
import { motion } from "framer-motion";
// Removed useColorMode import
// import { useColorMode } from "@chakra-ui/react";
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

// Reusable Components (Keeping these as they are already Tailwind/Framer Motion)
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

NavLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

// Footer Component
const Footer = memo(() => {
  // Removed useColorMode
  // const { colorMode } = useColorMode();
  // const isDark = colorMode === "dark";

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

  const developerLinks = [
    {
      icon: DiGithubBadge,
      href: "https://github.com/MauricioGT2024",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mauricio-sierra/",
      label: "LinkedIn",
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
    // Use Tailwind classes for background, border, and dark mode
    <footer className="w-full border-t bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Branding & Social */}
          <div className="flex-1 flex flex-col gap-5 items-start">
            <RouterLink to="/" aria-label="Inicio - Turismo Catamarca">
              <motion.img
                src="/logo.webp"
                alt="Logo Catamarca Turismo"
                className="h-14 object-contain"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.2 }}
                loading="lazy"
              />
            </RouterLink>

            <p
              // Use Tailwind dark classes directly
              className="text-base max-w-md leading-relaxed text-gray-600 dark:text-gray-400"
            >
              Descubre la magia de Catamarca. Tu guía para explorar los tesoros
              de esta provincia argentina.
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

          {/* Navigation */}
          <div className="flex-1 flex flex-col gap-4">
            <h3
              // Use Tailwind dark classes directly
              className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200"
            >
              Enlaces Rápidos
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </nav>
          </div>

          {/* Developer Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h3
              // Use Tailwind dark classes directly
              className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200"
            >
              Desarrollado por
            </h3>
            <p
              // Use Tailwind dark classes directly
              className="text-base font-medium text-gray-700 dark:text-gray-300"
            >
              Mauricio Sierra
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Redes y contacto:
            </span>
            <div className="flex gap-4">
              {developerLinks.map((link) => (
                <SocialLink key={link.href} {...link} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Base (Copyright) */}
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
            Hecho con <FaHeart className="w-4 h-4 text-red-400 animate-pulse" />{" "}
            en Argentina
          </motion.div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
