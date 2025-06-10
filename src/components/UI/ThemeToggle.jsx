import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className={`
        fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50
        transition-all duration-300 ease-in-out transform hover:scale-110
        ${isDark 
          ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' 
          : 'bg-gray-800 hover:bg-gray-700 text-yellow-500'
        }
      `}
      aria-label="Cambiar tema"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}

export default ThemeToggle;