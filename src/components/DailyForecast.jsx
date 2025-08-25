import React from 'react';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '@/contexts/WeatherContext.jsx';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const DailyForecast = () => {
  const { state } = useWeather();
  const { convertTemperature, getTemperatureSymbol } = useSettings();

  if (state.dailyForecast.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>

      <div className="space-y-2">
        {state.dailyForecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="text-sm font-medium w-12">
                {index === 0 ? 'Today' : day.day}
              </div>

              <WeatherIcon
                iconCode={day.icon}
                size="md"
              />

              <div className="text-sm text-gray-500 capitalize flex-1">
                {day.description}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">
                {convertTemperature(day.lowTemp)}{getTemperatureSymbol()}
              </span>
              <span className="font-medium">
                {convertTemperature(day.highTemp)}{getTemperatureSymbol()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;