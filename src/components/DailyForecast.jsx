import React from 'react';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '@/contexts/WeatherContext';
import { useSettings } from '@/contexts/SettingsContext';

const DailyForecast = () => {
  const { state } = useWeather();
  const { convertTemperature, getTemperatureSymbol } = useSettings();

  if (state.dailyForecast.length === 0) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
        <div className="space-y-3 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="h-4 bg-white/20 rounded w-16"></div>
              <div className="h-6 w-6 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass glass-hover rounded-2xl p-6 animate-slide-in">
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
      
      <div className="space-y-3">
        {state.dailyForecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="text-sm font-medium w-12">
                {index === 0 ? 'Today' : day.day}
              </div>
              
              <WeatherIcon 
                iconCode={day.icon} 
                size="md" 
              />
              
              <div className="text-sm text-text-muted capitalize flex-1">
                {day.description}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="text-text-muted">
                {convertTemperature(day.lowTemp)}{getTemperatureSymbol()}
              </span>
              <div className="w-20 h-1 bg-white/20 rounded-full relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full w-3/4"></div>
              </div>
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