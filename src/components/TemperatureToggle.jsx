import React from 'react';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const TemperatureToggle = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useSettings();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTemperatureUnit}
        className={`px-2 py-1 border rounded ${
          temperatureUnit === 'celsius' ? 'bg-gray-200' : ''
        }`}
      >
        °C
      </button>
      <button
        onClick={toggleTemperatureUnit}
        className={`px-2 py-1 border rounded ${
          temperatureUnit === 'fahrenheit' ? 'bg-gray-200' : ''
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;
