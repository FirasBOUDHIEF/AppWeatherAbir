import { formatDateTime } from "../utils/dateUtils";

const API_KEY = "c0ac671805ca2813318a21837826c0b7";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

/**
 * Formate les données météo actuelles
 */
const mapWeatherData = (data) => {
  if (!data) return null;

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  return {
    lat,
    lon,
    name,
    country,
    temp: Math.round(temp),
    feels_like: Math.round(feels_like),
    temp_min: Math.round(temp_min),
    temp_max: Math.round(temp_max),
    humidity,
    speed,
    details: weather[0].description,
    icon: weather[0].icon,
    localTime: formatDateTime(dt, timezone),
    sunrise: formatDateTime(sunrise, timezone, "HH:mm"),
    sunset: formatDateTime(sunset, timezone, "HH:mm"),
  };
};

/**
 * Récupère les données météo actuelles
 */
export const fetchCurrentWeather = async (searchParams) => {
  try {
    const url = new URL(`${BASE_URL}weather`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: "metric", lang: "fr" });

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return mapWeatherData(data);
  } catch (error) {
    console.error("Erreur API météo :", error.message);
    return null;
  }
};

/**
 * Récupère les prévisions météo sur 5 jours
 */
export const fetchWeatherForecast = async (searchParams) => {
  try {
    const url = new URL(`${BASE_URL}forecast`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: "metric", lang: "fr" });

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    const dailyForecast = {};

    data.list.forEach((item) => {
      const date = formatDateTime(item.dt, data.city.timezone, "yyyy-MM-dd");
      const hour = formatDateTime(item.dt, data.city.timezone, "HH");

      if (!dailyForecast[date] || hour === "12") {
        dailyForecast[date] = {
          date: formatDateTime(item.dt, data.city.timezone, "EEEE dd LLL"),
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
        };
      }
    });

    return Object.values(dailyForecast).slice(0, 5);
  } catch (error) {
    console.error("Erreur API Prévisions :", error.message);
    return null;
  }
};
