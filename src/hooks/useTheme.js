import { useLocalStorage } from './useLocalStorage';

// Custom hook for theme management
export const useTheme = () => {
  const [isDark, setIsDark] = useLocalStorage('darkMode', true);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return { isDark, toggleTheme };
};

export default useTheme;