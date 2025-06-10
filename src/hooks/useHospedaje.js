import { useMemo, useState } from 'react';
import { hospedajes } from '../data/hospedajes';

export const useHospedajes = () => {
  const [locationFilter, setLocationFilter] = useState('Todos');
  
  const locations = useMemo(() => {
    return [...new Set(hospedajes.map((hotel) => hotel.location))].sort();
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