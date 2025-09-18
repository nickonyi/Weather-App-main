import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import "./styles/App.scss";
import "./styles/index.css";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  return (
    <>
      <Navbar />
      <SearchBox setWeatherData={setWeather} />
      <MainContent weatherData={weather} />
    </>
  );
}

export default App;
