import React, { useState } from "react";
import "./App.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c02a37feeb130b0ef512595763c92c36`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
          setWeatherData(data);
        }
        if (data.cod === "404") {
          setWeatherData(null);
        }
      } catch (error) {
        setWeatherData(null);
      }
    }
  };

  return (
    <div className="WeatherAppContainer">
      <input
        placeholder="도시를 입력하세요"
        value={city}
        onChange={handleCityChange}
        onKeyPress={handleKeyPress}
        className="CityInput"
      />
      {weatherData ? (
        <div className="WeatherInfoContainer">
          <h2 className="CityName">{weatherData.name}</h2>
          <p className="Temperature">
            {Math.round((weatherData.main.temp - 273.15) * 10) / 10}°C
          </p>
          <p className="WeatherDescription">
            {weatherData.weather[0].main}
          </p>
        </div>
      ) : null}
    </div>
  );
}