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
            <h1 className="text-glow">
              Aplicación del Tiempo
            </h1>
            <p style={{color: 'gray', fontSize: '12px'}}>
              Condiciones del clima actuales y pronósticos
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchBar />
            <TemperatureToggle />
          </div>
        </header>

        {/* Error Alert */}
        {state.error && (
        <Alert className="mb-8 weather-card border-4 border-red-500 bg-red-100 text-red-800">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <AlertDescription className="text-red-800 font-bold">{state.error}</AlertDescription>
        </Alert>
        )}

        {/* Loading Spinner */}
        {state.loading && !state.currentWeather && (
          <div style={{textAlign: 'center', padding: '50px'}}>
            <div>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>Cargando...</p>
            </div>
          </div>
        )}

        {/* Weather Content */}
        {!state.loading || state.currentWeather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Weather */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <CurrentWeather />
              </div>
              <div>
                <HourlyForecast />
              </div>
              <div>
                <DailyForecast />
              </div>
            </div>

            {/* Right Column - Popular Cities */}
            <div className="space-y-8">
              <div>
                <PopularCities />
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <footer style={{textAlign: 'center', color: 'gray', fontSize: '10px', marginTop: '30px'}}>
          <p>Datos del clima por OpenWeatherMap</p>
          <p>© 2024 App del Tiempo - Hecho con React</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
