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
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
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
        console.error('No se pudo obtener el clima de las ciudades:', error);
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
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Otras grandes ciudades</h3>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Otras grandes ciudades</h3>

      <div className="space-y-2">
        {cities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCityClick(city.name)}
            className="w-full flex items-center justify-between py-2 text-left"
          >
            <div>
              <div className="text-sm font-medium">
                {city.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {city.description}
              </div>
            </div>

            <div className="flex items-center gap-2">
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
