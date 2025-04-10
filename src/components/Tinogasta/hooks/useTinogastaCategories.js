import { useMemo } from 'react';
import { locations } from '../../../data/tinogasta';

export const useTinogastaCategories = () => {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(locations.map(loc => loc.category))];
    return uniqueCategories.sort();
  }, []);

  return { categories };
};
