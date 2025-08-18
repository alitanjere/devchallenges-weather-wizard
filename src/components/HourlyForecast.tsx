import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '@/contexts/WeatherContext';
import { useSettings } from '@/contexts/SettingsContext';

const HourlyForecast: React.FC = () => {
  const { state } = useWeather();
  const { convertTemperature, getTemperatureSymbol } = useSettings();

  if (state.hourlyForecast.length === 0) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
        <div className="flex gap-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-8 w-8 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass glass-hover rounded-2xl p-6 animate-slide-in">
      <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
      
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-2">
          {state.hourlyForecast.map((hour, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 min-w-[70px] hover:bg-white/5 rounded-lg p-2 transition-colors"
            >
              <div className="text-xs text-text-muted">
                {index === 0 ? 'Now' : hour.time}
              </div>
              
              <WeatherIcon 
                iconCode={hour.icon} 
                size="md" 
              />
              
              <div className="text-sm font-medium">
                {convertTemperature(hour.temperature)}{getTemperatureSymbol()}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HourlyForecast;