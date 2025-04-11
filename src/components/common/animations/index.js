export const pageTransitions = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20 
  }
};

export const cardTransitions = {
  initial: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    y: -12,
    scale: 1.03
  },
  tap: {
    scale: 0.98
  }
};

export const filterTransitions = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9
  },
  visible: {
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 20
    }
  }
};
