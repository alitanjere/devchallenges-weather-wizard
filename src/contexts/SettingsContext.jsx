import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [theme, setTheme] = useState('light');

  // Cargar la preferencia guardada desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('weather-app-temperature-unit');
    if (saved && (saved === 'celsius' || saved === 'fahrenheit')) {
      setTemperatureUnit(saved);
    }

    const savedTheme = localStorage.getItem('weather-app-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  // Guardar la preferencia en localStorage
  useEffect(() => {
    localStorage.setItem('weather-app-temperature-unit', temperatureUnit);
  }, [temperatureUnit]);

  useEffect(() => {
    localStorage.setItem('weather-app-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const convertTemperature = (temp) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp; // Already in Celsius from API
  };

  const getTemperatureSymbol = () => {
    return temperatureUnit === 'celsius' ? '°C' : '°F';
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <SettingsContext.Provider value={{
      temperatureUnit,
      toggleTemperatureUnit,
      convertTemperature,
      getTemperatureSymbol,
      theme,
      toggleTheme,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings debe utilizarse dentro de un SettingsProvider');
  }
  return context;
};
