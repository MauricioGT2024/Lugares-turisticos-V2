// Centralizar animaciones
export const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 5, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  filterButton: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
};
