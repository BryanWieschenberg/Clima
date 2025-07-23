import React, { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  wind: number;
  hourly?: { time: string; temp: number; condition: string }[];
}

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface WeatherCardProps {
  weatherData: WeatherData | null;
  location: Location;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, isLoading: parentLoading }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(parentLoading);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/weather?lat=${location.lat}&lng=${location.lng}`);
        const data = await res.json();
        setWeatherData({
          temp: data.high,
          feelsLike: data.feelsLike,
          condition: data.condition,
          humidity: data.humidity,
          wind: data.wind,
          hourly: data.hourly ?? undefined
        });
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);
  
  if (isLoading || !weatherData) {
    return (
      <div className="card weather-card loading">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fa-solid fa-cloud-sun"></i>
            Current Weather
          </h2>
          <div className="spinner"></div>
        </div>
        <div className="loading-content">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    condition = condition.toLowerCase();
    if (condition.includes('sunny')) return 'fa-sun';
    if (condition.includes('cloud')) return 'fa-cloud';
    if (condition.includes('rain')) return 'fa-cloud-rain';
    if (condition.includes('snow')) return 'fa-snowflake';
    if (condition.includes('storm')) return 'fa-bolt';
    return 'fa-cloud-sun';
  };

  return (
    <div className="card weather-card">
      <div className="card-header">
        <h2 className="card-title">
          <i className={`fa-solid ${getWeatherIcon(weatherData.condition)}`}></i>
          Current Weather in {location.name}
        </h2>
        <div className="last-updated">
          Updated just now
        </div>
      </div>
      
      <div className="weather-content">
        <div className="main-weather">
          <div className="temperature">
            {weatherData.temp}°C
          </div>
          <div className="weather-condition">
            {weatherData.condition}
          </div>
          <div className="feels-like">
            Feels like {weatherData.feelsLike}°C
          </div>
        </div>
        
        <div className="weather-stats">
          <div className="stat">
            <i className="fa-solid fa-wind"></i>
            <div className="stat-value">{weatherData.wind} km/h</div>
            <div className="stat-label">Wind</div>
          </div>
          <div className="stat">
            <i className="fa-solid fa-droplet"></i>
            <div className="stat-value">{weatherData.humidity}%</div>
            <div className="stat-label">Humidity</div>
          </div>
          <div className="stat">
            <i className="fa-solid fa-temperature-half"></i>
            <div className="stat-value">Low UV</div>
            <div className="stat-label">Index</div>
          </div>
        </div>
      </div>
      
      {weatherData.hourly && (
        <div className="hourly-forecast">
          <h3>Hourly Forecast</h3>
          <div className="hourly-items">
            {weatherData.hourly.map((hour, index) => (
              <div className="hourly-item" key={index}>
                <div className="hour">{hour.time}</div>
                <i className={`fa-solid ${getWeatherIcon(hour.condition)}`}></i>
                <div className="temp">{hour.temp}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
