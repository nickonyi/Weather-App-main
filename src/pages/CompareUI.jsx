import { useEffect, useState } from "react";
import { getWeatherIcon } from "../utility/utilityfunction";

function CompareUI({ cities, onBack }) {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const promises = cities.map(async (city) => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&hourly=relative_humidity_2m,precipitation`
        );
        const data = await res.json();
        return {
          name: city.name,
          country: city.country,
          feelsLike: data.current_weather.temperature,
          humidity: data.hourly.relative_humidity_2m?.[0],
          wind: data.current_weather.windspeed,
          precipitation: data.hourly.precipitation?.[0],
        };
      });
      setWeatherData(await Promise.all(promises));
    };

    fetchWeather();
  }, [cities]);
  return (
    <div className="p-6 flex flex-col">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded w-24 cursor-pointer"
      >
        Back
      </button>
      <h1 className="text-xl lg:text-3xl font-normal mb-4 flex self-center">
        Compare weather locations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:px-56 gap-4">
        {weatherData.map((city, idx) => (
          <div key={idx} className="weather-card p-4 rounded shadow pl-6">
            <h2 className="font-semibold py-4 text-2xl">
              {city.name}, {city.country}
            </h2>
            <div className="weather-icon-container flex gap-4 items-center">
              <img src={getWeatherIcon(city.feelsLike)} alt="weather icon" />
              <p className="weather-temp text-6xl font-bold">
                {Math.floor(city.feelsLike)}°
              </p>
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Feels Like:</strong> {Math.floor(city.feelsLike)}°
              </li>
              <li>
                <strong>Humidity:</strong> {city.humidity}%
              </li>
              <li>
                <strong>Wind:</strong> {city.wind} km/h
              </li>
              <li>
                <strong>Precip:</strong> {city.precipitation} mm
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompareUI;
