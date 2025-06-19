import { useMemo, useState } from 'react';
import { hospedajes } from '../data/hospedajes';

export const useHospedajes = () => {
  const [locationFilter, setLocationFilter] = useState('Todos');

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(hospedajes.map(h => h.location))];
    return ["Todos", ...uniqueLocations].sort((a, b) => {
      if (a === "Todos") return -1;
      if (b === "Todos") return 1;
      return a.localeCompare(b);
    });
  }, []);

  const filteredHospedajes = useMemo(() => {
    return locationFilter === 'Todos'
      ? hospedajes
      : hospedajes.filter((hotel) => hotel.location === locationFilter);
  }, [locationFilter]);

  return {
    locations,
    locationFilter,
    setLocationFilter,
    filteredHospedajes
  };
};
