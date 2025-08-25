import React, { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import TemperatureToggle from '@/components/TemperatureToggle';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import PopularCities from '@/components/PopularCities';
import { useWeather } from '@/contexts/WeatherContext.jsx';

const Index = () => {
  const { state, fetchWeatherByCity } = useWeather();

  // Load default city on first visit
  useEffect(() => {
    if (!state.currentWeather && !state.loading) {
      fetchWeatherByCity('Helsinki');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Weather App</h1>
          <div className="flex flex-col items-center gap-2">
            <SearchBar />
            <TemperatureToggle />
          </div>
        </header>

        {state.error && (
          <div className="bg-red-100 text-red-700 p-2 rounded">
            {state.error}
          </div>
        )}

        {state.loading && !state.currentWeather ? (
          <p className="text-center">Loading...</p>
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

        <footer className="text-center text-xs text-gray-500">
          © 2024 Weather App
        </footer>
      </div>
    </div>
  );
};

export default Index;
