import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '@/contexts/WeatherContext.jsx';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const { fetchWeatherByCity, fetchWeatherByCoords, state } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    try {
      await fetchWeatherByCity(searchValue.trim());
      setSearchValue('');
    } catch (error) {
      console.error('City not found');
    }
  };

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        } catch (error) {
          console.error('Failed to get weather for current location');
        }
      },
      () => {
        console.error('Unable to retrieve your location');
      }
    );
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search city..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border rounded pl-10 pr-20 py-2 text-gray-700 placeholder:text-gray-400"
          disabled={state.loading}
        />

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            type="button"
            onClick={handleLocationRequest}
            disabled={state.loading}
            className="h-8 w-8 p-0 text-gray-600"
          >
            <MapPin className="h-4 w-4" />
          </button>

          <button
            type="submit"
            disabled={state.loading || !searchValue.trim()}
            className="h-8 w-8 p-0 text-gray-600"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
