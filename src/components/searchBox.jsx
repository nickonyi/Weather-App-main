import { useState } from "react";
import search from "../assets/images/icon-search.svg";
import { FaSpinner } from "react-icons/fa";

function SearchBox({
  setWeather,
  setLoading,
  units,
  favorites,
  loadingFavorites,
  onSelectFavorite,
}) {
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
      <div className="search-box-input-container w-64 h-6 lg:w-fit flex flex-col gap-0">
        <div id="input-container" className="flex flex-col lg:flex-row gap-4">
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
        {loadingFavorites ? (
          <div className="favorites-bar w-64 lg:w-fit bg-gray-800 text-white rounded-md mt-2 p-2 flex  items-center gap-2">
            <FaSpinner className="animate-spin text-xl" />
            <span>Search in progress…</span>
          </div>
        ) : (
          <div className="favorites-bar w-64 lg:w-fit bg-gray-800 text-white rounded-md mt-2 p-2">
            {favorites.length === 0 ? (
              <div className="text-center text-gray-400 py-2">
                No favorites yet. Search and save cities to see them here.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {favorites.map((fav, idx) => (
                  <button
                    id="fav-btn"
                    key={idx}
                    onClick={() => onSelectFavorite(fav.city, fav.country)}
                    className="w-full flex justify-between items-center px-3 py-2 rounded-md transition"
                  >
                    <span>{fav.city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-white-500 font-semibold text-lg">{error}</p>}
    </div>
  );
}

export default SearchBox;
