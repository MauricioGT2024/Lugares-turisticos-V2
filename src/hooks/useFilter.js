import { useState, useMemo } from 'react';

export const useFilter = (items, filterFn) => {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    if (!filter) return items;
    return items.filter(item => filterFn(item, filter));
  }, [items, filter, filterFn]);

  return {
    filter,
    setFilter,
    filteredItems
  };
};
