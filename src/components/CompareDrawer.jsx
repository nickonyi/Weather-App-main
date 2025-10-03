import { useEffect, useState } from "react";
import search from "../assets/images/icon-search.svg";
import { FiX } from "react-icons/fi";

export default function CompareDrawer({ isOpen, onClose, onCompare }) {
  const [selectedCities, setSelectedCities] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (error) {
        console.log("Error fetching city suggestions", error);
      }
    };
    fetchCities();
  }, [query]);

  const handleClickedCity = (city) => {
    const cityData = {
      name: city.name,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
    };

    if (
      !selectedCities.find(
        (c) => c.lat === cityData.lat && c.lon === cityData.lon
      )
    ) {
      setSelectedCities([...selectedCities, cityData]);
      setQuery("");
      setSuggestions([]);
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
      )}

      {/* Side drawer */}

      <div
        id="side-drawer"
        className={`fixed top-0 right-0 lg:w-80 w-full h-full  shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div id="drawer-card" className="p-4 mt-8 flex flex-col  gap-4 h-80 ">
          <p className="text-lg">Select Locations to compare</p>
          {/* Search bar */}
          <div className="search-bar relative ">
            <input
              type="text"
              placeholder="Search for a place..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 rounded "
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-gray-700  shadow-lg rounded mt-1 z-60 max-h-40 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleClickedCity(s)}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {s.name},{s.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected cities */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {selectedCities.map((city, idx) => (
              <div
                key={idx}
                className="city-bar flex justify-between items-center p-2  rounded"
              >
                <span>
                  {city.name}, {city.country}
                </span>
                <button
                  onClick={() =>
                    setSelectedCities(selectedCities.filter((c) => c !== city))
                  }
                  className="p-1 "
                >
                  <FiX className="w-4 h-4 text-white-600 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>

          {/* Compare button */}
          <button
            onClick={() => onCompare(selectedCities)}
            className="mt-auto bg-blue-500 text-white p-2 rounded"
          >
            Compare Now
          </button>
        </div>
      </div>
    </>
  );
}
