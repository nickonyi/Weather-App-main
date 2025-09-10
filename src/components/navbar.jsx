import logo from "../assets/images/logo.svg";
import iconUnit from "../assets/images/icon-units.svg";
import iconDropdown from "../assets/images/icon-dropdown.svg";

function Navbar() {
  return (
    <nav className="nav-container flex justify-between items-center">
      <div className="nav-logo">
        <div className="nav-logo-img">
          <img src={logo} alt="Weather App Logo" />
        </div>
      </div>

      <div className="metric-container flex items-center gap-2 cursor-pointer rounded-md py-2 px-4 ">
        <img src={iconUnit} alt="Celsius Icon" />
        <button className="metric-button">Units</button>
        <img src={iconDropdown} alt="Dropdown Icon" />
      </div>
    </nav>
  );
}

export default Navbar;
