import React from 'react';
import { MapPin, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '@/contexts/WeatherContext.jsx';
import { useSettings } from '@/contexts/SettingsContext.jsx';

const CurrentWeather = () => {
  const { state } = useWeather();
  const { convertTemperature, getTemperatureSymbol } = useSettings();

  if (!state.currentWeather) {
    return null;
  }

  const weather = state.currentWeather;

  return (
    <div className="card space-y-6">
      {/* Location */}
      <div className="flex items-center gap-2 text-gray-500">
        <MapPin className="h-4 w-4" />
        <span className="text-sm font-medium">
          {weather.location}, {weather.country}
        </span>
      </div>

      {/* Main Temperature */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-5xl font-bold">
            {convertTemperature(weather.temperature)}{getTemperatureSymbol()}
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Sensación térmica {convertTemperature(weather.feelsLike)}{getTemperatureSymbol()}
          </div>
        </div>

        <div className="text-right">
          <WeatherIcon
            iconCode={weather.icon}
            size="xl"
          />
          <div className="text-gray-500 text-sm mt-2 capitalize">
            {weather.description}
          </div>
        </div>
      </div>

      {/* High/Low Temperatures */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Máx: {convertTemperature(weather.highTemp)}{getTemperatureSymbol()}
        </span>
        <span>
          Mín: {convertTemperature(weather.lowTemp)}{getTemperatureSymbol()}
        </span>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="flex items-center gap-3">
          <Wind className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Viento</div>
            <div className="text-sm font-medium">{weather.windSpeed} m/s</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Droplets className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Humedad</div>
            <div className="text-sm font-medium">{weather.humidity}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Eye className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Visibilidad</div>
            <div className="text-sm font-medium">{weather.visibility} km</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Gauge className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Presión</div>
            <div className="text-sm font-medium">{weather.pressure} hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
