import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import Error from "./pages/Error";
import { ErrorBoundary } from "react-error-boundary";
import "./styles/App.scss";
import "./styles/index.css";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  return (
    <>
      <Navbar units={units} setUnits={setUnits} />
      <ErrorBoundary FallbackComponent={Error}>
        <SearchBox
          setWeather={setWeather}
          setLoading={setLoading}
          units={units}
        />
        <MainContent weather={weather} loading={loading} units={units} />
      </ErrorBoundary>
    </>
  );
}

export default App;
