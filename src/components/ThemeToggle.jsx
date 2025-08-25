import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useSettings();

  return (
    <button
      onClick={toggleTheme}
      className="h-8 w-8 p-0 text-gray-600 dark:text-gray-300"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
