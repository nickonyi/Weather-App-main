import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import "./styles/App.scss";
import "./styles/index.css";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />
      <SearchBox setWeather={setWeather} setLoading={setLoading} />
      <MainContent weather={weather} loading={loading} />
    </>
  );
}

export default App;
