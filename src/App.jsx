import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import "./styles/App.scss";
import "./styles/index.css";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState({
    temperature: "Celsius (°C)",
    wind: "km/h",
    precipitation: "Millimeters (mm)",
  });

  return (
    <>
      <Navbar units={units} setUnits={setUnits} />
      <SearchBox
        setWeather={setWeather}
        setLoading={setLoading}
        units={units}
      />
      <MainContent weather={weather} loading={loading} />
    </>
  );
}

export default App;
