import React from 'react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const TemperatureToggle = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useSettings();

  return (
    <div className="flex items-center gap-1 glass rounded-full p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTemperatureUnit}
        className={`
          h-8 w-8 rounded-full transition-all duration-300
          ${temperatureUnit === 'celsius' 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'text-text-muted hover:text-foreground hover:bg-white/10'
          }
        `}
      >
        °C
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTemperatureUnit}
        className={`
          h-8 w-8 rounded-full transition-all duration-300
          ${temperatureUnit === 'fahrenheit' 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'text-text-muted hover:text-foreground hover:bg-white/10'
          }
        `}
      >
        °F
      </Button>
    </div>
  );
};

export default TemperatureToggle;