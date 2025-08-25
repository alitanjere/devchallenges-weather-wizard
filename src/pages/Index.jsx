import React, { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import TemperatureToggle from '@/components/TemperatureToggle';
import ThemeToggle from '@/components/ThemeToggle';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import PopularCities from '@/components/PopularCities';
import { useWeather } from '@/contexts/WeatherContext.jsx';

const Index = () => {
  const { state, fetchWeatherByCity } = useWeather();

  // Cargar ciudad predeterminada en la primera visita
  useEffect(() => {
    if (!state.currentWeather && !state.loading) {
      fetchWeatherByCity('Helsinki');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Aplicación del clima</h1>
          <div className="flex flex-col items-center gap-2">
            <SearchBar />
            <div className="flex items-center gap-2">
              <TemperatureToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {state.error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 p-2 rounded">
            {state.error}
          </div>
        )}

        {state.loading && !state.currentWeather ? (
          <p className="text-center">Cargando...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <CurrentWeather />
              <HourlyForecast />
              <DailyForecast />
            </div>
            <div>
              <PopularCities />
            </div>
          </div>
        )}

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          © 2024 Aplicación del clima
        </footer>
      </div>
    </div>
  );
};

export default Index;
