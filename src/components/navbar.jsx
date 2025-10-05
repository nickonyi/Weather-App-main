import logo from "../assets/images/logo.svg";
import iconUnit from "../assets/images/icon-units.svg";
import iconDropdown from "../assets/images/icon-dropdown.svg";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {
  temperatureOptions,
  windOptions,
  precipitationOptions,
} from "../utility/utilityMappings";

function Navbar({ units, setUnits, favorites, onSelectFavorite }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleSelect = (category, value, e) => {
    e.stopPropagation();
    setUnits((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <nav className="px-2 h-10 flex justify-between items-center lg:px-12">
      <div className="nav-logo">
        <div className="nav-logo-img">
          <img src={logo} alt="Weather App Logo" />
        </div>
      </div>

      <div className="flex items-center  gap-4 ">
        <div className="relative bg-gray-700 py-2 px-4 w-40 rounded-md">
          <button
            onClick={toggleFavorites}
            className="flex items-center gap-2 y-2  cursor-pointer"
          >
            <FaStar className="text-yellow-400" />
            <span>Favorites</span>
          </button>

          <div
            className={`absolute right-0 top-full mt-2 w-40 bg-gray-700 rounded-md shadow-lg  px-4 py-2 z-50 transform transition-all duration-300 ${
              showFavorites
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0 pointer-events-none"
            }`}
          >
            {favorites.length > 0 ? (
              favorites.map((fav, idx) => (
                <p
                  key={idx}
                  onClick={() => {
                    onSelectFavorite(fav.city, fav.country);
                    setShowFavorites(false);
                  }}
                  className="text-sm hover:bg-gray-600 px-2 py-1 rounded cursor-pointer"
                >
                  {fav.city}, {fav.country}
                </p>
              ))
            ) : (
              <p className="text-gray-500"></p>
            )}
          </div>
        </div>
        <div
          onClick={toggleDropdown}
          className="metric-container relative flex items-center gap-2 cursor-pointer rounded-md py-2 px-4 "
        >
          <img src={iconUnit} alt="Celsius Icon" />
          <button className="metric-button text-xs lg:text-base">Units</button>
          <img src={iconDropdown} alt="Dropdown Icon" />
          <div
            className={`dropdown-menu cursor-pointer z-50 absolute right-1 top-full mt-2 bg-gray-700 px-4 py-2 rounded-md shadow-lg   transform transition-all duration-500 ease-in-out
    ${
      showDropdown
        ? "translate-y-0 opacity-100"
        : "-translate-y-6 opacity-0 pointer-events-none"
    }`}
          >
            <p className="dropdown-header">Switch to imperial</p>
            <div className="dropdown-measurements">
              <p className="dropdown-item">Temperature</p>
              <div className="dropdown-items-cont flex flex-col gap-2">
                {Object.entries(temperatureOptions).map(([value, label]) => (
                  <p
                    key={value}
                    className={`dropdown-item-unit ${
                      units.temperature === value ? "selected" : ""
                    }`}
                    onClick={(e) => handleSelect("temperature", value, e)}
                  >
                    {label}
                  </p>
                ))}
              </div>
            </div>
            <div className="dropdown-measurements">
              <p className="dropdown-item">Wind Speed</p>
              <div className="dropdown-items-cont flex flex-col gap-2">
                {Object.entries(windOptions).map(([value, label]) => (
                  <p
                    key={value}
                    className={`dropdown-item-unit ${
                      units.wind === value ? "selected" : ""
                    }`}
                    onClick={(e) => handleSelect("wind", value, e)}
                  >
                    {label}
                  </p>
                ))}
              </div>
            </div>
            <div className="dropdown-measurements">
              <p className="dropdown-item">Precipitation</p>
              <div className="dropdown-items-cont flex flex-col gap-2">
                {Object.entries(precipitationOptions).map(([value, label]) => (
                  <p
                    key={value}
                    className={`dropdown-item-unit ${
                      units.precipitation === value ? "selected" : ""
                    }`}
                    onClick={(e) => handleSelect("precipitation", value, e)}
                  >
                    {label}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
