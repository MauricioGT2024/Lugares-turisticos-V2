export const TINOGASTA_ANIMATIONS = {
  pageVariants: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  },
  cardVariants: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  },
  filterVariants: {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    active: {
      scale: 1.1,
      backgroundColor: "var(--chakra-colors-purple-500)",
      color: "white"
    }
  }
};

export const filterAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};
