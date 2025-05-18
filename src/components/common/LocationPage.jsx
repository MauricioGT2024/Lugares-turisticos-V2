import { motion, AnimatePresence } from "framer-motion";
// import { Modal, ModalOverlay, useColorMode, ModalContent as ChakraModalContent } from "@chakra-ui/react"; // Removed Chakra imports
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix Dialog
import PropTypes from "prop-types";
import useLocationPage from "@/hooks/useLocationPage";
import { IoClose } from "react-icons/io5"; // Import close icon

// Extra fallback si usás íconos por categoría

const LocationPage = ({
  title,
  description,
  locations,
  filterComponent: FilterComponent,
  locationCardComponent: LocationCardComponent,
  modalContent: ModalContentComponent,
  pageVariants,
  filterFunction,
}) => {
  // Removed useColorMode
  // const { colorMode } = useColorMode();
  // const isDark = colorMode === "dark";

  const {
    selectedLocation,
    isOpen,
    handleShowDetails,
    handleCloseModal,
    filteredLocations,
    filters,
    setFilters,
  } = useLocationPage(locations, filterFunction);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Use Tailwind dark classes directly
      className="min-h-screen p-8 mx-auto w-full transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
    >
      <section className="min-h-screen mx-auto px-4 md:px-8 max-w-7xl">
        <header className="text-center space-y-6 mb-12">
          <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-md uppercase tracking-wider shadow">
            Explora
          </span>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              {description}
            </p>
          )}
        </header>

        {FilterComponent && (
          <FilterComponent filters={filters} setFilters={setFilters} />
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          <AnimatePresence mode="popLayout">
            {filteredLocations.map((location) => {
              return (
                <motion.div
                  key={location.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LocationCardComponent
                    location={location}
                    onShowDetails={() => handleShowDetails(location)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>
      </section>

      {/* Radix UI Dialog for Modal */}
      <Dialog.Root open={isOpen} onOpenChange={handleCloseModal}>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content asChild>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants} // Assuming pageVariants is suitable for modal entry/exit
            // Tailwind classes for modal container
            className="fixed inset-0 m-auto max-h-[85vh] w-[90vw] max-w-2xl z-50 rounded-2xl shadow-2xl focus:outline-none overflow-hidden p-0
                       "
          >
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200/50 text-gray-700 hover:bg-gray-300/70 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-600/70 transition-colors"
                aria-label="Close"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </Dialog.Close>

            {selectedLocation && (
              <ModalContentComponent
                location={selectedLocation}
                onClose={handleCloseModal}
              />
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Root>
    </motion.div>
  );
};

LocationPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterComponent: PropTypes.elementType,
  locationCardComponent: PropTypes.elementType.isRequired,
  modalContent: PropTypes.elementType.isRequired,
  pageVariants: PropTypes.object.isRequired,
  filterFunction: PropTypes.func,
};

export default LocationPage;
