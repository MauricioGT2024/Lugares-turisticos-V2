import { useState, useMemo, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const useLocationPage = (locations, filterFunction) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filters, setFilters] = useState({});

  const handleShowDetails = useCallback(
    (location) => {
      setSelectedLocation(location);
      onOpen();
    },
    [onOpen]
  );

  const handleCloseModal = useCallback(() => {
    onClose();
    setTimeout(() => setSelectedLocation(null), 300);
  }, [onClose]);

  const filteredLocations = useMemo(() => {
    return filterFunction ? filterFunction(locations, filters) : locations;
  }, [locations, filters, filterFunction]);

  return {
    selectedLocation,
    isOpen,
    onOpen,
    onClose,
    filteredLocations,
    handleShowDetails,
    handleCloseModal,
    filters,
    setFilters,
  };
};

export default useLocationPage;
