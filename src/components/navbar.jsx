import logo from "../assets/images/logo.svg";
import iconUnit from "../assets/images/icon-units.svg";
import iconDropdown from "../assets/images/icon-dropdown.svg";
import { useState } from "react";
import {
  temperatureOptions,
  windOptions,
  precipitationOptions,
} from "../utility/utilityMappings";

function Navbar({ units, setUnits }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (category, value, e) => {
    e.stopPropagation();
    setUnits((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <nav className="nav-container flex justify-between items-center px-12">
      <div className="nav-logo">
        <div className="nav-logo-img">
          <img src={logo} alt="Weather App Logo" />
        </div>
      </div>

      <div
        onClick={toggleDropdown}
        className="metric-container relative flex items-center gap-2 cursor-pointer rounded-md py-2 px-4 "
      >
        <img src={iconUnit} alt="Celsius Icon" />
        <button className="metric-button">Units</button>
        <img src={iconDropdown} alt="Dropdown Icon" />
        <div
          className={`dropdown-menu absolute right-1 top-full mt-2 bg-gray-700 px-4 py-2 rounded-md shadow-lg   transform transition-all duration-500 ease-in-out
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
    </nav>
  );
}

export default Navbar;
