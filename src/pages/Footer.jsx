import { memo } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHeart,
  FaLinkedin,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";

const SocialLink = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
    aria-label={label}
  >
    <Icon className="w-5 h-5" title={label} />
  </a>
);

const Footer = memo(({ sidebarOpen }) => {
  const { isDark } = useTheme();

  const socialLinks = [
    { Icon: FaFacebook, href: "https://facebook.com/TurismoCatamarca", label: "Facebook" },
    { Icon: FaTwitter, href: "https://twitter.com/catamarcatur", label: "Twitter" },
    { Icon: FaInstagram, href: "https://instagram.com/turismocatamarca", label: "Instagram" },
  ];

  const developerLinks = [
    { Icon: FaGithub, href: "https://github.com/MauricioGT2024", label: "GitHub" },
    { Icon: FaLinkedin, href: "https://linkedin.com/in/mauricio-sierra", label: "LinkedIn" },
    { Icon: FaDiscord, href: "https://discord.com/users/mauricio0392", label: "Discord" },
  ];

  return (
    <footer
      className={`border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-gray-900 transition-colors
      fixed bottom-0 left-0 w-full
      `}
      style={{
        marginLeft: sidebarOpen ? 240 : 70, // ajusta según el ancho sidebar abierto/cerrado
        transition: "margin-left 0.3s ease",
        zIndex: 30,
      }}
    >
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-3 max-w-xs text-center md:text-left">
            <img src="/logo.png" alt="Catamarca Turismo" className="h-10 mx-auto md:mx-0" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Descubre la magia de Catamarca con nosotros. Tu guía definitiva para explorar los tesoros ocultos de esta hermosa provincia argentina.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map(({ Icon, href, label }) => (
                <SocialLink key={href} Icon={Icon} href={href} label={label} />
              ))}
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <nav className="flex flex-col text-sm font-semibold text-gray-900 dark:text-white space-y-1 md:ml-8">
            <span className="mb-2">Enlaces Rápidos</span>
            <a href="/" className="hover:text-teal-500 transition-colors">🏠 Inicio</a>
            <a href="/provincia" className="hover:text-teal-500 transition-colors">🗺️ Provincia</a>
            <a href="/hospedaje" className="hover:text-teal-500 transition-colors">🏨 Hospedaje</a>
            <a href="/about" className="hover:text-teal-500 transition-colors">ℹ️ Sobre Nosotros</a>
          </nav>

          {/* Desarrollador */}
          <div className="flex flex-col items-center md:items-start mt-6 md:mt-0">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Desarrollador</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Mauricio Sierra</p>
            <div className="flex space-x-4">
              {developerLinks.map(({ Icon, href, label }) => (
                <SocialLink key={href} Icon={Icon} href={href} label={label} />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright y footer bottom */}
        <div className="mt-6 md:mt-0 w-full border-t border-gray-200 dark:border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Catamarca Turismo. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Hecho con</span>
            <FaHeart className="w-4 h-4 text-red-500" />
            <span>en Argentina</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
