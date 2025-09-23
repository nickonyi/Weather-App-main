import { useState } from "react";
import search from "../assets/images/icon-search.svg";

function SearchBox({ setWeather, setLoading, units }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setWeather(null);
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
      );

      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError("No search result found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const params = new URLSearchParams({
        latitude,
        longitude,
        current:
          "temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m",
        hourly: "temperature_2m,weathercode",
        daily:
          "temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum",
        timezone: "auto",
        temperature_unit: units.temperature,
        windspeed_unit: units.wind,
        precipitation_unit: units.precipitation,
      });

      const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

      const weatherRes = await fetch(url);

      const weatherData = await weatherRes.json();
      console.log(weatherData);

      setWeather({
        city: name,
        country,
        current: weatherData.current,
        daily: weatherData.daily,
        hourly: weatherData.hourly,
      });
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="search-box-container mt-4 flex gap-10 p-4 flex-col items-center ">
      <p className="searchbox-text w-fit text-5xl px-6 lg:px-0">
        How's the sky looking today?
      </p>
      <div className="search-box-input-container w-64 lg:w-fit flex flex-col lg:flex-row gap-4">
        <input
          type="text"
          id="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md px-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a place..."
        />
        <img className="search-img" src={search} alt="" />
        <button
          id="search-btn"
          onClick={handleSearch}
          className="rounded-md cursor-pointer px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {error && <p className="text-white-500 font-semibold text-lg">{error}</p>}
    </div>
  );
}

export default SearchBox;
