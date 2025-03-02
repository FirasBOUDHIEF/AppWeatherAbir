import React from "react";
import { FaWind, FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const CurrentWeather = ({ weather }) => (
  <div className="text-center">
    <h4 className="fw-bold">{weather.details}</h4>
    <img
      src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
      alt="Weather Icon"
      className="weather-icon"
      style={{ width: "100px" }}
    />
    <h2>{weather.temp}°C</h2>
    <div className="d-flex justify-content-around">
      <p>
        <FaTemperatureHigh /> Ressenti : {weather.feels_like}°C
      </p>
      <p>
        <WiHumidity /> Humidité : {weather.humidity}%
      </p>
      <p>
        <FaWind /> Vent : {weather.speed} km/h
      </p>
    </div>
  </div>
);

export default CurrentWeather;
