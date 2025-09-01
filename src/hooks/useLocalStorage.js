import { useState } from 'react';

// Custom hook for localStorage persistence
// Note: In production, replace useState with actual localStorage implementation
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from localStorage (uncomment for production use)
      // const item = window.localStorage.getItem(key);
      // return item ? JSON.parse(item) : initialValue;
      
      // For now, return initialValue since localStorage isn't available in Claude.ai
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to localStorage (uncomment for production use)
      // window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;