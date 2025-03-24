import { useMemo } from 'react';

export const useLocationFilter = (locations, categoryFilter) => {
  return useMemo(
    () => categoryFilter
      ? locations.filter((loc) => loc.category === categoryFilter)
      : locations,
    [locations, categoryFilter]
  );
};
