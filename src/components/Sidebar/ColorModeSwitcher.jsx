import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useTheme();
  const isDark = colorMode === "dark";

  return (
    <button
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      className={`
        p-2 rounded-lg transition-all duration-300
        ${isDark 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }
        focus:outline-none focus:ring-2 focus:ring-teal-500
      `}
    >
      {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
    </button>
  );
};

export default ColorModeSwitcher;
