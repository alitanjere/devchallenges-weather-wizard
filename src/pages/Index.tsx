import React, { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import TemperatureToggle from '@/components/TemperatureToggle';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import PopularCities from '@/components/PopularCities';
import { useWeather } from '@/contexts/WeatherContext';

const Index = () => {
  const { state, fetchWeatherByCity } = useWeather();

  // Load default city on first visit
  useEffect(() => {
    if (!state.currentWeather && !state.loading) {
      fetchWeatherByCity('Helsinki');
    }
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-glow">
              Weather App
            </h1>
            <p className="text-text-muted mt-1">
              Current weather conditions and forecasts
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchBar />
            <TemperatureToggle />
          </div>
        </header>

        {/* Error Alert */}
        {state.error && (
          <Alert className="mb-6 glass border-red-500/30 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Loading Spinner */}
        {state.loading && !state.currentWeather && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-text-muted">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Weather Content */}
        {!state.loading || state.currentWeather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Weather */}
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather />
              <HourlyForecast />
              <DailyForecast />
            </div>

            {/* Right Column - Popular Cities */}
            <div className="space-y-6">
              <PopularCities />
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <footer className="mt-12 text-center text-text-subtle text-sm">
          <p>Weather data provided by OpenWeatherMap</p>
          <p className="mt-1">© 2024 Weather App - Built with React</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
