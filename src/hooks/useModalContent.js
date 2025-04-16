import { useColorMode } from "@chakra-ui/react";

const useModalContent = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return {
    isDark,
  };
};

export default useModalContent;
