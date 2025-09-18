import { useState } from "react";
import search from "../assets/images/icon-search.svg";

function SearchBox({ setWeather }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setWeather(null);

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

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData);

      setWeather({
        city: name,
        country,
        current: weatherData.current_weather,
        daily: weatherData.daily,
        hourly: weatherData.hourly,
      });
    } catch (err) {
      console.log(err);
      setError("Failed to fetch weather data. Please try again.");
    }
  };
  return (
    <div className="search-box-container mt-4 flex gap-10 p-4 flex-col items-center ">
      <p className="searchbox-text w-fit text-5xl">
        How's the sky looking today?
      </p>
      <div className="search-box-input-container w-fit flex gap-4">
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
          className="rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {error && <p className="text-white-500 font-semibold text-lg">{error}</p>}
    </div>
  );
}

export default SearchBox;
