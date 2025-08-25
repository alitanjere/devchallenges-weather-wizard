import React from 'react';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '@/contexts/WeatherContext.jsx';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const HourlyForecast = () => {
  const { state } = useWeather();
  const { convertTemperature, getTemperatureSymbol } = useSettings();

  if (state.hourlyForecast.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>

      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {state.hourlyForecast.map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[70px] p-2"
            >
              <div className="text-xs text-gray-500">
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
      </div>
    </div>
  );
};

export default HourlyForecast;
