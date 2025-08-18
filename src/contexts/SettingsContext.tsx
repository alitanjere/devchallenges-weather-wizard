import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  temperatureUnit: 'celsius' | 'fahrenheit';
  toggleTemperatureUnit: () => void;
  convertTemperature: (temp: number) => number;
  getTemperatureSymbol: () => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('weather-app-temperature-unit');
    if (saved && (saved === 'celsius' || saved === 'fahrenheit')) {
      setTemperatureUnit(saved);
    }
  }, []);

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem('weather-app-temperature-unit', temperatureUnit);
  }, [temperatureUnit]);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const convertTemperature = (temp: number): number => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp; // Already in Celsius from API
  };

  const getTemperatureSymbol = (): string => {
    return temperatureUnit === 'celsius' ? '°C' : '°F';
  };

  return (
    <SettingsContext.Provider value={{
      temperatureUnit,
      toggleTemperatureUnit,
      convertTemperature,
      getTemperatureSymbol,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};