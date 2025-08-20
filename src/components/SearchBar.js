import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeather } from '@/contexts/WeatherContext';
import { toast } from 'sonner';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const { fetchWeatherByCity, fetchWeatherByCoords, state } = useWeather();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    try {
      await fetchWeatherByCity(searchValue.trim());
      setSearchValue('');
      toast.success(`Weather data loaded for ${searchValue}`);
    } catch (error) {
      toast.error('City not found');
    }
  };

  const handleLocationRequest = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          toast.success('Current location weather loaded');
        } catch (error) {
          toast.error('Failed to get weather for current location');
        }
      },
      () => {
        toast.error('Unable to retrieve your location');
      }
    );
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search city..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="glass pl-10 pr-20 py-3 text-glass-foreground placeholder:text-text-muted border-glass-border/30 focus:border-primary/50 focus:ring-primary/30"
          disabled={state.loading}
        />
        
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLocationRequest}
            disabled={state.loading}
            className="h-8 w-8 p-0 hover:bg-primary/20 text-text-muted hover:text-primary"
          >
            <MapPin className="h-4 w-4" />
          </Button>
          
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={state.loading || !searchValue.trim()}
            className="h-8 w-8 p-0 hover:bg-primary/20 text-text-muted hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;