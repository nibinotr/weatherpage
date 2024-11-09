// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';

const apiKey = 'befd984de4d3c050671d4eb935e6c660';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const fetchWeatherData = () => {
    if (!city) return; // Don't fetch if the city is empty

    setLoading(true);
    setError('');
    axios
      .get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode state
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h1>Weather Dashboard</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city"
        />
        <button onClick={fetchWeatherData}>Enter</button>
        
        {/* Dark mode toggle button */}
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        {error && <p>{error}</p>}
        {weatherData && !loading && !error && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default App;
