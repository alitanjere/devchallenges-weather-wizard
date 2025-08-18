import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  timestamp: number;
  highTemp: number;
  lowTemp: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
  description: string;
}

export interface DailyForecast {
  date: string;
  day: string;
  highTemp: number;
  lowTemp: number;
  icon: string;
  description: string;
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_WEATHER'; payload: WeatherData }
  | { type: 'SET_HOURLY_FORECAST'; payload: HourlyForecast[] }
  | { type: 'SET_DAILY_FORECAST'; payload: DailyForecast[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: WeatherState = {
  currentWeather: null,
  hourlyForecast: [],
  dailyForecast: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CURRENT_WEATHER':
      return { 
        ...state, 
        currentWeather: action.payload, 
        lastUpdated: Date.now(),
        error: null 
      };
    case 'SET_HOURLY_FORECAST':
      return { ...state, hourlyForecast: action.payload };
    case 'SET_DAILY_FORECAST':
      return { ...state, dailyForecast: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface WeatherContextType {
  state: WeatherState;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const API_KEY = '43f53748106c3ae1357cdf647fd41a33';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchWeatherByCity = async (city: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // Fetch current weather
      const currentResponse = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const current = currentResponse.data;
      
      const weatherData: WeatherData = {
        location: current.name,
        country: current.sys.country,
        temperature: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        windDirection: current.wind.deg,
        pressure: current.main.pressure,
        visibility: current.visibility / 1000, // Convert to km
        uvIndex: 0, // UV index not available in current weather API
        timestamp: current.dt,
        highTemp: Math.round(current.main.temp_max),
        lowTemp: Math.round(current.main.temp_min),
      };

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: weatherData });

      // Fetch 5-day forecast (includes hourly data)
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecast = forecastResponse.data;
      
      // Process hourly forecast (next 24 hours)
      const hourlyData: HourlyForecast[] = forecast.list.slice(0, 8).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }));

      dispatch({ type: 'SET_HOURLY_FORECAST', payload: hourlyData });

      // Process daily forecast (5 days)
      const dailyData: DailyForecast[] = [];
      const groupedByDate: { [key: string]: any[] } = {};

      forecast.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        groupedByDate[date].push(item);
      });

      Object.entries(groupedByDate).forEach(([date, items]) => {
        const temps = items.map(item => item.main.temp);
        const highTemp = Math.round(Math.max(...temps));
        const lowTemp = Math.round(Math.min(...temps));
        const mainWeather = items[Math.floor(items.length / 2)].weather[0];

        dailyData.push({
          date,
          day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          highTemp,
          lowTemp,
          icon: mainWeather.icon,
          description: mainWeather.description,
        });
      });

      dispatch({ type: 'SET_DAILY_FORECAST', payload: dailyData.slice(0, 5) });

    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to fetch weather data' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const currentResponse = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const current = currentResponse.data;
      
      const weatherData: WeatherData = {
        location: current.name,
        country: current.sys.country,
        temperature: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        windDirection: current.wind.deg,
        pressure: current.main.pressure,
        visibility: current.visibility / 1000,
        uvIndex: 0,
        timestamp: current.dt,
        highTemp: Math.round(current.main.temp_max),
        lowTemp: Math.round(current.main.temp_min),
      };

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: weatherData });

      // Fetch forecast data
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const forecast = forecastResponse.data;
      
      // Process hourly and daily as above
      const hourlyData: HourlyForecast[] = forecast.list.slice(0, 8).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }));

      dispatch({ type: 'SET_HOURLY_FORECAST', payload: hourlyData });

      const dailyData: DailyForecast[] = [];
      const groupedByDate: { [key: string]: any[] } = {};

      forecast.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        groupedByDate[date].push(item);
      });

      Object.entries(groupedByDate).forEach(([date, items]) => {
        const temps = items.map(item => item.main.temp);
        const highTemp = Math.round(Math.max(...temps));
        const lowTemp = Math.round(Math.min(...temps));
        const mainWeather = items[Math.floor(items.length / 2)].weather[0];

        dailyData.push({
          date,
          day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          highTemp,
          lowTemp,
          icon: mainWeather.icon,
          description: mainWeather.description,
        });
      });

      dispatch({ type: 'SET_DAILY_FORECAST', payload: dailyData.slice(0, 5) });

    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to fetch weather data' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <WeatherContext.Provider value={{
      state,
      fetchWeatherByCity,
      fetchWeatherByCoords,
      clearError,
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};