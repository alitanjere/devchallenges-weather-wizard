import React from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog
} from 'lucide-react';

const WeatherIcon = ({
  iconCode,
  size = 'md',
  animated = false
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const getIcon = (code) => {
    const iconClass = `${sizeClasses[size]} ${animated ? 'animate-float' : ''}`;

    switch (code) {
      case '01d': // clear sky day
        return <Sun className={`${iconClass} text-weather-sunny`} />;
      case '01n': // clear sky night
        return <div className={`${iconClass} text-weather-cloudy`}>🌙</div>;
      case '02d':
      case '02n': // few clouds
        return <Cloud className={`${iconClass} text-weather-cloudy`} />;
      case '03d':
      case '03n': // scattered clouds
      case '04d':
      case '04n': // broken clouds
        return <Cloud className={`${iconClass} text-weather-cloudy`} />;
      case '09d':
      case '09n': // shower rain
        return <CloudDrizzle className={`${iconClass} text-weather-rainy`} />;
      case '10d':
      case '10n': // rain
        return <CloudRain className={`${iconClass} text-weather-rainy`} />;
      case '11d':
      case '11n': // thunderstorm
        return <CloudLightning className={`${iconClass} text-weather-rainy`} />;
      case '13d':
      case '13n': // snow
        return <CloudSnow className={`${iconClass} text-weather-snowy`} />;
      case '50d':
      case '50n': // mist
        return <CloudFog className={`${iconClass} text-weather-cloudy`} />;
      default:
        return <Sun className={`${iconClass} text-weather-sunny`} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon(iconCode)}
    </div>
  );
};

export default WeatherIcon;
