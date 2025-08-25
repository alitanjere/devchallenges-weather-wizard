import React, { useEffect, useState } from 'react';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '@/contexts/WeatherContext.jsx';
import { useSettings } from '@/contexts/SettingsContext.jsx';
import axios from 'axios';

const POPULAR_CITIES = [
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'Sydney'
];

const PopularCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchWeatherByCity } = useWeather();
  const { convertTemperature, getTemperatureSymbol } = useSettings();

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      try {
        const API_KEY = '43f53748106c3ae1357cdf647fd41a33';
        const promises = POPULAR_CITIES.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        );

        const responses = await Promise.all(promises);
        const citiesData = responses.map(response => ({
          name: response.data.name,
          country: response.data.sys.country,
          temperature: Math.round(response.data.main.temp),
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
        }));

        setCities(citiesData);
      } catch (error) {
        console.error('Failed to fetch cities weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitiesWeather();
  }, []);

  const handleCityClick = (cityName) => {
    fetchWeatherByCity(cityName);
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Other Large Cities</h3>
        <div className="space-y-3 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-4 bg-white/20 rounded w-20"></div>
                <div className="h-4 bg-white/20 rounded w-16"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass glass-hover rounded-2xl p-6 animate-slide-in">
      <h3 className="text-lg font-semibold mb-4">Other Large Cities</h3>

      <div className="space-y-2">
        {cities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCityClick(city.name)}
            className="w-full flex items-center justify-between py-3 px-3 hover:bg-white/10 rounded-lg transition-colors text-left h-auto"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-medium text-foreground">
                  {city.name}
                </div>
                <div className="text-xs text-text-muted capitalize">
                  {city.description}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <WeatherIcon
                iconCode={city.icon}
                size="sm"
              />
              <span className="text-sm font-medium">
                {convertTemperature(city.temperature)}{getTemperatureSymbol()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
