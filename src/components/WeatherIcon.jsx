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

const WeatherIcon = ({ iconCode, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const getIcon = (code) => {
    const iconClass = sizeClasses[size];

    switch (code) {
      case '01d': // clear sky day
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case '01n': // clear sky night
        return <div className={`${iconClass} text-gray-500`}>🌙</div>;
      case '02d':
      case '02n': // few clouds
        return <Cloud className={`${iconClass} text-gray-500`} />;
      case '03d':
      case '03n': // scattered clouds
      case '04d':
      case '04n': // broken clouds
        return <Cloud className={`${iconClass} text-gray-500`} />;
      case '09d':
      case '09n': // shower rain
        return <CloudDrizzle className={`${iconClass} text-blue-500`} />;
      case '10d':
      case '10n': // rain
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      case '11d':
      case '11n': // thunderstorm
        return <CloudLightning className={`${iconClass} text-blue-500`} />;
      case '13d':
      case '13n': // snow
        return <CloudSnow className={`${iconClass} text-blue-500`} />;
      case '50d':
      case '50n': // mist
        return <CloudFog className={`${iconClass} text-gray-500`} />;
      default:
        return <Sun className={`${iconClass} text-yellow-500`} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon(iconCode)}
    </div>
  );
};

export default WeatherIcon;
