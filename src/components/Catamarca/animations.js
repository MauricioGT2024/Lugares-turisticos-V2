const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55]
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: easings.smooth
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: easings.smooth
      }
    }
  },

  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easings.bounce
      }
    },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: easings.smooth
      }
    }
  },

  rotate: {
    animate: { rotate: 180 },
    exit: { rotate: 0 },
  },

  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easings.smooth
      }
    },
    exit: {
      x: 20,
      opacity: 0
    }
  },

  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

export const cardAnimation = {
  hover: {
    y: -4,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

export const filterAnimation = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

export { easings };
