import { useState } from 'react';
import './Weather.css';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Browser-il ninnu location edukkaam
  const fetchMyLocationWeather = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      alert("Browser location support cheyyunnilla!");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      alert("Location access allow cheyyanam!");
      setLoading(false);
    });
  };

  // 1. Adyam oru variable undakkuka (temperature nokki class name thiranjanukkaan)
const weatherClass = weather 
  ? (weather.temperature > 25 ? 'hot' : 'cool') 
  : 'default';

return (
  /* 2. dynamic aayi class name kodukkunnu */
  <div className={`weather-container ${weatherClass}`}>
    <div className="weather-card">
      <h3>☀️ Live Weather</h3>
      <button onClick={fetchMyLocationWeather}>Check My Location</button>

      {loading && <p className="loading-text">Fetching data... 📡</p>}

      {weather && !loading && (
        <div className="result">
          <h1>{weather.temperature}°C</h1>
          <p>Windspeed: {weather.windspeed} km/h</p>
          <div className="weather-icon" style={{ fontSize: '4rem' }}>
            {weather.temperature > 25 ? "☀️" : "❄️"}
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default Weather;