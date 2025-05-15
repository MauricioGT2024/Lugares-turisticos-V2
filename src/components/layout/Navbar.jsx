import { useState } from 'react';
import { Link } from 'react-router-dom';
// Cambia la importación de Dialog:
import {
  Root as DialogRoot,
  Trigger as DialogTrigger,
  Overlay as DialogOverlay,
  Content as DialogContent,
} from '@radix-ui/react-dialog';
import { useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaMapMarkedAlt, FaBed, FaInfoCircle } from 'react-icons/fa';
import clsx from 'clsx';
import NavLink from '@/components/common/NavLink';

const navItems = [
  { path: '/', label: 'Inicio', icon: FaHome },
  { path: '/provincia', label: 'Departamentos', icon: FaMapMarkedAlt },
  { path: '/hospedaje', label: 'Hospedaje', icon: FaBed },
  { path: '/about', label: 'Sobre Nosotros', icon: FaInfoCircle },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const overlayBg = useColorModeValue('rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)');
  const sidebarBg = useColorModeValue('#f7fafc', '#1a202c');

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={clsx(
            'fixed top-4 left-4 z-50 p-2 rounded-md shadow-md',
            'bg-white/80 dark:bg-gray-800/80 backdrop-blur',
            'hover:bg-white dark:hover:bg-gray-700 transition'
          )}
          aria-label="Abrir menú lateral"
        >
          <FaBars className="h-6 w-6 text-teal-600 dark:text-teal-300" />
        </button>
      </DialogTrigger>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <DialogOverlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40"
                style={{ backgroundColor: overlayBg }}
              />
            </DialogOverlay>

            {/* Sidebar */}
            <DialogContent asChild>
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-72 max-w-[90vw] z-50 flex flex-col shadow-xl"
                style={{ backgroundColor: sidebarBg }}
              >
                {/* Header */}
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
              </motion.aside>
            </DialogContent>
          </>
        )}
      </AnimatePresence>
    </DialogRoot>
  );
}
