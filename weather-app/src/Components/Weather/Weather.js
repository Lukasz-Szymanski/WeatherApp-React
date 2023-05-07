import React, { useState } from "react";
import "./Weather.css";

const API_KEY = "446fe391c3d9431aa5b125418230705";
const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  async function fetchWeatherData() {
    const response = await fetch(`${API_URL}${city}`);
    const json = await response.json();
    setWeatherData(json);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleButtonClick() {
    setIsButtonClicked(true);
    fetchWeatherData();
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="weather-app">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button className="btn" onClick={handleButtonClick}>
          Get Weather
        </button>
      </div>
      {isButtonClicked && weatherData && weatherData.location && (
        <div className="weather-data">
          <h2>Current weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
