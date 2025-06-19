// SidebarLink.jsx
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLink = ({ item, active, collapsed, onClick }) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
        ${
          active
            ? "bg-teal-500 text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-700"
        }
        ${collapsed ? "justify-center" : "justify-start"}
      `}
    >
      <item.icon className="w-5 h-5" aria-hidden="true" />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="select-none"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  </motion.div>
);

export default SidebarLink;
