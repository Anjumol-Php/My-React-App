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
const [citySearch, setCitySearch] = useState("");

const searchCityWeather = async () => {
  if (!citySearch) return;
  setLoading(true);
  
  try {
    // 1. City Name-ine Latitude/Longitude-lekku maattunnu
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${citySearch}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      alert("City kandupidikkaan kazhinjilla!");
      setLoading(false);
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2. Aa coordinates upayogichu weather fetch cheyyunnu
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    
    // City name koodi weather state-il save cheyyaam (optional)
    setWeather({ ...weatherData.current_weather, cityName: name });
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
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

      <div className="search-box">
  <input 
    type="text" 
    placeholder="Search City (e.g. Dubai, London)" 
    value={citySearch}
    onChange={(e) => setCitySearch(e.target.value)}
  />
  <button onClick={searchCityWeather}>🔍</button>
</div>

<p style={{margin: '10px 0'}}>OR</p>

<button onClick={fetchMyLocationWeather}>📍 My Location</button>
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