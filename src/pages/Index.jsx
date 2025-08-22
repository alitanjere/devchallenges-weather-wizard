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
        <div className="caja-fea">
          <h1 className="titulo-feo">
            *** MI PAGINA DEL CLIMA ***
          </h1>
          <p style={{fontSize: '14px', color: 'blue', fontWeight: 'bold'}}>
            BIENVENIDO A MI SITIO WEB !!! AQUI PODES VER EL CLIMA !!!
          </p>
          <marquee behavior="scroll" direction="left" scrollamount="3">
            <span style={{color: 'red', fontSize: '12px'}}>
              *** ULTIMA ACTUALIZACION: HOY *** GRATIS !!! ***
            </span>
          </marquee>
          
          <div style={{marginTop: '15px', textAlign: 'center'}}>
            <SearchBar />
            <br />
            <TemperatureToggle />
          </div>
        </div>

        {/* Error Alert */}
        {state.error && (
        <div style={{backgroundColor: '#ff0000', border: '3px solid black', padding: '10px', margin: '10px', color: 'white'}}>
          <p style={{fontWeight: 'bold', fontSize: '16px'}}>ERROR: {state.error}</p>
        </div>
        )}

        {/* Loading Spinner */}
        {state.loading && !state.currentWeather && (
          <div className="caja-fea">
            <center>
              <p style={{fontSize: '18px', fontWeight: 'bold', color: 'red'}}>CARGANDO... ESPERE POR FAVOR...</p>
              <p style={{fontSize: '12px'}}>*** PROCESANDO DATOS DEL CLIMA ***</p>
            </center>
          </div>
        )}

        {/* Weather Content */}
        {!state.loading || state.currentWeather ? (
          <table border="2" cellpadding="10" cellspacing="0" style={{width: '100%', backgroundColor: '#ffffff'}}>
            <tr>
              <td style={{width: '70%', verticalAlign: 'top'}}>
                <CurrentWeather />
                <br />
                <HourlyForecast />
                <br />
                <DailyForecast />
              </td>
              <td style={{width: '30%', verticalAlign: 'top', backgroundColor: '#ffff99'}}>
                <PopularCities />
              </td>
            </tr>
          </table>
        ) : null}

        {/* Footer */}
        <div style={{backgroundColor: '#ff00ff', border: '2px solid black', textAlign: 'center', padding: '10px', marginTop: '20px'}}>
          <marquee behavior="scroll" direction="right" scrollamount="2">
            <span style={{color: 'white', fontSize: '12px', fontWeight: 'bold'}}>
              *** DATOS DEL CLIMA POR OPENWEATHERMAP *** PAGINA HECHA EN 2024 *** GRACIAS POR VISITAR ***
            </span>
          </marquee>
          <p style={{color: 'yellow', fontSize: '10px'}}>
            © 2024 MI SITIO DEL TIEMPO - HECHO CON MUCHO AMOR Y HTML
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
