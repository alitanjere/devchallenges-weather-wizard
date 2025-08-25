import React from 'react';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const TemperatureToggle = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useSettings();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTemperatureUnit}
        className={`px-2 py-1 border rounded dark:border-gray-600 ${
          temperatureUnit === 'celsius' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        °C
      </button>
      <button
        onClick={toggleTemperatureUnit}
        className={`px-2 py-1 border rounded dark:border-gray-600 ${
          temperatureUnit === 'fahrenheit' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;
