import React, { useState } from "react";
import "./Weather.css";

const API_KEY = "446fe391c3d9431aa5b125418230705";
const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=`;

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  async function fetchWeatherData() {
    const response = await fetch(`${API_URL}${city}&days=4`);
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
      {isButtonClicked && weatherData && weatherData.forecast && (
        <div className="forecast">
          <h2>3-day Weather forecast for {weatherData.location.name}</h2>
          {weatherData.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <p>Max temperature: {day.day.maxtemp_c}°C</p>
              <p>Min temperature: {day.day.mintemp_c}°C</p>
              <p>Condition: {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Weather;
