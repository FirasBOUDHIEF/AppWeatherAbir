import React, { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchWeatherForecast } from "./api/weatherService";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastCarousel from "./components/ForecastCarousel";
import LocationButton from "./components/LocationButton";
import "./styles/styles.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Paris");

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    const weatherData = await fetchCurrentWeather({ q: city });
    const forecastData = await fetchWeatherForecast({ q: city });

    setWeather(weatherData);
    setForecast(forecastData);
  };

  const fetchLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCity(`${coords.latitude},${coords.longitude}`);
    });
  };

  return (
    <div>
      <h1 className="text-center text-info">🌤️ Météo </h1>
      <SearchBar onSearch={setCity} />
      {weather && <CurrentWeather weather={weather} />}
      <LocationButton onFetchLocation={fetchLocationWeather} />
      {forecast.length > 0 && <ForecastCarousel forecastList={forecast} />}
    </div>
  );
};

export default App;
