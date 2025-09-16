import logo from "../assets/images/logo.svg";
import iconUnit from "../assets/images/icon-units.svg";
import iconDropdown from "../assets/images/icon-dropdown.svg";
import { useState } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="nav-container flex justify-between items-center px-12">
      <div className="nav-logo">
        <div className="nav-logo-img">
          <img src={logo} alt="Weather App Logo" />
        </div>
      </div>

      <div
        className="metric-container relative flex items-center gap-2 cursor-pointer rounded-md py-2 px-4 "
        onClick={toggleDropdown}
      >
        <img src={iconUnit} alt="Celsius Icon" />
        <button className="metric-button">Units</button>
        <img src={iconDropdown} alt="Dropdown Icon" />
        <div
          className={`dropdown-menu absolute right-1 top-full mt-2 bg-gray-700 rounded-md shadow-lg w-36  transform transition-all duration-500 ease-in-out
    ${
      showDropdown
        ? "translate-y-0 opacity-100"
        : "-translate-y-6 opacity-0 pointer-events-none"
    }`}
        >
          <p className="dropdown-header">Switch to imperial</p>
          <div className="dropdown-measurements">
            <p className="dropdown-item">Temperature</p>
            <div className="dropdown-items-cont">
              <p className="dropdown-item-unit">Celsius °C</p>
              <p className="dropdown-item-unit">Fahrenheit °F</p>
            </div>
          </div>
          <div className="dropdown-measurements">
            <p className="dropdown-item">Wind Speed</p>
            <div className="dropdown-items-cont">
              <p className="dropdown-item-unit">km/h</p>
              <p className="dropdown-item-unit">mph</p>
            </div>
          </div>
          <div className="dropdown-measurements">
            <p className="dropdown-item">Precipitation</p>
            <div className="dropdown-items-cont">
              <p className="dropdown-item-unit">Millimeters (mm)</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
