import React from 'react';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const TemperatureToggle = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useSettings();

  return (
    <div className="flex items-center gap-1 glass rounded-full p-1">
      <button
        onClick={toggleTemperatureUnit}
        className={`h-8 w-8 rounded-full transition-all duration-300 ${
          temperatureUnit === 'celsius'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-text-muted hover:text-foreground hover:bg-white/10'
        }`}
      >
        °C
      </button>
      <button
        onClick={toggleTemperatureUnit}
        className={`h-8 w-8 rounded-full transition-all duration-300 ${
          temperatureUnit === 'fahrenheit'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-text-muted hover:text-foreground hover:bg-white/10'
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;
