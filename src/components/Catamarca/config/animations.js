export const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55]
};

export const ANIMATION_PRESETS = {
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
  card: {
    hover: {
      y: -4,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  },
  button: {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  }
};

export const PAGE_TRANSITION = {
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
