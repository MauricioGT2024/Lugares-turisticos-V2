import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="outline"
      colorScheme="green"
      ml={2}
      transform={colorMode === "light" ? "rotate(0deg)" : "rotate(180deg)"}
    />
  );
};
{/**/}
export default ColorModeSwitcher;
