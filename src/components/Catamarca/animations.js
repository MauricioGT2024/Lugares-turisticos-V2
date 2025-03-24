export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  scale: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: { scale: 1.05 },
  },
  rotate: {
    animate: { rotate: 180 },
    exit: { rotate: 0 },
  },
};
