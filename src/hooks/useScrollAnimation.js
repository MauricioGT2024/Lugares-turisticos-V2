import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useScrollAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return {
    isLoaded,
    headerOpacity,
    springScrollY
  };
};
